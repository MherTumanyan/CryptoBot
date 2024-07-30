import 'reflect-metadata';
import gql from 'graphql-tag';

import { data, injector } from '../../helper';

const input1 = {
  title: 'test setCurrencyExchangeRates ScheduleJob',
  query: gql`
  mutation{ 
    setCurrencyExchangeRates{
        error, 
        code, 
        success 
      }
    }
  `,
  expected: {
    data: {
      setCurrencyExchangeRates: {
        error: '',
        code: 200,
        success: true
      }
    }
  }
};

describe.each`
  input 
  ${input1}
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query, expected } = input;
    const result = await data(query, { injector });
    expect(result).toEqual(expected);
  });
});
