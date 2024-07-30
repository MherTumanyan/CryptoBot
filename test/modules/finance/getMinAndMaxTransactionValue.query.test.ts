import 'reflect-metadata';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-core';

import { CurrencyType, CoinType } from '@spot_wallet/core';
import { data, getModels, injector } from '../../helper';
import { technicalData } from '../../utils';

const TechnicalModel = getModels('Technical', 'technical');

const input1 = {
  title: 'test getMinAndMaxTransactionValue query',
  query: gql`
  { 
    getMinAndMaxTransactionValue(coinType: ${CoinType.Btc}, currency: ${CurrencyType.Usd}) {
        minTransactionValue
        maxTransactionValue
      }
    }
  `,
  expected: {
    data: {
      getMinAndMaxTransactionValue: {
        minTransactionValue: 10,
        maxTransactionValue: 1000
      }
    }
  }
};

const input2 = {
  title: 'when coinType not exist',
  query: gql`
    { 
      getMinAndMaxTransactionValue(currency: ${CurrencyType.Usd}) {
          minTransactionValue
          maxTransactionValue
        }
      }
    `,
  expected: {
    data: {
      getMinAndMaxTransactionValue: {
        minTransactionValue: 10,
        maxTransactionValue: 1000
      }
    }
  }
};

const input3 = {
  title: 'when currency not exist',
  query: gql`
    query { 
      getMinAndMaxTransactionValue{
          minTransactionValue
          maxTransactionValue
        }
      }
    `,
  expected: GraphQLError,
};

const input4 = {
  title: 'when when currency and coinType not exist',
  query: gql`
      { 
        getMinAndMaxTransactionValue(currency: ${CurrencyType.Usd}) {
            minTransactionValue
            maxTransactionValue
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
  ${input4}
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query, expected } = input;
    await TechnicalModel.create(technicalData);
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      TechnicalModel = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { injector, TechnicalModel });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { injector, TechnicalModel });
    if (result.errors) {
      return expect(result.errors[0]).toBeInstanceOf(expected);
    }
    expect(result).toEqual(expected);
  });
});
