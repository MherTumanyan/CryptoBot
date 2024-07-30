import 'reflect-metadata';
import gql from 'graphql-tag';

import { getModels, data } from '../../helper';
import { user13 } from '../../utils';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-core';

const UserModel = getModels('User', 'users');

const input1 = {
  title: 'when phoneNumber is not vaild',
  query: gql`
  query{ 
    validateName(name: "v") {
        success, 
        code, 
        error
      }
    }
  `,
  expected: {
    data: {
      validateName: {
        error: '',
        code: 400,
        success: false
      }
    }
  }
};

const input2 = {
  title: 'when phoneNumber is existed',
  query: gql`
    query{ 
        validateName(name: "joker918") {
          success, 
          code, 
          error
        }
      }
    `,
  expected: {
    data: {
      validateName: {
        error: '',
        code: 409,
        success: false
      }
    }
  }
};

const input3 = {
  title: 'when phoneNumber is not exist',
  query: gql`
      query{ 
        validateName(name: "unique1") {
            success, 
            code, 
            error
          }
        }
      `,
  expected: {
    data: {
      validateName: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

const input4 = {
  title: 'Checking catch block',
  query: gql`
        query{ 
          validateName(name: "uniqu56") {
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
    await UserModel.create(user13);
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      UserModel = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { UserModel });

      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { UserModel });
    expect(result).toEqual(expected);
  });
});
