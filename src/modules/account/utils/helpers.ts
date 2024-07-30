import { CoinType, IncomingTransaction } from '@spot_wallet/core';
import { hash } from 'bcrypt';
import { sumBy } from 'lodash';

export const getHashedPassword = async (password: string): Promise<string> => hash(password, 10);

export const getTransactionAmountByCoinType = (transactions: IncomingTransaction[], coinType: CoinType): number => {
  return sumBy(transactions, (transaction: IncomingTransaction) => {
    if (transaction.coinType === coinType) return transaction.amount;
  });
};
