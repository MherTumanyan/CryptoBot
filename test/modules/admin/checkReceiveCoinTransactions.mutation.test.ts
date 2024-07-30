import 'reflect-metadata';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-core';

import { TransactionStatus, IncomingTransactionMethod } from '@spot_wallet/types';
import { CoinbaseProvider } from '@spot_wallet/core';
import { getModels, data, injector } from '../../helper';
import * as modules from '../../../src/utils/helpers';
import { user6 } from '../../utils';

const UserModel = getModels('User', 'users');
const IncomingTransactionModel = getModels('IncomingTransaction', 'incomingTransaction');

const input1 = {
  title: 'when trasaction status Canceled',
  query: gql`
  mutation{ 
    checkReceiveCoinTransactions {
        error, 
        code, 
        success 
      }
    }
  `,
  expected: {
    data: {
      checkReceiveCoinTransactions: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

const input2 = {
  title: 'when trasaction status Canceled',
  query: gql`
    mutation{ 
      checkReceiveCoinTransactions {
          error, 
          code, 
          success 
        }
      }
    `,
  trasactionStatusCompleted: true,
  expected: {
    data: {
      checkReceiveCoinTransactions: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

const input3 = {
  title: 'Checking catch block',
  query: gql`
      mutation{
        checkOutgoingTransactionStatus(orderId: "TT8439241") {
              error,
              code,
              success
          }
      }
  `,
  expected: {
    error: new ApolloError('message')
  }
};

describe.each`
  input
  ${input1}
  ${input2}
  ${input3}
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query, expected, trasactionStatusCompleted } = input;
    await IncomingTransactionModel.create({ userId: '5656c6d2-b3a3-46bf-a3f9-5aba260bb160', status: TransactionStatus.Pending, method: IncomingTransactionMethod.Payment, address: 'aer4s5s-5as-5daaa', amount: '1' });
    await UserModel.create(user6);

    if (trasactionStatusCompleted) {
      injector.provide({
        provide: CoinbaseProvider,
        overwrite: true,
        useValue:  {
          // @ts-ignore
          getTransaction: () => Promise.resolve({ status: TransactionStatus.Completed, network: { transaction_url: 'url' } }),
        }
      });
    }
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      modules.isValidTransferAmount = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { injector, user: user6, UserModel, IncomingTransactionModel });
    expect(result).toEqual(expected);
  });
});
