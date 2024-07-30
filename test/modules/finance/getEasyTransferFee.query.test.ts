import 'reflect-metadata';
import gql from 'graphql-tag';

import { getModels, data } from '../../helper';
import { technicalData } from '../../utils';

const TechnicalModel = getModels('Technical', 'technical');

const input1 = {
  title: 'test getEasyTransferFee mutation',
  query: gql`
   { 
    mutation getEasyTransferFee {
            from
            to
            feeInPercent
            feeInUSD
        }
    }
  `,
  expected: {
    data: {
      getEasyTransferFee: [{
        from: '10',
        to: '♾',
        feeInPercent: 0,
        feeInUSD: 2
      }]
    }
  }
};

describe.each`
  input
  ${input1}
  `('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    const { query, expected } = input;
    await TechnicalModel.create(technicalData);
    const result = await data(query, { TechnicalModel });
    expect(result).toEqual(expected);
  });
});
