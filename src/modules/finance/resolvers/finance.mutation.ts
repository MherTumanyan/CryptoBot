import { ApolloError } from 'apollo-server-core';
import { ModuleContext } from '@graphql-modules/core';
import { isEmpty } from 'lodash';
import { CoinType, CurrencyType, HistoryTransactionType, IncomingTransactionMethod, MutationResolvers, NetworkRulesEnum, OutgoingTransactionMethod, ReceivingAddressStatus, TransactionStatus, WithdrawOrder, EasyTransferOrder } from '@spot_wallet/types';
import { DefaultEnvProvider, ExchangeCurrencyRateProvider, NamespaceEntityProvider, CoinbaseProvider } from '@spot_wallet/core';
import { getCustomId, isValidTransferAmount, numberToFixed, NotEnoughFunds, OutgoingTransactionNotFound, OrderNotfound, AddressIsIncorrect, TransactionNotFound, ReceiverNotFound, AddressNotExists, AddressAlreadyExists, AmountMustBePositiveNumber } from '@spot_wallet/utils';
import { FinanceProvider } from '../providers';
import { Query as FinanceQuery } from './finance.query';
import { IFinanceModuleContext } from '../finance.module';

export const Mutation: MutationResolvers = {
  async createWithdrawOrder(
    root,
    { currency, amountInCurrency, coinType, coinAddress, maxAvailableBalance },
    { injector, user, OutgoingTransactionModel, HistoryMetaModel, ReceivingAddressModel, SuggestedReceiversModel }: ModuleContext<IFinanceModuleContext>) {
    try {
      if (isNaN(amountInCurrency) || (amountInCurrency <= 0 && amountInCurrency !== null))
        return { error: AmountMustBePositiveNumber, code: 400, success: false };
      const userCoinBalance = user.balance[coinType];
      // @ts-ignore
      const { totalWithdrawAmountInCoin, amountInCoin, amountInUSD, totalWithdrawAmountInUsd, withdrawFeeInPercent, withdrawFeeCoin, withdrawFeeInCurrency, totalWithdrawAmountInCurrency, amountInCurrency: amountInCurrencyFromOrder }: WithdrawOrder = await injector.get(FinanceProvider).getWithdrawOrder(amountInCurrency, currency, coinType, coinAddress, userCoinBalance, maxAvailableBalance);
      const { minTransactionValue, maxTransactionValue } = await injector.get(ExchangeCurrencyRateProvider).getMinAndMaxTransactionValue(coinType);

      const isValidAmount = isValidTransferAmount({
        minTransactionValue,
        maxTransactionValue,
        amountInCoin,
        totalAmountInCoin: totalWithdrawAmountInCoin,
        userCoinBalance,
      });
      const { code } = isValidAmount;
      if (code !== 200) return isValidAmount;
      // @ts-ignore
      const validCoinAddress = await FinanceQuery.validateCoinAddress(root, { coinAddress, coinType, externalCall: false }, { ReceivingAddressModel, user, SuggestedReceiversModel });
      if (!validCoinAddress.success)
        return { error: AddressIsIncorrect, code: 404, success: false };

      const outgoingOrderId = getCustomId({ fixAlphabet: 'TB', length: 7 });
      const withdrawExpireTime = injector.get(DefaultEnvProvider).WITHDRAW_EXPIRE_TIME;
      const validDate = Date.now() + Number(withdrawExpireTime);
      const outTransaction = await OutgoingTransactionModel.create({
        userId: user.uuid,
        status: TransactionStatus.Pending,
        method: OutgoingTransactionMethod.Withdraw,
        coinType,
        orderId: outgoingOrderId,
        receiverAddress: coinAddress,
        outgoingAmount: amountInCoin,
        outgoingAmountWithFee: totalWithdrawAmountInCoin,
        outgoingAmountUSD: amountInUSD,
        outgoingAmountWithFeeUSD: totalWithdrawAmountInUsd,
        outgoingTransactionFeeInPercent: withdrawFeeInPercent,
        validDate
      });
      await HistoryMetaModel.create({ transactionId: outTransaction._id, userId: user.uuid, transactionType: HistoryTransactionType.Out });

      return {
        code: 200,
        error: '',
        success: true,
        data: {
          currency,
          coinType,
          amountInCurrency: amountInCurrencyFromOrder,
          amountInCoin,
          withdrawFeeCoin,
          totalWithdrawAmountInCoin: numberToFixed(totalWithdrawAmountInCoin),
          withdrawFeeInCurrency,
          totalWithdrawAmountInCurrency,
          withdrawFeeInPercent,
          orderId: outgoingOrderId,
          validDate,
          withdrawExpireTime: Number(withdrawExpireTime) / 1000,
        }
      };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },

  async acceptWithdrawOrder(
    root,
    { orderId },
    { injector, user, UserModel, OutgoingTransactionModel }: ModuleContext<IFinanceModuleContext>) {
    try {
      const query = { orderId, userId: user.uuid, status: TransactionStatus.Pending, validDate: { $gte: Date.now() } };
      const order = await OutgoingTransactionModel.findOne(query);
      if (isEmpty(order))
        return { error: OrderNotfound, code: 404, success: false };

      const { outgoingAmount, outgoingAmountWithFee, coinType, receiverAddress } = order;
      const userCoinBalance = user.balance[coinType];

      const { minTransactionValue, maxTransactionValue } = await injector.get(ExchangeCurrencyRateProvider).getMinAndMaxTransactionValue(coinType);
      const idem = getCustomId({ length: 8 });
      const isValidAmount = isValidTransferAmount({
        minTransactionValue,
        maxTransactionValue,
        amountInCoin: outgoingAmount,
        totalAmountInCoin: outgoingAmountWithFee,
        userCoinBalance,
      });
      const { code } = isValidAmount;
      if (code !== 200) return isValidAmount;

      const transactionInfo = await injector.get(CoinbaseProvider).sendMoney(outgoingAmount.toString(), receiverAddress, idem, coinType);
      await OutgoingTransactionModel.updateOne({ orderId }, { coinBaseTransactionId: transactionInfo.id, status: TransactionStatus.Sent } );
      await UserModel.updateOne({ _id: user._id }, { $inc: { [`balance.${coinType}`]: -outgoingAmountWithFee } });
      return { error: '', code: 200, success: true };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  async createInternalWithdrawOrder(
    root,
    { currency, amountInCurrency, coinType, coinAddress, maxAvailableBalance },
    { injector, user, OutgoingTransactionModel, HistoryMetaModel, ReceivingAddressModel, UserModel }: ModuleContext<IFinanceModuleContext>) {
    try {
      const { userId } = await ReceivingAddressModel.findOne({ address: coinAddress });
      const { accountId } = await UserModel.findOne({ uuid: userId });
      // @ts-ignore
      const easyTransferResult = await Mutation.createEasyTransferOrder(root, { currency, amountInCurrency, coinType, receiverAccountId: accountId, user, maxAvailableBalance }, { injector, user, UserModel, OutgoingTransactionModel, HistoryMetaModel });
      if (easyTransferResult.code !== 200) return easyTransferResult;
      const {
        data: {
          amountInCoin,
          amountInCurrency: amountInCurrencyFromOrder,
          easyTransferFeeCoin: withdrawFeeCoin,
          totalEasyTransferAmountInCoin: totalWithdrawAmountInCoin,
          easyTransferFeeInCurrency: withdrawFeeInCurrency,
          totalEasyTransferAmountInCurrency: totalWithdrawAmountInCurrency,
          easyTransferFeeInPercent: withdrawFeeInPercent,
          easyTransferExpireTime: withdrawExpireTime,
          orderId,
          validDate,
        }
      } = easyTransferResult;

      return {
        code: 200,
        error: '',
        success: true,
        data: {
          currency,
          coinType,
          amountInCurrency: amountInCurrencyFromOrder,
          amountInCoin,
          withdrawFeeCoin,
          totalWithdrawAmountInCoin,
          withdrawFeeInCurrency,
          totalWithdrawAmountInCurrency,
          withdrawFeeInPercent,
          orderId,
          validDate,
          withdrawExpireTime,
        }
      };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async acceptInternalWithdrawOrder(
    root,
    { orderId },
    { injector, user, UserModel, OutgoingTransactionModel, IncomingTransactionModel, HistoryMetaModel, botUrl }: ModuleContext<IFinanceModuleContext>) {
    try {
      // @ts-ignore
      return Mutation.acceptEasyTransferOrder(root, { orderId }, { injector, user, UserModel, OutgoingTransactionModel, IncomingTransactionModel, HistoryMetaModel, botUrl } );
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },
  async createEasyTransferOrder(
    root,
    { currency, amountInCurrency, coinType, receiverAccountId, maxAvailableBalance },
    { injector, user, UserModel, OutgoingTransactionModel, HistoryMetaModel }: ModuleContext<IFinanceModuleContext>) {
    try {
      const userCoinBalance = user.balance[coinType];
      // @ts-ignore
      const { totalEasyTransferAmountInCoin, amountInCoin, amountInUSD, totalEasyTransferAmountInUsd, easyTransferFeeInPercent, easyTransferFeeCoin, easyTransferFeeInCurrency, totalEasyTransferAmountInCurrency, amountInCurrency: amountInCurrencyFromOrder }: EasyTransferOrder = await injector.get(FinanceProvider).getEasyTransferOrder(amountInCurrency, currency, coinType, userCoinBalance, maxAvailableBalance);

      const { minTransactionValue, maxTransactionValue } = await injector.get(ExchangeCurrencyRateProvider).getMinAndMaxTransactionValue(coinType);
      const isValidAmount = isValidTransferAmount({
        minTransactionValue,
        maxTransactionValue,
        amountInCoin,
        totalAmountInCoin: totalEasyTransferAmountInCoin,
        userCoinBalance,
      });
      const { code } = isValidAmount;
      if (code !== 200) return isValidAmount;

      const receiver = await UserModel.findOne({ accountId: receiverAccountId });
      if (!receiver)
        return { error: ReceiverNotFound, code: 404, success: false };

      const outgoingOrderId = getCustomId({ fixAlphabet: 'TT', length: 7 });
      const easyTransferExpireTime = injector.get(DefaultEnvProvider).EASY_TRANSFER_EXPIRE_TIME;
      const validDate = Date.now() + Number(easyTransferExpireTime);
      const outTransaction = await OutgoingTransactionModel.create({
        userId: user.uuid,
        status: TransactionStatus.Pending,
        method: OutgoingTransactionMethod.EasyTransfer,
        coinType,
        orderId: outgoingOrderId,
        toAccount: receiverAccountId,
        outgoingAmount: amountInCoin,
        outgoingAmountWithFee: totalEasyTransferAmountInCoin,
        outgoingAmountUSD: amountInUSD,
        outgoingAmountWithFeeUSD: totalEasyTransferAmountInUsd,
        outgoingTransactionFeeInPercent: easyTransferFeeInPercent,
        validDate
      });
      await HistoryMetaModel.create({ transactionId: outTransaction._id, userId: user.uuid, transactionType: HistoryTransactionType.Out });

      return {
        code: 200,
        error: '',
        success: true,
        data: {
          currency,
          coinType,
          amountInCurrency: amountInCurrencyFromOrder,
          amountInCoin,
          easyTransferFeeCoin,
          totalEasyTransferAmountInCoin: numberToFixed(totalEasyTransferAmountInCoin),
          easyTransferFeeInCurrency,
          totalEasyTransferAmountInCurrency,
          easyTransferFeeInPercent,
          orderId: outgoingOrderId,
          validDate,
          easyTransferExpireTime: Number(easyTransferExpireTime) / 1000,
        }
      };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async acceptEasyTransferOrder(
    root,
    { orderId },
    { injector, user, UserModel, OutgoingTransactionModel, IncomingTransactionModel, HistoryMetaModel, botUrl }: ModuleContext<IFinanceModuleContext>) {
    try {
      const query = { orderId, userId: user.uuid, status: TransactionStatus.Pending, validDate: { $gte: Date.now() } };
      const order = await OutgoingTransactionModel.findOne(query);
      if (isEmpty(order))
        return { error: OrderNotfound, code: 404, success: false };

      const { outgoingAmount, outgoingAmountWithFee, coinType, toAccount, outgoingAmountUSD } = order;
      const userCoinBalance = user.balance[coinType];

      const { minTransactionValue, maxTransactionValue } = await injector.get(ExchangeCurrencyRateProvider).getMinAndMaxTransactionValue(coinType);

      const isValidAmount = isValidTransferAmount({
        minTransactionValue,
        maxTransactionValue,
        amountInCoin: outgoingAmount,
        totalAmountInCoin: outgoingAmountWithFee,
        userCoinBalance,
      });
      const { code } = isValidAmount;
      if (code !== 200) return isValidAmount;

      await UserModel.updateOne({ _id: user._id }, { $inc: { [`balance.${coinType}`]: -outgoingAmountWithFee } });
      const receiver = await UserModel.findOneAndUpdate({ accountId: toAccount }, { $inc: { [`balance.${coinType}`]: outgoingAmount } }, { new: true });
      await OutgoingTransactionModel.updateOne({ orderId }, { status: TransactionStatus.Completed });

      const incomingOrderId = getCustomId({ fixAlphabet: 'TT', length: 7 });
      const inTransaction = await IncomingTransactionModel.create({
        userId: receiver.uuid,
        amount: outgoingAmount,
        amountUSD: outgoingAmountUSD,
        coinType: coinType,
        method: IncomingTransactionMethod.EasyTransfer,
        fromAccount: user.accountId,
        status: TransactionStatus.Completed,
        orderId: incomingOrderId,
        txId: getCustomId({ fixAlphabet: 'FAKE', length: 7 })
      });
      await HistoryMetaModel.create({ transactionId: inTransaction._id, userId: receiver.uuid, transactionType: HistoryTransactionType.In });
      await injector.get(NamespaceEntityProvider).sendMessage(
        'POST',
        {
          orderId: incomingOrderId,
          transactionDirection: NetworkRulesEnum.In,
          transactionType: IncomingTransactionMethod.EasyTransfer,
          userAccountId: user.accountId,
          userNickName: user.nickName,
          telegramId: receiver.telegramId,
          incomingAmount: outgoingAmount,
          incomingAmountUSD: outgoingAmountUSD,
          locale: receiver.language,
          coin: coinType
        },
        `${botUrl}/incomingTransaction`
      );

      return { error: '', code: 200, success: true };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },

  async receiveCoins(root, { address, total, transactionId, hash }, { UserModel, ReceivingAddressModel, HistoryMetaModel, IncomingTransactionModel, injector, botUrl }: ModuleContext<IFinanceModuleContext>){
    try {
      const addressInfo = await ReceivingAddressModel.findOne({ address, status: ReceivingAddressStatus.Active });
      if (isEmpty(addressInfo)) return { success: false, code: 404, error: AddressNotExists };

      const { userId } = addressInfo;
      const { amount, currency } = total;
      const uniqueTransactionId = await IncomingTransactionModel.findOne({ txId: transactionId });

      if (!isEmpty(uniqueTransactionId)) return { success: false, code: 404, error: AddressAlreadyExists };

      const amountUSD = await injector.get(ExchangeCurrencyRateProvider).convertCurrency(Number(amount), currency as CoinType, CurrencyType.Usd);
      const incomingOrderId = getCustomId({ fixAlphabet: 'IN', length: 7 });

      const inTransaction = await IncomingTransactionModel.create({
        userId,
        address,
        txId: transactionId,
        amount,
        hash,
        coinType: currency as CoinType,
        status: TransactionStatus.Pending,
        orderId: incomingOrderId,
        amountUSD,
      });

      await ReceivingAddressModel.updateOne({ address }, { status: ReceivingAddressStatus.Expired, $push: { addressHistory : hash } });
      const { telegramId, nickName, language } = await UserModel.findOne({ uuid: userId });
      await HistoryMetaModel.create({ transactionId: inTransaction._id, userId, transactionType: HistoryTransactionType.In });
      const transaction_url = injector.get(DefaultEnvProvider).TRANSACTION_URL;
      await injector.get(NamespaceEntityProvider).sendMessage(
        'POST',
        {
          orderId: incomingOrderId,
          transactionDirection: NetworkRulesEnum.In,
          transactionType: IncomingTransactionMethod.Payment,
          userAccountId: '',
          userNickName: '',
          telegramId: telegramId,
          incomingAmount: amount,
          locale: language,
          incomingAmountUSD: amountUSD,
          coin: currency,
          transactionURL: `${transaction_url}/${currency}/${hash}`
        },
        `${botUrl}/incomingPendingTransaction`
      );
      return { success: true, code: 200, error: '' };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },

  async cancelEasyTransfer(root, { orderId }, { OutgoingTransactionModel }: ModuleContext<IFinanceModuleContext>){
    try {
      const outgoingTransaction = await OutgoingTransactionModel.findOne({ orderId, method: OutgoingTransactionMethod.EasyTransfer, status: TransactionStatus.Pending });
      if (isEmpty(outgoingTransaction)) return { error: OutgoingTransactionNotFound, code: 404, success: false };

      await OutgoingTransactionModel.updateOne({ orderId }, { status: TransactionStatus.Canceled });
      return { error: '', code: 200, success: true };

    } catch (error) {
      throw new ApolloError(error.message);
    }
  },

  async cancelWithdraw(root, { orderId }, { OutgoingTransactionModel }: ModuleContext<IFinanceModuleContext>){
    try {
      const outgoingTransaction = await OutgoingTransactionModel.findOne({ orderId, method: OutgoingTransactionMethod.Withdraw, status: TransactionStatus.Pending });
      if (isEmpty(outgoingTransaction)) return { error: TransactionNotFound, code: 404, success: false };

      await OutgoingTransactionModel.updateOne({ orderId }, { status: TransactionStatus.Canceled });

      return { error: '', code: 200, success: true };

    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

};
