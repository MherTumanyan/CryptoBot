import 'reflect-metadata';
import gql from 'graphql-tag';

import { OutgoingTransactionData2, user8, user14 } from '../../utils';
import { getModels, data, injector } from '../../helper';
import * as modules from '../../../src/utils/helpers';
import { ApolloError } from 'apollo-server-core';

const UserModel = getModels('User', 'users');
const OutgoingTransactionModel = getModels('OutgoingTransaction', 'outgoingTransaction');
const ReceivingAddressModel = getModels('ReceivingAddress', 'receivingAddress');
const HistoryMetaModel = getModels('HistoryMeta', 'historyMeta');

const input1 = {
  title: 'when outgoing transaction empty',
  query: gql`
  mutation{ 
    acceptWithdrawOrder(orderId: "TT565365455") {
        error, 
        code, 
        success 
      }
    }
  `,
  isValidTransferAmount: { error: '', code: 200, success: true },
  expected: {
    data: {
      acceptWithdrawOrder: {
        error: 'Order not found',
        code: 404,
        success: false
      }
    }
  }
};

const input2 = {
  title: 'when outgoing transaction exist',
  query: gql`
    mutation{ 
        acceptWithdrawOrder(orderId: "TT84655241") {
          error, 
          code, 
          success 
        }
      }
    `,
  isValidTransferAmount: { error: '', code: 200, success: true },
  expected: {
    data: {
      acceptWithdrawOrder: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

const input3 = {
  title: 'when isValidTransferAmount false',
  query: gql`
    mutation{ 
        acceptWithdrawOrder(orderId: "TT84655241") {
          error, 
          code, 
          success
        }
      }
    `,
  isValidTransferAmount: { error: '', code: 400, success: false },
  expected: {
    data: {
      acceptWithdrawOrder: {
        error: '',
        code: 400,
        success: false
      }
    }
  }
};

const input4 = {
  title: 'Checking catch block',
  query: gql`
    mutation{ 
        acceptWithdrawOrder(orderId: "TT84655241") {
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

describe.each`
  input 
  ${input1}
  ${input2}
  ${input3}
  ${input4}
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query, expected, isValidTransferAmount } = input;
    // @ts-ignore
    modules.isValidTransferAmount = jest.fn().mockReturnValue(isValidTransferAmount);
    await UserModel.create(user14);
    await OutgoingTransactionModel.create(OutgoingTransactionData2);
    await UserModel.create(user8);

    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      modules.getCustomId = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { injector, user: user8, OutgoingTransactionModel, HistoryMetaModel, ReceivingAddressModel, UserModel });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toEqual(input.expected.error) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }

    const result = await data(query, { injector, user: user8, OutgoingTransactionModel, HistoryMetaModel, ReceivingAddressModel, UserModel });
    expect(result).toEqual(expected);
  });
});
