import 'reflect-metadata';
import gql from 'graphql-tag';

import { data, getModels, injector } from '../../helper';
import { ApolloError } from 'apollo-server-errors';
import { technicalData } from '../../utils';
import { GraphQLError } from 'graphql';

const TechnicalModel = getModels('Technical', 'technical');

const input1 = {
  title: 'test getTechnicalDetails',
  query: gql`
  { 
    getTechnicalDetails{
      minTransactionUSD
      maxTransactionUSD
      }
    }
  `,
  expected: {
    data: {
      getTechnicalDetails: {
        minTransactionUSD: 10,
        maxTransactionUSD: 1000,
      }
    }
  }
};

const input2 = {
  title: 'test getTechnicalDetails error',
  query: gql`
  { 
    getTechnicalDetails{
      minTransactionUSD
      maxTransactionUSD
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
    await TechnicalModel.create(technicalData);
    const result = await data(query, { TechnicalModel });
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      console.log(result);
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.getTechnicalDetails.code).toEqual(input.expected.error);
    }
    expect(result).toEqual(expected);
  });
});
