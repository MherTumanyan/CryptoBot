import 'reflect-metadata';
import gql from 'graphql-tag';

import { getModels, data, injector } from '../../helper';
import { user4 } from '../../utils';
import { ApolloError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';

const UserModel = getModels('User', 'users');

const input1 = {
  title: 'Should send verification sms',
  query: gql`
  mutation{
    sendVerificationSms(phoneNumber: "37455897456") {
       code,
       success,
       error
      },
    }
  `,
  expected: {
    data: {
      sendVerificationSms: {
        code: 200,
        success: true,
        error: ''
      },
    }
  },
};

const input2 = {
  title: 'Should fail when the phone number is not valid',
  query: gql`
    mutation{
      sendVerificationSms(phoneNumber: "55897456") {
         code,
         success,
         error
        },
      }
    `,
  expected: {
    data: {
      sendVerificationSms: {
        code: 400,
        success: false,
        error: ''
      },
    }
  },
};

const input3 = {
  title: 'Should fail if phone number already exists',
  query: gql`
  mutation{
    sendVerificationSms(phoneNumber: "37455897459") {
       code,
       success,
       error
      },
    }
  `,
  expected: {
    data: {
      sendVerificationSms: {
        code: 409,
        success: false,
        error: ''
      },
    }
  },
};

const input4 = {
  title: 'error case',
  query: gql`
  mutation{
    sendVerificationSms(phoneNumber: "37455897459") {
       code,
       success,
       error
      },
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
    await UserModel.create(user4);
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.sendVerificationSms.code).toEqual(input.expected.error);
    }
    const result = await data(query, { user: user4, UserModel, injector });
    expect(result).toEqual(expected);
  });
});
