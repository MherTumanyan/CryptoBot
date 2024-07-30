import 'reflect-metadata';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';

import { getModels, data } from '../../helper';
import { userData1 } from '../../utils';
import { ApolloError } from 'apollo-server-errors';
import { Language } from '@spot_wallet/core';
import { Query } from '@spot_wallet/finance/resolvers/finance.query';

const UserModel = getModels('User', 'users');

const input1 = {
  title: 'test updateUser mutation',
  query: gql`
  mutation{
    updateUser(nickName: "Vahag", language: ${Language.En}){
            code
            success
            error
            data {
                language
                firstName
                lastName
                nickName
                accountId
            }
        }
    }
  `,
  expected: {
    data: {
      updateUser: {
        code: 200,
        success: true,
        error: '',
        data: {
          language: 'EN',
          firstName: 'Jocker',
          lastName: 'Jocker',
          nickName: 'Vahag',
          accountId: '093373'
        }
      },
    }
  },
};

const input2 = {
  title: 'test updateUser error',
  query: gql`
    mutation{
      updateUser(nickName: "Vahag", language: ${Language.En}){
              code
              success
              error
              data {
                  language
                  firstName
                  lastName
                  nickName
                  accountId
              }
          }
      }
    `,
  expected: {
    error: new ApolloError('message')
  }
};

const input3 = {
  title: 'test updateUser ststus code 400',
  query: gql`
    mutation{
      updateUser(nickName: "Vahag", language: ${Language.En}){
              code
              success
              error
          }
      }
    `,
  responceCode: 400,
  expected: {
    data: {
      updateUser: {
        code: 400,
        success: false,
        error: '',
      },
    }
  },
};

describe.each`
  input
  ${input1}
  ${input2}
  ${input3}
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const user = await UserModel.create(userData1);
    const { query, expected, responceCode } = input;
    Query.validateName =jest.fn().mockImplementation(() => {
      return { error: '', code: 200, success: true };
    });
    if (responceCode){
      Query.validateName =jest.fn().mockImplementation(() => {
        return { error: '', code: 400, success: false };
      });
      const result = await data(query, { UserModel, user });
      return expect(result).toEqual(expected);
    }
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { user });

      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.updateUser.code).toEqual(input.expected.error);
    }
    const result = await data(query, { UserModel, user });
    expect(result).toEqual(expected);
  });
});
