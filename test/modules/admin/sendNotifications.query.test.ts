import 'reflect-metadata';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-core';

import { user6 } from '../../utils';
import { getModels, data, injector } from '../../helper';

const UserModel = getModels('User', 'users');

const input1 = {
  title: 'test sendNotifications mutation',
  query: gql`
  query{ 
    sendNotifications(message: "Hi", telegramIds: "568469fg54") {
        error, 
        code, 
        success 
      }
    }
  `,
  expected: {
    data: {
      sendNotifications: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

const input2 = {
  title: 'when telegramId not exist',
  query: gql`
    query{ 
      sendNotifications(message: "Hi") {
        error, 
        code, 
        success 
        }
      }
    `,
  expected: {
    data: {
      sendNotifications: {
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
  query {
    sendNotifications(message: "Hi") {
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
    await UserModel.create(user6);
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { injector, user: user6, UserModel });
    expect(result).toEqual(expected);
  });
});
