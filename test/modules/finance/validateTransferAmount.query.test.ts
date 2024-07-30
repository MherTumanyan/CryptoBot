import 'reflect-metadata';
import gql from 'graphql-tag';

import { data, injector } from '../../helper';
import * as modules from '../../../src/utils/helpers';
import { user1 } from '../../utils';
import { CoinType } from '@spot_wallet/core';
import { ApolloError } from 'apollo-server-core';

const input1 = {
  title: 'test validateTransferAmount query',
  query: gql`
  query{ 
    validateTransferAmount( amountInCoin: 15, totalAmountInCoin: 10, coin: ${ CoinType.Dash } ) {
       valid {
         code
       }
      }
    }
  `,
  expected: {
    data: {
      validateTransferAmount: {
        valid: {
          code: 400
        }
      }
    }
  }
};

const input2 = {
  title: 'Checking catch block',
  query: gql`
    query{ 
    validateTransferAmount( amountInCoin: 15, totalAmountInCoin: 10, coin: ${ CoinType.Dash } ) {
      valid {
         code
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
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      modules.isValidTransferAmount = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { user: user1, injector });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toEqual(input.expected.error) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { user: user1, injector });
    expect(result).toEqual(expected);
  });
});
