import 'reflect-metadata';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';

import { ApolloError } from 'apollo-server-core';
import { OutgoingTransactionData4 } from '../../utils';
import { getModels, data } from '../../helper';

const OutgoingTransactionModel = getModels('OutgoingTransaction', 'outgoingTransaction');

const input1 = {
  title: 'when Transaction not Found',
  query: gql`
  mutation{ 
    cancelWithdraw(orderId: "TT66956655") {
        error, 
        code, 
        success 
      }
    }
  `,
  expected: {
    data: {
      cancelWithdraw: {
        error: 'Transaction not Found',
        code: 404,
        success: false
      }
    }
  }
};

const input2 = {
  title: 'when Transaction exist',
  query: gql`
    mutation{ 
        cancelWithdraw(orderId: "TT6597336545") {
          error, 
          code, 
          success 
        }
      }
    `,
  expected: {
    data: {
      cancelWithdraw: {
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
        cancelWithdraw(orderId: "TT6597336545") {
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
    const { query, expected } = input;
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      OutgoingTransactionModel = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    await OutgoingTransactionModel.create(OutgoingTransactionData4);
    const result = await data(query, { OutgoingTransactionModel });
    expect(result).toEqual(expected);
  });
});
