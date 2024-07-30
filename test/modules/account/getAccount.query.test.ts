import 'reflect-metadata';
import gql from 'graphql-tag';

import { user6, user7 } from '../../utils';
import * as modules from '../../../src/utils/helpers';
import { data, getModels, injector } from '../../helper';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-core';

const UserModel = getModels('User', 'users');

const input1 = {
  title: 'when account not found',
  query: gql`
  { 
    getAccount(accountId: "1225655") {
        accountId
        name
      }
    }
  `,
  expected: {
    data: {
      getAccount: {
        accountId: null,
        name: ''
      }
    }
  }
};

const input2 = {
  title: 'when account exist',
  query: gql`
    { 
      getAccount(accountId: "255694563215") {
          accountId
          name
        }
      }
    `,
  expected: {
    data: {
      getAccount: {
        accountId: '255694563215',
        name: 'joker1015'
      }
    }
  }
};

const input3 = {
  title: 'when error',
  query: gql`
      { 
        getAccount(accountId: "255694563215") {
            accountId
            name
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
      const result = await data(query, { user: user7 });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { injector, UserModel, user: user7 });
    expect(result).toEqual(expected);
  });
});
