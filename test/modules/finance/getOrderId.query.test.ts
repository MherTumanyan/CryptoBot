import 'reflect-metadata';
import gql from 'graphql-tag';

import { data } from '../../helper';

const input1 = {
  title: 'test getOrderId query',
  query: gql`
  { 
    getOrderId {
        id
      }
    }
  `,
};

describe.each`
  input 
  ${input1}
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query } = input;
    const result = await data(query, { });
    expect(result.data.getOrderId.id).not.toBe('');
  });
});
