import 'reflect-metadata';
import gql from 'graphql-tag';

import { data, getModels, injector } from '../../helper';
import { OutgoingTransactionData3, user8 } from '../../utils';
import { ApolloError } from 'apollo-server-core';
import { GraphQLError } from 'graphql';

const UserModel = getModels('User', 'users');
const OutgoingTransactionModel = getModels('OutgoingTransaction', 'outgoingTransaction');

const input1 = {
  title: 'test checkEasyTransferStatus mutation',
  query: gql`
  mutation{ 
    checkEasyTransferStatus{
        error, 
        code, 
        success 
      }
    }
  `,
  outgoingTransaction: true,
  expected: {
    data: {
      checkEasyTransferStatus: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

const input2 = {
  title: 'when OutgoingTransactionModel not found',
  query: gql`
  mutation{ 
    checkEasyTransferStatus{
        error, 
        code, 
        success 
      }
    }
  `,
  outgoingTransaction: false,
  expected: {
    data: {
      checkEasyTransferStatus: {
        error: 'Transaction not Found',
        code: 404,
        success: false
      }
    }
  }
};

const input3 = {
  title: 'Checking catch block',
  query: gql`
  mutation{ 
    checkEasyTransferStatus{
        error, 
        code, 
        success 
      }
    }
  `,
  outgoingTransaction: true,
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
    const { query, expected, outgoingTransaction } = input;
    if (outgoingTransaction) {
      await OutgoingTransactionModel.create(OutgoingTransactionData3);
      await UserModel.create(user8);
    }

    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { injector, user: user8 });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { OutgoingTransactionModel, UserModel, injector });
    expect(result).toEqual(expected);
  });
});
