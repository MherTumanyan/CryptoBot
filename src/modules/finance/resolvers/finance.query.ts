import { customAlphabet } from 'nanoid';
import WAValidator from 'multicoin-address-validator';
import { groupBy, map, orderBy, sortBy, isEmpty } from 'lodash';
import { ModuleContext } from '@graphql-modules/core';
import {
  CurrencyType,
  HistoryResponse,
  HistoryTransactionType,
  QueryResolvers,
  CoinType,
  TransactionStatus
} from '@spot_wallet/types';
import { CoinbaseProvider, ExchangeCurrencyRateProvider } from '@spot_wallet/core';
import { ApolloError } from 'apollo-server-core';

import { CurrencyOrCoinTypeShouldExistError, isValidTransferAmount, numberToFixed } from '@spot_wallet/utils';
import { IFinanceModuleContext } from '../finance.module';
import { FinanceProvider } from '../providers';

// TODO fix queries

export const Query: QueryResolvers = {
  async getUsdAmount(root, { btcAmount, toFixed = 1 }, { injector }: ModuleContext<IFinanceModuleContext>) {
    try {
      const exchangeRates = { USD: 0 }; // TODO fix this is temp

      return {
        value: numberToFixed(btcAmount * exchangeRates.USD, toFixed)
      };
    } catch ({ message }){
      throw new ApolloError(message);
    }
  },

  async getOrderId({}, {}: ModuleContext<IFinanceModuleContext>) {
    try {
      const letters = customAlphabet('AXFHMNZK', 2);
      const numbers = customAlphabet('123456789', 6);
      return {
        id: letters().concat(numbers())
      };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async getIncomingTransactions(root, {}, { IncomingTransactionModel, user }: ModuleContext<IFinanceModuleContext>) {
    try {
      return IncomingTransactionModel.find({ userId: user.uuid })
        .sort({ createdAt: -1 })
        .limit(10);
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async getOutgoingTransactions(root, {}, { OutgoingTransactionModel, user }: ModuleContext<IFinanceModuleContext>) {
    try {
      return OutgoingTransactionModel.find({ userId: user.uuid })
        .sort({ createdAt: -1 })
        .limit(10);
    } catch ({ message }){
      throw new ApolloError(message);
    }
  },

  async validateCoinAddress(root, { coinAddress, coinType, externalCall = true }, { ReceivingAddressModel, user, injector }: ModuleContext<IFinanceModuleContext>) {
    const { uuid } = user;
    const userAddress = await ReceivingAddressModel.findOne({ userId: uuid, address: coinAddress });
    if (!isEmpty(userAddress)) return { error: '', code: 409, success: false };

    const valid = WAValidator.validate(coinAddress, coinType);
    if (!valid) return { error: '', code: 400, success: valid };

    if (externalCall)
      await injector.get(FinanceProvider).setExternalReceivers(coinAddress, coinType, user.uuid);

    return { error: '', code: 200, success: valid };
  },

  async getWithdrawTransactionFee(root, {}, { injector, TechnicalModel }: ModuleContext<IFinanceModuleContext>) {
    // this can be useful in future.
    const technicalDetails = await TechnicalModel.findOne();
    const { fees: { withdrawFees }, minTransactionUSD } = technicalDetails;
    const sortedFees = sortBy(withdrawFees, ['amountUSD']);
    const newWithdrawFees = map(sortedFees, withdrawFee => {
      const { fee, feeUSD, amountUSD } = withdrawFee;
      const feeInPercent = numberToFixed(fee * 100, 1);
      return {
        from: !amountUSD ? minTransactionUSD.toFixed(1) : amountUSD.toFixed(1),
        feeInPercent,
        feeInUSD: feeUSD
      };

    });
    return newWithdrawFees.map((fee, index) => ({
      ...fee,
      to: newWithdrawFees[index + 1]?.from ? (+newWithdrawFees[index + 1]?.from - 1).toString() : '♾'
    }));
  },

  async getEasyTransferFee(root, {}, { injector, TechnicalModel }: ModuleContext<IFinanceModuleContext>) {
    try {
      const technicalDetails = await TechnicalModel.findOne();
      const { fees: { easyTransferFees }, minTransactionUSD } = technicalDetails;
      const sortedFees = sortBy(easyTransferFees, ['amountUSD']);
      const newEasyTransferFees = map(sortedFees, easyTransferFee => {
        const { fee, feeUSD, amountUSD } = easyTransferFee;
        const feeInPercent = numberToFixed(fee * 100, 1);
        return {
          from: !amountUSD ? minTransactionUSD.toString() : amountUSD.toFixed(1),
          feeInPercent,
          feeInUSD: feeUSD
        };
      });
      return newEasyTransferFees.map((fee, index) => ({
        ...fee,
        to: newEasyTransferFees[index + 1]?.from ? (+newEasyTransferFees[index + 1]?.from - 1).toString() : '♾'
      }));
    } catch (errr) {
      console.log(errr);
    }
  },

  async validateTransferAmount(root, { amountInCoin, totalAmountInCoin, coin }, { user, injector }: ModuleContext<IFinanceModuleContext>) {
    try {
      const userCoinBalance = user.balance[coin];
      const { minTransactionValue, maxTransactionValue } = await injector.get(ExchangeCurrencyRateProvider).getMinAndMaxTransactionValue(coin);
      const isValidAmount = isValidTransferAmount({
        minTransactionValue,
        maxTransactionValue,
        amountInCoin,
        totalAmountInCoin,
        userCoinBalance,
      });
      return { valid: isValidAmount };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async validatePhoneNumber(root, { phoneNumber }, { UserModel }: ModuleContext<IFinanceModuleContext>) {
    try {
      // checks if number consists only digits, and is ARM(374) number
      const checkRegexp = /^374\d{8}$/gm;

      // replaces non-word characters with ''
      const phoneNumberWithoutSymbols = phoneNumber.replace(/[\W]/gm, '');

      if (!checkRegexp.test(phoneNumberWithoutSymbols)) {
        return {
          error: '',
          code: 400,
          success: false
        };
      }

      const existedNumber = await UserModel.findOne({ phoneNumber: phoneNumberWithoutSymbols });

      if (existedNumber) {
        return {
          error: '',
          code: 409,
          success: false
        };
      }

      return {
        error: '',
        code: 200,
        success: true,
        phoneNumber: phoneNumberWithoutSymbols
      };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async validateDigits(root, { phoneNumber }, {}: ModuleContext<IFinanceModuleContext>) {
    try {
      // checks if number consists only digits or not
      const checkRegexp = /^\d{1,20}$/gm;

      // replaces non-word characters with ''
      const phoneNumberWithoutSymbols = phoneNumber.replace(/[\W]/gm, '');

      if (!checkRegexp.test(phoneNumberWithoutSymbols)) {
        return {
          error: '',
          code: 400,
          success: false
        };
      }
      return {
        error: '',
        code: 200,
        success: true,
        phoneNumber: phoneNumberWithoutSymbols
      };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async validateName(root, { name }, { UserModel }: ModuleContext<IFinanceModuleContext>) {
    try {
      const existingUser = await UserModel.findOne({ nickName: new RegExp(`^${name}$`, 'i') });
      if (existingUser) return { error: '', code: 409, success: false };

      const checkRegexp = /[^A-Za-z0-9]+/gm;
      if (name?.length < 3 || name?.length > 30 || checkRegexp.test(name))
        return {
          error: '',
          code: 400,
          success: false
        };
      return {
        error: '',
        code: 200,
        success: true
      };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async getMinAndMaxTransactionValue(root, { coinType, currency }, { injector, TechnicalModel }: ModuleContext<IFinanceModuleContext>) {
    try {
      if ( !coinType && !currency )
        throw new ApolloError(CurrencyOrCoinTypeShouldExistError);

      const technicalDetails = await TechnicalModel.findOne();
      const { minTransactionUSD, maxTransactionUSD } = technicalDetails;
      let minTransactionValueInCoin: number;
      let maxTransactionValueInCoin: number;
      const minTransactionValueInCurrency = await injector.get(ExchangeCurrencyRateProvider).convertCurrency(minTransactionUSD, CurrencyType.Usd, currency);
      const maxTransactionValueInCurrency = await injector.get(ExchangeCurrencyRateProvider).convertCurrency(maxTransactionUSD, CurrencyType.Usd, currency);
      const minTransactionValue = currency === CurrencyType.Usd ? minTransactionUSD : minTransactionValueInCurrency;
      const maxTransactionValue = currency === CurrencyType.Usd ? maxTransactionUSD : maxTransactionValueInCurrency;
      if (coinType) {
        minTransactionValueInCoin = await injector.get(ExchangeCurrencyRateProvider).convertCurrency(minTransactionUSD, CurrencyType.Usd, coinType);
        maxTransactionValueInCoin = await injector.get(ExchangeCurrencyRateProvider).convertCurrency(maxTransactionUSD, CurrencyType.Usd, coinType);
      }
      return {
        minTransactionValue,
        maxTransactionValue,
        ...(coinType && { minTransactionValueInCoin }),
        ...(coinType && { maxTransactionValueInCoin }),
      };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async getHistory(
    root,
    { skip, limit },
    {
      OutgoingTransactionModel,
      IncomingTransactionModel,
      HistoryMetaModel,
      UserModel,
      user
    }: ModuleContext<IFinanceModuleContext>
  ) {
    try {
      const history: HistoryResponse[] = [];
      const historyMeta = await HistoryMetaModel.find({ userId: user.uuid, transactionStatus: { $nin: [TransactionStatus.Canceled, TransactionStatus.SystemCanceled] } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const outQuery = { _id: { $in: map(groupBy(historyMeta, 'transactionType')[HistoryTransactionType.Out], 'transactionId') } };
      const inQuery = { _id: { $in: map(groupBy(historyMeta, 'transactionType')[HistoryTransactionType.In], 'transactionId') } };

      const outgoingTransactions = await OutgoingTransactionModel.find(outQuery);
      const incomingTransactions = await IncomingTransactionModel.find(inQuery);

      await Promise.all(
        map(outgoingTransactions, async transaction => {
          const {
            createdAt,
            orderId,
            transactionType,
            method,
            outgoingAmount,
            outgoingAmountWithFee,
            outgoingAmountUSD,
            outgoingAmountWithFeeUSD,
            receiverAddress,
            toAccount,
            outgoingTransactionFeeInPercent,
            coinType
          } = transaction.toObject();

          const receiverAccount = toAccount ? await UserModel.findOne({ accountId: toAccount }) : null;
          const receiverInfo = receiverAccount
            ? { nickName: receiverAccount.nickName, address: receiverAccount.accountId }
            : { nickName: '', address: receiverAddress };
          history.push({
            createdAt,
            orderId,
            transactionType,
            method,
            amount: outgoingAmount,
            amountUSD: outgoingAmountUSD,
            feeUSD: numberToFixed(outgoingAmountWithFeeUSD - outgoingAmountUSD, 1),
            feeCoin: numberToFixed(outgoingAmountWithFee) - outgoingAmount,
            sender: {
              nickName: user.nickName,
              address: user.accountId
            },
            receiver: receiverInfo,
            status: transaction.status,
            coinType,
            outgoingTransactionFeeInPercent
          });
        })
      );

      await Promise.all(
        map(incomingTransactions, async transaction => {
          const { createdAt, orderId, transactionType, method, amount, amountUSD, address, fromAccount, coinType } = transaction.toObject();
          const fromUser = fromAccount ? await UserModel.findOne({ accountId: fromAccount }) : null;
          const senderInfo = fromUser ? { nickName: fromUser.nickName, address: fromUser.accountId } : { nickName: '', address: '' };

          history.push({
            createdAt,
            orderId,
            transactionType,
            method,
            amount,
            coinType,
            amountUSD,
            sender: senderInfo,
            receiver: {
              nickName: user.nickName,
              address: user.accountId
            },
            status: transaction.status
          });
        })
      );

      return orderBy(history, ['createdAt'], ['desc']);
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async getNewReceivingAddress(root, { coinType }, { ReceivingAddressModel, user, injector }: ModuleContext<IFinanceModuleContext>) {
    try {
      const { uuid } = user;
      const coinAddress = await injector.get(CoinbaseProvider).createWalletAddress(coinType as CoinType);
      await ReceivingAddressModel.create({
        userId: uuid,
        address: coinAddress,
        coinType: coinType,
      });
      return coinAddress;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },

  async isAddressInternal(root, { address, coinType }, { injector }: ModuleContext<IFinanceModuleContext>) {
    try {
      return injector.get(FinanceProvider).isInternalAddress(address, coinType);
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

};
