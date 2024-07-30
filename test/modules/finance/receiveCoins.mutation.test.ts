import 'reflect-metadata';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';

import * as modules from '../../../src/utils/helpers';
import { getModels, data, injector } from '../../helper';
import { receivingAddressData, userData2, incomingTrasactionData1 } from '../../utils';
import { ApolloError } from 'apollo-server-core';

const UserModel = getModels('User', 'users');
const ReceivingAddressModel = getModels('ReceivingAddress', 'receivingAddress');
const HistoryMetaModel = getModels('HistoryMeta', 'historyMeta');
const IncomingTransactionModel= getModels('IncomingTransaction', 'incomingTransaction');

const input1 = {
  title: 'when address does not exist',
  query: gql`
  mutation{ 
    receiveCoins(address: "5d66s-a6s6d-sad-s5d5", total: { amount: "150", currency:"BTC" }, transactionId: "15d5df4485df5g48", hash:"589655235") {
        success, 
        code, 
        error
      }
    }
  `,
  expected: {
    data: {
      receiveCoins: {
        success: false,
        code: 404,
        error: 'The address does not exist'
      }
    }
  }
};

const input2 = {
  title: 'when address already exists',
  query: gql`
    mutation{ 
      receiveCoins(address: "dshdsfnsdljfsdf", total: { amount: "150", currency:"BTC" }, transactionId: "15d5df4485df5g48", hash:"4213652156") {
          success,
          code,
          error
        }
      }
    `,
  expected: {
    data: {
      receiveCoins: {
        success: false,
        code: 404,
        error: 'The address already exists'
      }
    }
  }
};

const input3 = {
  title: 'when address correct',
  query: gql`
    mutation{ 
      receiveCoins(address: "dshdsfnsdljfsdf", total: { amount: "150", currency:"BTC" }, transactionId: "45866d585d6622d", hash:"956455863") {
          success, 
          code, 
          error
        }
      }
    `,
  expected: {
    data: {
      receiveCoins: {
        success: true,
        code: 200,
        error: ''
      }
    }
  },
  address: 'dshdsfnsdljfsdf',
  transactionId: '45866d585d6622d',
  addressHistory: '956455863'
};

const input4 = {
  title: 'Checking catch block',
  query: gql`
    mutation{ 
      receiveCoins(address: "dshdsfnsdljfsdf", total: { amount: "150", currency:"BTC" }, transactionId: "45866d585d6622d", hash:"956455863") {
          success, 
          code, 
          error
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
${input4}
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query, expected } = input;
    await ReceivingAddressModel.create(receivingAddressData);
    await IncomingTransactionModel.create(incomingTrasactionData1);
    await UserModel.create(userData2);
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      modules.getCustomId = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { UserModel, ReceivingAddressModel, HistoryMetaModel, IncomingTransactionModel, injector });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toEqual(input.expected.error) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { UserModel, ReceivingAddressModel, HistoryMetaModel, IncomingTransactionModel, injector });
    expect(result).toEqual(expected);
  });
});
