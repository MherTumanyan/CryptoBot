import 'reflect-metadata';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-core';

import { CoinbaseProvider, OutgoingTransactionMethod, TransactionStatus } from '@spot_wallet/core';
import { getModels, data, injector } from '../../helper';
import * as modules from '../../../src/utils/helpers';
import { user6 } from '../../utils';

const UserModel = getModels('User', 'users');
const OutgoingTransactionModel = getModels('OutgoingTransaction', 'outgoingTransaction');

const input1 = {
  title: 'when trasaction status Canceled',
  query: gql`
  mutation{ 
    checkOutgoingTransactionStatus {
        error, 
        code, 
        success 
      }
    }
  `,
  expected: {
    data: {
      checkOutgoingTransactionStatus: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

const input2 = {
  title: 'when trasaction status Completed',
  query: gql`
  mutation{ 
    checkOutgoingTransactionStatus {
        error, 
        code, 
        success 
      }
    }
  `,
  trasactionStatusCompleted: true,
  expected: {
    data: {
      checkOutgoingTransactionStatus: {
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
    await OutgoingTransactionModel.create({ userId: '5656c6d2-b3a3-46bf-a3f9-5aba260bb160', status: TransactionStatus.Sent, method: OutgoingTransactionMethod.Withdraw });
    await UserModel.create(user6);

    if (trasactionStatusCompleted) {
      injector.provide({
        provide: CoinbaseProvider,
        overwrite: true,
        useValue:  {
          // @ts-ignore
          getTransaction: () => Promise.resolve({ status: 'CANCELED', network: { transaction_url: 'url' } }),
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
    const result = await data(query, { injector, user: user6, UserModel, OutgoingTransactionModel });
    expect(result).toEqual(expected);
  });
});
