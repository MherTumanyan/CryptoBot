import 'reflect-metadata';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-core';

import { data, injector } from '../../helper';
import { CoinType } from '@spot_wallet/core';

const input1 = {
  title: 'test isAddressInternal query',
  query: gql`
  { 
    isAddressInternal(address: "ds55-s5sd5a-5ad5ad4da-adad4", coinType : ${CoinType.Btc} )
    }
  `,
  expected: {
    data: {
      isAddressInternal: true
    }
  }
};

const input2 = {
  title: 'Checking catch block',
  query: gql`
    { 
      isAddressInternal(address: "ds55-s5sd5a-5ad5ad4da-adad4", coinType : ${CoinType.Btc} )
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
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      injector.get = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });

      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { injector });
    expect(result).toEqual(expected);
  });
});
