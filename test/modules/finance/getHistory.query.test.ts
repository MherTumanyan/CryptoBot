import 'reflect-metadata';
import gql from 'graphql-tag';

import { user6, OutgoingTransactionData, historyData1, user13, incomingTransactionData, historyData2, user11, incomingTrasactionData2 } from '../../utils';
import { getModels, data } from '../../helper';
import * as modules from '../../../src/utils/helpers';
import { ApolloError } from 'apollo-server-core';
import { GraphQLError } from 'graphql';

const UserModel = getModels('User', 'users');
const OutgoingTransactionModel = getModels('OutgoingTransaction', 'outgoingTransaction');
const IncomingTransactionModel = getModels('IncomingTransaction', 'incomingTransaction');
const HistoryMetaModel = getModels('HistoryMeta', 'historyMeta');

const input1 = {
  title: 'when OutgoingTransactionModel exist',
  query: gql`
  query{ 
    getHistory(skip: 0, limit: 5) {
        transactionType
        method
      }
    }
  `,
  out: true,
  expected: {
    data: {
      getHistory: [{
        transactionType: 'OUT',
        method: 'WITHDRAW',
      }]
    }
  }
};

const input2 = {
  title: 'when IncomingTransactionModel exist',
  query: gql`
  query{ 
    getHistory(skip: 0, limit: 5) {
        transactionType
        method
      }
    }
  `,
  incoming: true,
  expected: {
    data: {
      getHistory: [{
        transactionType: 'IN',
        method: 'PAYMENT',
      }]
    }
  }
};

const input3 = {
  title: 'when error exist',
  query: gql`
  query{ 
    getHistory(skip: 0, limit: 5) {
        transactionType
        method
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
    const { query, expected, out, incoming } = input;
    if (out) {
      await UserModel.create(user13);
      const out = await OutgoingTransactionModel.create(OutgoingTransactionData);
      // @ts-ignore
      historyData1.transactionId = out._id;
      await HistoryMetaModel.create(historyData1);
      const result = await data(query, { user: user13, UserModel, OutgoingTransactionModel, IncomingTransactionModel, HistoryMetaModel });
      return expect(result).toEqual(expected);
    }

    if (incoming) {
      await UserModel.create(user11);
      const incoming = await IncomingTransactionModel.create(incomingTrasactionData2);
      // @ts-ignore
      historyData2.transactionId = incoming._id;
      await HistoryMetaModel.create(historyData2);
      const result = await data(query, { user: user11, UserModel, OutgoingTransactionModel, IncomingTransactionModel, HistoryMetaModel });
      return expect(result).toEqual(expected);
    }
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { user: user11 });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
  });
});
