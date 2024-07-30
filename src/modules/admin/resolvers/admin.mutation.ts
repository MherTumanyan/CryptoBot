import { ApolloError } from 'apollo-server-core';
import { map, isEmpty } from 'lodash';
import { CurrencyType, IncomingTransactionMethod, MutationResolvers, NetworkRulesEnum, OutgoingTransactionMethod, TransactionStatus, OperationStatus, CoinAndCurrencyType } from '@spot_wallet/types';
import { ExchangeCurrencyRateProvider, NamespaceEntityProvider, CoinbaseProvider, TechnicalProvider } from '@spot_wallet/core';
import { numberToFixed, currencies, TransactionNotFound } from '@spot_wallet/utils';

export const Mutation: MutationResolvers = {
  // ScheduleJob
  async checkEasyTransferStatus(root, {}, { OutgoingTransactionModel, UserModel, injector, botUrl }): Promise<OperationStatus> {
    try {
      const outgoingTransaction = await OutgoingTransactionModel.find({ status: TransactionStatus.Pending, method: OutgoingTransactionMethod.EasyTransfer, validDate: { $lt: Date.now() } });

      if (isEmpty(outgoingTransaction)) return { error: TransactionNotFound, code: 404, success: false };

      await Promise.all(
        map(outgoingTransaction, async transaction => {
          await OutgoingTransactionModel.updateOne({ _id: transaction._id }, { status: TransactionStatus.SystemCanceled });
          const { language, telegramId } = await UserModel.findOne({ uuid: transaction.userId });
          await injector.get(NamespaceEntityProvider).sendMessage(
            'POST',
            {
              language,
              telegramId,
              orderId: transaction.orderId
            },
            `${botUrl}/checkOutgoingTransactionStatus`
          );
        })
      );
      return { error: '', code: 200, success: true };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  // ScheduleJob
  async checkOutgoingTransactionStatus(root, {}, { OutgoingTransactionModel, UserModel, injector, botUrl }): Promise<OperationStatus> {
    try {
      const outgoingTransactions = await OutgoingTransactionModel.find({ status: TransactionStatus.Sent, method: OutgoingTransactionMethod.Withdraw });
      await Promise.all(
        map(outgoingTransactions, async transaction => {

          const coinbaseTransaction = await injector.get(CoinbaseProvider).getTransaction(transaction.coinType, transaction.coinBaseTransactionId);
          const { status, network: { transaction_url: transactionUrl } } = coinbaseTransaction;
          const transactionStatus = [TransactionStatus.Canceled, TransactionStatus.Failed, TransactionStatus.Expired];
          const uppercaseStatus = status.toUpperCase();

          if (transactionStatus.includes(uppercaseStatus)) {
            const user = await UserModel.findOneAndUpdate(
              { uuid: transaction.userId },
              { $inc: { [`balance.${transaction.coinType}`]: Number(transaction.outgoingAmount) } },
              { new: true }
            );

            await OutgoingTransactionModel.updateOne({ _id: transaction._id }, { status: uppercaseStatus });
            await injector.get(NamespaceEntityProvider).sendMessage(
              'POST',
              {
                orderId: transaction.orderId,
                transactionType: NetworkRulesEnum.In,
                telegramId: user.telegramId,
                transactionUrl,
                locale: user.language
              },
              `${botUrl}/outgoingTransactionCanceled`
            );
          } else if (uppercaseStatus === TransactionStatus.Completed) {
            await OutgoingTransactionModel.updateOne({ _id: transaction._id }, { status: uppercaseStatus });
            const { telegramId, language } = await UserModel.findOne({ uuid: transaction.userId });
            await injector.get(NamespaceEntityProvider).sendMessage(
              'POST',
              {
                orderId: transaction.orderId,
                transactionType: NetworkRulesEnum.Out,
                telegramId: telegramId,
                transactionUrl,
                receiverAddress: transaction.receiverAddress,
                outgoingAmount: transaction.outgoingAmount,
                outgoingAmountUSD: transaction.outgoingAmountUSD,
                locale: language,
                coinType: transaction.coinType
              },
              `${botUrl}/outgoingTransactionCompleted`
            );
          }
        })
      );
      return { error: '', code: 200, success: true };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  // ScheduleJob
  async checkReceiveCoinTransactions(root, {}, { IncomingTransactionModel, UserModel, injector, botUrl }): Promise<OperationStatus> {
    try {
      const pendingReceiveCoinTransactions = await IncomingTransactionModel.find({ status: TransactionStatus.Pending, method: IncomingTransactionMethod.Payment, address: { $ne: null } });
      await Promise.all(
        map(pendingReceiveCoinTransactions, async transaction => {
          const coinbaseTransaction = await injector.get(CoinbaseProvider).getTransaction(transaction.coinType, transaction.txId);
          const { status, network: { transaction_url: transactionUrl } } = coinbaseTransaction;

          if (status.toUpperCase() === TransactionStatus.Completed) {
            await IncomingTransactionModel.updateOne({ _id: transaction._id }, { status: TransactionStatus.Completed });

            const user = await UserModel.findOneAndUpdate(
              { uuid: transaction.userId },
              { $inc: { [`balance.${transaction.coinType}`]: Number(transaction.amount) } },
              { new: true }
            );

            const incomingAmountUSD = await injector.get(ExchangeCurrencyRateProvider).convertCurrency(transaction.amount, transaction.coinType, CurrencyType.Usd);
            // Send message to receiver
            await injector.get(NamespaceEntityProvider).sendMessage(
              'POST',
              {
                orderId: transaction.orderId,
                coinType: transaction.coinType,
                transactionType: IncomingTransactionMethod.Payment,
                telegramId: user.telegramId,
                transactionUrl,
                incomingAmount: numberToFixed(transaction.amount),
                incomingAmountUSD: numberToFixed(incomingAmountUSD, 1),
                locale: user.language
              },
              `${botUrl}/incomingTransactionConfirm`
            );
          }
        })
      );
      return { error: '', code: 200, success: true };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  // ScheduleJob
  async setCurrencyExchangeRates(root, {}, { injector }): Promise<OperationStatus> {
    try {
      await injector.get(ExchangeCurrencyRateProvider).setCurrencyExchangeRates(currencies as CurrencyType[]);

      return { error: '', code: 200, success: true };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  // ScheduleJob
  async updateCurrencyExchangeRates(root, {}, { injector, TechnicalModel }): Promise<OperationStatus> {
    try {
      const exchangeRates = await injector.get(TechnicalProvider).setCurrencyExchangeRates(currencies as CoinAndCurrencyType[]);
      await TechnicalModel.updateMany({}, { rates: exchangeRates });
      return { error: '', code: 200, success: true };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  }
};
