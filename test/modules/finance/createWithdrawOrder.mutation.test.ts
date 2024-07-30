import 'reflect-metadata';
import gql from 'graphql-tag';
import { ApolloError } from 'apollo-server-core';

import { CoinType, CurrencyType } from '@spot_wallet/types';
import { getModels, data, injector } from '../../helper';
import * as modules from '../../../src/utils/helpers';
import { user7 } from '../../utils';

const HistoryMetaModel = getModels('HistoryMeta', 'historyMeta');
const OutgoingTransactionModel= getModels('OutgoingTransaction', 'outgoingTransaction');
const ReceivingAddressModel = getModels('ReceivingAddress', 'receivingAddress');

const input1 = {
  title: 'test createWithdrawOrder mutation',
  query: gql`
  mutation { 
    createWithdrawOrder( currency: ${ CurrencyType.Usd }, amountInCurrency: 15, coinType: ${ CoinType.Btc }, coinAddress: "1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck" ) {
        success, 
        code, 
        error,
        data {
          currency,
          coinType,
          amountInCurrency,
          amountInCoin,
          withdrawFeeCoin,
          totalWithdrawAmountInCoin,
          withdrawFeeInCurrency,
          totalWithdrawAmountInCurrency,
          withdrawFeeInPercent,
          withdrawExpireTime,
        },
      }
    }
  `,
  isValidTransferAmount: { error: '', code: 200, success: true },
  expected: {
    data: {
      createWithdrawOrder: {
        success: true,
        code: 200,
        error: '',
        data : {
          currency: 'USD',
          coinType: 'BTC',
          amountInCurrency: 15,
          amountInCoin: 0.856,
          withdrawFeeCoin: 47,
          totalWithdrawAmountInCoin: 15,
          withdrawFeeInCurrency: 56,
          totalWithdrawAmountInCurrency: 46,
          withdrawFeeInPercent: 56,
          withdrawExpireTime: 30
        }
      }
    }
  }
};

const input2 = {
  title: 'when Address is incorrect',
  query: gql`
  mutation { 
    createWithdrawOrder( currency: ${ CurrencyType.Usd }, amountInCurrency: 15, coinType: ${ CoinType.Dash }, coinAddress: "294" ) {
        success, 
        code, 
        error,
      }
    }
  `,
  isValidTransferAmount: { error: '', code: 200, success: true },
  expected: {
    data: {
      createWithdrawOrder: {
        error: 'Address is incorrect',
        code: 404,
        success: false
      }
    }
  }
};

const input3 = {
  title: 'when isValidTransferAmount fasle',
  query: gql`
  mutation { 
    createWithdrawOrder( currency: ${ CurrencyType.Usd }, amountInCurrency: 15, coinType: ${ CoinType.Btc }, coinAddress: "1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck" ) {
        success, 
        code, 
        error,
      }
    }
  `,
  isValidTransferAmount: { error: '', code: 400, success: false },
  expected: {
    data: {
      createWithdrawOrder: {
        error: '',
        code: 400,
        success: false
      }
    }
  }
};

const input4 = {
  title: 'when Amount must be a positive number',
  query: gql`
  mutation { 
    createWithdrawOrder( currency: ${ CurrencyType.Usd }, amountInCurrency: -15, coinType: ${ CoinType.Dash }, coinAddress: "4d55f68-f55d8d66d-df55fd5-f66f44" ) {
        success, 
        code, 
        error,
      }
    }
  `,
  isValidTransferAmount: { error: '', code: 200, success: true },
  expected: {
    data: {
      createWithdrawOrder: {
        error: 'Amount must be a positive number',
        code: 400,
        success: false
      }
    }
  }
};

const input5 = {
  title: 'Checking catch block',
  query: gql`
  mutation { 
    createWithdrawOrder( currency: ${ CurrencyType.Usd }, amountInCurrency: 15, coinType: ${ CoinType.Dash }, coinAddress: "4d55f68-f55d8d66d-df55fd5-f66f44" ) {
        success, 
        code, 
        error,
        data {
          currency,
          coinType,
          amountInCurrency,
          amountInCoin,
          withdrawFeeCoin,
          totalWithdrawAmountInCoin,
          withdrawFeeInCurrency,
          totalWithdrawAmountInCurrency,
          withdrawFeeInPercent,
          withdrawExpireTime,
        },
      }
    }
  `,
  isValidTransferAmount: { error: '', code: 200, success: true },
  expected: {
    error: new ApolloError('message')
  }
};

describe.each`
  input
  ${input1}
  ${input2}
  ${input3}
  ${input4}
  ${input5}
  `('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query, expected, isValidTransferAmount } = input;
    // @ts-ignore
    modules.isValidTransferAmount = jest.fn().mockReturnValue(isValidTransferAmount);

    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      modules.isValidTransferAmount = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { injector, user: user7, OutgoingTransactionModel, HistoryMetaModel });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toEqual(input.expected.error) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }

    const result = await data(query, { injector, user: user7, OutgoingTransactionModel, HistoryMetaModel, ReceivingAddressModel });
    expect(result).toEqual(expected);
  });
});
