import 'reflect-metadata';
import gql from 'graphql-tag';

import { getModels, data, injector } from '../../helper';
import { UserAlreadyExists } from '@spot_wallet/utils';
import * as modules from '../../../src/utils/helpers';
import { user3 } from '../../utils';
import { ApolloError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';

const UserModel = getModels('User', 'users');
const telegramId = '798788716';

const input1 = {
  title: 'Should throw error when user already registered',
  query: gql`
  mutation{
    registerTelegramUser(firstName: "Joker1", lastName: "Joker2", telegramId: "56846954") {
      error,
      code,
      success
      }
    }
  `,
  expected: {
    data: {
      registerTelegramUser: {
        error: UserAlreadyExists,
        code: 409,
        success: false
      }
    }
  }
};

const input2 = {
  title: 'Should register(create) new user',
  query: gql`
  mutation{
    registerTelegramUser(firstName: "Joker", lastName: "Joker2", telegramId: "5684695254") {
      code,
      success,
      error
      }
    }
  `,
  expected: {
    data: {
      registerTelegramUser: {
        code: 200,
        success: true,
        error: ''
      }
    }
  },
  telegramId: '1545698656'
};

const input3 = {
  title: 'error case',
  query: gql`
  mutation{
    registerTelegramUser(firstName: "Joker", lastName: "Joker2", telegramId: "5684695254") {
      code,
      success,
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
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query, expected } = input;
    await UserModel.create(user3);
    // @ts-ignore
    modules.getCustomId = jest.fn().mockReturnValue(4276235);
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.registerTelegramUser.code).toEqual(input.expected.error);
    }
    const result = await data(query, { UserModel, user: undefined, telegramId, injector });
    expect(result).toEqual(expected);
  });
});
