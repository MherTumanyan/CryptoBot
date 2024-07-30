import 'reflect-metadata';
import gql from 'graphql-tag';

import { data } from '../../helper';
import { ApolloError } from 'apollo-server-core';
import { GraphQLError } from 'graphql';

const input1 = {
  title: 'when phoneNumber is not vaild',
  query: gql`
  query{ 
    validateDigits(phoneNumber: "374l55475964") {
        success, 
        code, 
        error
      }
    }
  `,
  expected: {
    data: {
      validateDigits: {
        error: '',
        code: 400,
        success: false
      }
    }
  }
};

const input2 = {
  title: 'when phoneNumber is not valid',
  query: gql`
    query{ 
        validateDigits(phoneNumber: "+5645dd6d") {
          success, 
          code, 
          error
        }
      }
    `,
  expected: {
    data: {
      validateDigits: {
        error: '',
        code: 400,
        success: false
      }
    }
  }
};

const input3 = {
  title: 'when phoneNumber is valid',
  query: gql`
      query{ 
        validateDigits(phoneNumber: "+37455478963") {
            success, 
            code, 
            error
          }
        }
      `,
  expected: {
    data: {
      validateDigits: {
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
          validateDigits(phoneNumber: [1256]) {
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
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });

      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { });
    expect(result).toEqual(expected);
  });
});
