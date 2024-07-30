import 'reflect-metadata';
import gql from 'graphql-tag';
import { ApolloError } from 'apollo-server-core';

import { technicalData } from '../../utils';
import { getModels, data } from '../../helper';
import * as modules from '../../../src/utils/helpers';
import { sortBy } from 'lodash';

const TechnicalModel = getModels('Technical', 'technical');

const input1 = {
  title: 'test getWithdrawTransactionFee query',
  query: gql`
  query{ 
    getWithdrawTransactionFee{
        to
        feeInUSD
      }
    }
  `,
  expected: {
    data: {
      getWithdrawTransactionFee: [{
        'feeInUSD': 4,
        'to': '♾',
      }]
    }
  }
};

const input2 = {
  title: 'when throw error',
  query: gql`
    query{ 
      getWithdrawTransactionFee{
        feeInPercent
        }
      }
    `,
  expected: {
    data: {
      getWithdrawTransactionFee: [{
        feeInPercent: 0,
      }]
    }
  }
};

const input3 = {
  title: 'Checking catch block',
  query: gql`
      query{ 
        getWithdrawTransactionFee{
          feeInPercent
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
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query, expected } = input;
    await TechnicalModel.create(technicalData);

    if (input.expected.error) {
      const isApolloError = input.expected.error instanceof ApolloError;
      const expectedError = isApolloError? input.expected.error : false;
      // @ts-ignore
      sortBy = jest.fn().mockImplementation(() => {
        if (isApolloError) throw expectedError;
        return expectedError;
      });
      const result = await data(query, { TechnicalModel });
      // @ts-ignore
      return isApolloError ? expect(result.errors[0]).toEqual(input.expected.error) : expect(result.data.acceptEasyTransferOrder.code).toEqual(input.expected.error);
    }
    const result = await data(query, { TechnicalModel });
    expect(result).toEqual(expected);
  });
});
