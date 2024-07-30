import 'reflect-metadata';
import gql from 'graphql-tag';

import { user6 } from '../../utils';
import { getModels, data, injector } from '../../helper';
import * as modules from '../../../src/utils/helpers';
import { ApolloError } from 'apollo-server-core';
import { GraphQLError } from 'graphql';

const ReceivingAddressModel = getModels('ReceivingAddress', 'receivingAddress');

const input1 = {
  title: 'when Order not found',
  query: gql`
  query{ 
    getNewReceivingAddress(coinType: "BTC") 
    }
  `,
  expected: {
    data: {
      getNewReceivingAddress: 'address'
    }
  }
};

const input2 = {
  title: 'Checking catch block',
  query: gql`
      mutation{
          acceptEasyTransferOrder(orderId: "TT8439241") {
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
      const result = await data(query, { user: user6 });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { injector, user: user6, ReceivingAddressModel });
    expect(result).toEqual(expected);
  });
});
