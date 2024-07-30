import { ModuleContext } from '@graphql-modules/core';
import { ApolloError } from 'apollo-server-core';
import { sum, map } from 'lodash';

import { ExchangeCurrencyRateProvider } from '@spot_wallet/core';
import { CoinType, CurrencyType, IncomingTransactionMethod, QueryResolvers, TransactionStatus, UserBalance } from '@spot_wallet/types';
import { IAccountModuleContext } from '../account.module';
import { getTransactionAmountByCoinType } from '../utils';
import { numberToFixed } from '@spot_wallet/utils';
import { AccountProvider } from '../providers';

export const Query: QueryResolvers = {
  async getUserInfo(root, {}, { user, injector }: ModuleContext<IAccountModuleContext>) {

    const [USDT, BTC, ETH, DASH] = await Promise.all([
      injector.get(ExchangeCurrencyRateProvider).convertCurrency(user.balance.USDT, CoinType.Usdt, CurrencyType.Usd),
      injector.get(ExchangeCurrencyRateProvider).convertCurrency(user.balance.BTC, CoinType.Btc, CurrencyType.Usd),
      injector.get(ExchangeCurrencyRateProvider).convertCurrency(user.balance.ETH, CoinType.Eth, CurrencyType.Usd),
      injector.get(ExchangeCurrencyRateProvider).convertCurrency(user.balance.DASH, CoinType.Dash, CurrencyType.Usd)
    ]);

    const balance: UserBalance = {
      BTC: numberToFixed(user.balance.BTC),
      USDT: numberToFixed(user.balance.USDT, 0),
      ETH: numberToFixed(user.balance.ETH),
      DASH: numberToFixed(user.balance.DASH)
    };

    const balanceUSD: UserBalance = {
      USDT: numberToFixed(USDT, 0),
      BTC: numberToFixed(BTC, 0),
      ETH : numberToFixed(ETH, 0),
      DASH: numberToFixed(DASH, 0)
    };
    console.log();
    
    balanceUSD.totalUSD = sum(Object.values(balanceUSD));
    return {
      ...user,
      balance,
      balanceUSD,
    };
  },

  async getUnconfirmedBalance(root, {}, { user, IncomingTransactionModel, injector }: ModuleContext<IAccountModuleContext>) {
    const pendingTransactions = await IncomingTransactionModel.find({ userId: user.uuid, status: TransactionStatus.Pending, method: IncomingTransactionMethod.Payment });

    const unconfirmedBalance = {
      USDT: numberToFixed(getTransactionAmountByCoinType(pendingTransactions, CoinType.Usdt)),
      BTC:  numberToFixed(getTransactionAmountByCoinType(pendingTransactions, CoinType.Btc)),
      ETH:  numberToFixed(getTransactionAmountByCoinType(pendingTransactions, CoinType.Eth)),
      DASH: numberToFixed(getTransactionAmountByCoinType(pendingTransactions, CoinType.Dash))
    };

    const [USDT, BTC, ETH, DASH ] = await Promise.all([
      injector.get(ExchangeCurrencyRateProvider).convertCurrency(unconfirmedBalance.USDT, CoinType.Usdt, CurrencyType.Usd),
      injector.get(ExchangeCurrencyRateProvider).convertCurrency(unconfirmedBalance.BTC, CoinType.Btc, CurrencyType.Usd),
      injector.get(ExchangeCurrencyRateProvider).convertCurrency(unconfirmedBalance.ETH, CoinType.Eth, CurrencyType.Usd),
      injector.get(ExchangeCurrencyRateProvider).convertCurrency(unconfirmedBalance.DASH, CoinType.Dash, CurrencyType.Usd)
    ]);

    return {
      unconfirmedBalance,
      unconfirmedBalanceUSD: {
        USDT: numberToFixed(USDT, 0),
        BTC: numberToFixed(BTC, 0),
        ETH : numberToFixed(ETH, 0),
        DASH: numberToFixed(DASH, 0)
      }
    };
  },

  async getAccount(root, { accountId, externalCall = true }, { UserModel, user, injector }: ModuleContext<IAccountModuleContext>) {
    try {
      const account = await UserModel.findOne({ $and: [{ accountId }, { accountId: { $ne: user.accountId } }] });
      if (!account) return { accountId: null, name: '' };

      await injector.get(AccountProvider).setInternalReceivers(accountId, user.uuid);

      return { accountId, name: account.nickName };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  getWhiteLists: async (root, {}, { WhitelistModel }: ModuleContext<IAccountModuleContext>) => {
    try {
      const whiteList = WhitelistModel.findOne({});
      return whiteList ? whiteList : null;
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  getRecentReceivers(root, {}, { user, SuggestedReceiversModel }: ModuleContext<IAccountModuleContext>): any {
    try {

      return SuggestedReceiversModel.findOne({ ownerId: user.uuid });

    } catch ({ message }) {
      throw new ApolloError(message);
    }
  }
};
