import 'reflect-metadata';
import gql from 'graphql-tag';

import { getModels, data } from '../../helper';
import { user5 } from '../../utils';
import { ApolloError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';

const UserModel = getModels('User', 'users');

const input1 = {
  title: 'when verification code correct',
  query: gql`
  mutation{ 
    verifyActivationCode(code: "1234") {
        error, 
        code, 
        success 
      }
    }
  `,
  expected: {
    data: {
      verifyActivationCode: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

const input2 = {
  title: 'when verification code incorrect',
  query: gql`
    mutation{ 
      verifyActivationCode(code: "1234897") {
          error, 
          code, 
          success 
        }
      }
    `,
  expected: {
    data: {
      verifyActivationCode: {
        error: '',
        code: 400,
        success: false
      }
    }
  }
};

const input3 = {
  title: 'when verification error',
  query: gql`
    mutation{ 
      verifyActivationCode(code: "1234897") {
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
    const result = await data(query, { UserModel, user: user5 });
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.verifyActivationCode.code).toEqual(input.expected.error);
    }
    expect(result).toEqual(expected);
  });
});
