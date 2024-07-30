import 'reflect-metadata';
import { ApolloError } from 'apollo-server-core';
import gql from 'graphql-tag';

import * as modules from '../../../src/modules/finance/resolvers/finance.mutation';
import { data } from '../../helper';

const input1 = {
  title: 'test acceptInternalWithdrawOrder mutation',
  query: gql`
  mutation { 
    acceptInternalWithdrawOrder( orderId: "154686153" ) {
        success, 
        code, 
        error,
      }
    }
  `,
  expected: {
    data: {
      acceptInternalWithdrawOrder: {
        success: true,
        code: 200,
        error: '',
      }
    }
  }
};

const input2 = {
  title: 'Checking catch block',
  query: gql`
  mutation { 
    acceptInternalWithdrawOrder( orderId: "154686153" ) {
        success, 
        code, 
        error,
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
  `('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query, expected } = input;
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      modules.Mutation.acceptEasyTransferOrder = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toEqual(input.expected.error) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    modules.Mutation.acceptEasyTransferOrder = jest.fn().mockReturnValue({ error: '', code: 200, success: true });
    const result = await data(query, { });
    expect(result).toEqual(expected);
  });
});
