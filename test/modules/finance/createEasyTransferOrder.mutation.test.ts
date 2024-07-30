import 'reflect-metadata';
import gql from 'graphql-tag';
import { ApolloError } from 'apollo-server-core';

import { CoinType, CurrencyType } from '@spot_wallet/types';
import { getModels, data, injector } from '../../helper';
import * as modules from '../../../src/utils/helpers';
import { user10 } from '../../utils';

const UserModel = getModels('User', 'users');
const OutgoingTransactionModel = getModels('OutgoingTransaction', 'outgoingTransaction');
const HistoryMetaModel = getModels('HistoryMeta', 'historyMeta');

const input1 = {
  title: 'when Receiver not found',
  query: gql`
  mutation{ 
    createEasyTransferOrder( currency: ${CurrencyType.Usd}, amountInCurrency: 15, coinType: ${CoinType.Dash}, coinType: ${CoinType.Dash}, , receiverAccountId: "35684569542") {
        error, 
        code, 
        success 
      }
    }
  `,
  isValidTransferAmount: { error: '', code: 200, success: true },
  expected: {
    data: {
      createEasyTransferOrder: {
        error: 'Receiver not found',
        code: 404,
        success: false
      }
    }
  }
};

const input2 = {
  title: 'when Receiver exist',
  query: gql`
    mutation{ 
      createEasyTransferOrder( currency: ${CurrencyType.Usd}, amountInCurrency: 15, coinType: ${CoinType.Dash}, coinType: ${CoinType.Dash}, , receiverAccountId: "6542793158s5") {
          error, 
          code, 
          success 
        }
      }
    `,
  isValidTransferAmount: { error: '', code: 200, success: true },
  expected: {
    data: {
      createEasyTransferOrder: {
        code: 200,
        error: '',
        success: true,
      }
    }
  }
};

const input3 = {
  title: 'Checking catch block',
  query: gql`
    mutation{ 
      createEasyTransferOrder( currency: ${CurrencyType.Usd}, amountInCurrency: 15, coinType: ${CoinType.Dash}, coinType: ${CoinType.Dash}, , receiverAccountId: "6542793158s5") {
          error, 
          code, 
          success 
        }
      }
    `,
  isValidTransferAmount: { error: '', code: 200, success: true },
  expected: {
    error: new ApolloError('message')
  }
};

const input4 = {
  title: 'when isValidTransferAmount false',
  query: gql`
    mutation{ 
      createEasyTransferOrder( currency: ${CurrencyType.Usd}, amountInCurrency: 15, coinType: ${CoinType.Dash}, coinType: ${CoinType.Dash}, , receiverAccountId: "6542793158s5") {
          error, 
          code, 
          success 
        }
      }
    `,
  isValidTransferAmount: { error: '', code: 400, success: false },
  expected: {
    data: {
      createEasyTransferOrder: {
        error: '',
        code: 400,
        success: false
      }
    }
  }
};

describe.each`
  input 
  ${input1}
  ${input2}
  ${input3}
  ${input4}
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    await UserModel.create(user10);
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
      const result = await data(query, { injector, user: user10, UserModel, OutgoingTransactionModel, HistoryMetaModel });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toEqual(input.expected.error) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { injector, user: user10, UserModel, OutgoingTransactionModel, HistoryMetaModel });
    expect(result).toEqual(expected);
  });
});
