import 'reflect-metadata';
import gql from 'graphql-tag';

import { data, injector } from '../../helper';
import { ApolloError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';
import { ReportProvider } from '@spot_wallet/core';

const input1 = {
  title: 'test dailyReport ScheduleJob',
  query: gql`
  { 
    dailyReport{
        error, 
        code, 
        success 
      }
    }
  `,
  expected: {
    data: {
      dailyReport: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

const input2 = {
  title: 'test dailyReport error',
  query: gql`
  { 
    dailyReport{
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
      injector.provide({
        provide: ReportProvider,
        overwrite: true,
        // @ts-ignore
        useValue:  {
          dailyReport: () => Promise.resolve(expectedError)
        }
      });
      const result = await data(query, { });
      return isApolloError ? expect(result.errors[0]).toBeInstanceOf(GraphQLError) : expect(result.data.getTechnicalDetails.code).toEqual(input.expected.error);
    }
    const result = await data(query, { injector });
    expect(result).toEqual(expected);
  });
});
