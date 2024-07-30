import 'reflect-metadata';
import gql from 'graphql-tag';

import { user6, OutgoingTransactionData } from '../../utils';
import { getModels, data, injector } from '../../helper';
import * as modules from '../../../src/utils/helpers';
import { ApolloError } from 'apollo-server-core';

const UserModel = getModels('User', 'users');
const OutgoingTransactionModel = getModels('OutgoingTransaction', 'outgoingTransaction');
const IncomingTransactionModel = getModels('IncomingTransaction', 'incomingTransaction');
const HistoryMetaModel = getModels('HistoryMeta', 'historyMeta');

const input1 = {
  title: 'when Order not found',
  query: gql`
  mutation{ 
    acceptEasyTransferOrder(orderId: "TT8439241548") {
        error, 
        code, 
        success 
      }
    }
  `,
  outTransaction: true,
  expected: {
    data: {
      acceptEasyTransferOrder: {
        error: 'Order not found',
        code: 404,
        success: false
      }
    }
  }
};

const input2 = {
  title: 'when everything correct',
  query: gql`
    mutation{ 
        acceptEasyTransferOrder(orderId: "TT8439241") {
          error, 
          code, 
          success 
        }
      }
    `,
  outTransaction: true,
  expected: {
    data: {
      acceptEasyTransferOrder: {
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
          acceptEasyTransferOrder(orderId: "TT8439241") {
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

const input4 = {
  title: 'when isValidTransferAmount false',
  query: gql`
    mutation{ 
        acceptEasyTransferOrder(orderId: "TT8439241") {
          error, 
          code, 
          success 
        }
      }
    `,
  isValidTransfer: { error: '', code: 400, success: false },
  expected: {
    data: {
      acceptEasyTransferOrder: {
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
    const { query, expected, isValidTransfer } = input;
    // @ts-ignore
    modules.isValidTransferAmount = jest.fn().mockReturnValue({ error: '', code: 200, success: true });
    if (isValidTransfer?.code) {
      // @ts-ignore
      modules.isValidTransferAmount = jest.fn().mockReturnValue({ error: '', code: 400, success: false });
    }
    await UserModel.create(user6);
    await OutgoingTransactionModel.create(OutgoingTransactionData);
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      modules.isValidTransferAmount = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { injector, user: user6, UserModel, OutgoingTransactionModel, IncomingTransactionModel, HistoryMetaModel });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toEqual(input.expected.error) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { injector, user: user6, UserModel, OutgoingTransactionModel, IncomingTransactionModel, HistoryMetaModel });
    expect(result).toEqual(expected);
  });
});
