import 'reflect-metadata';
import gql from 'graphql-tag';

import { getModels, data, injector } from '../../helper';
import { technicalData } from '../../utils';
import { ApolloError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';

const TechnicalModel = getModels('Technical', 'technical');

const input1 = {
  title: 'test updateCurrencyExchangeRates mutation',
  query: gql`
   mutation { 
        updateCurrencyExchangeRates {
          error 
          code 
          success
        }
    }
  `,
  expected: {
    data: {
      updateCurrencyExchangeRates: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

const input2 = {
  title: 'test updateCurrencyExchangeRates error',
  query: gql`
     mutation { 
          updateCurrencyExchangeRates {
            error 
            code 
            success
          }injector
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
    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { });
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { injector, TechnicalModel });
    expect(result).toEqual(expected);
  });
});
