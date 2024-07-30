import 'reflect-metadata';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';

import { getModels, data } from '../../helper';
import { userData1 } from '../../utils';
import { ApolloError } from 'apollo-server-errors';

const UserModel = getModels('User', 'users');

const input1 = {
  title: 'test toggleNotify mutation',
  query: gql`
  mutation{
    toggleNotify(notify: true) {
       code,
       success,
       error
      },
    }
  `,
  expected: {
    data: {
      toggleNotify: {
        code: 200,
        success: true,
        error: ''
      },
    }
  },
};

const input2 = {
  title: 'test toggleNotify error',
  query: gql`
  mutation{
    toggleNotify(notify: true) {
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
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const user = await UserModel.create(userData1);
    const { query, expected } = input;
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.toggleNotify.code).toEqual(input.expected.error);
    }
    const result = await data(query, { UserModel, user });
    expect(result).toEqual(expected);
    expect(user.notify).toBe(true);
  });
});
