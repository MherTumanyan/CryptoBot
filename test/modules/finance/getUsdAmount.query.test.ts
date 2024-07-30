import 'reflect-metadata';
import gql from 'graphql-tag';

import * as modules from '../../../src/utils/helpers';
import { data } from '../../helper';

const input1 = {
  title: 'test getUsdAmount query',
  query: gql`
  { 
    getUsdAmount(btcAmount: 0.52, toFixed : 1 ) {
        value
      }
    }
  `,
  expected: {
    data: {
      getUsdAmount: {
        value: 10
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
    // @ts-ignore
    modules.numberToFixed = jest.fn().mockReturnValue(10);
    const result = await data(query, { });
    expect(result).toEqual(expected);
  });
});
