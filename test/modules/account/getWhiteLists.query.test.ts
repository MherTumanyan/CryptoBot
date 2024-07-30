import 'reflect-metadata';
import gql from 'graphql-tag';

import { data, getModels } from '../../helper';
import { ApolloError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';

const WhitelistModel = getModels('Whitelist', 'whitelists');

const input1 = {
  title: 'test getWhiteLists',
  query: gql`
  { 
      getWhiteLists {
        getWhiteLists {
            whitelists {
                whitelistForDev
            }
        }
    }
    }
  `,
  expected: {
    data: {
      getWhiteLists: null
    }
  }
};

const input2 = {
  title: 'test getWhiteLists error',
  query: gql`
  { 
      getWhiteLists {
        getWhiteLists {
            whitelists {
                whitelistForDev
            }
        }
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
    await WhitelistModel.create();
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.getTechnicalDetails.code).toEqual(input.expected.error);
    }
    const result = await data(query, { WhitelistModel });
    expect(result).toEqual(expected);
  });
});
