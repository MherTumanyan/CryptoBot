import 'reflect-metadata';
import gql from 'graphql-tag';

import * as modules from '../../../src/utils/helpers';
import { getModels, data, injector } from '../../helper';
import { user1, incomingTransactionData } from '../../utils';
const IncomingTransactionModel= getModels('IncomingTransaction', 'incomingTransaction');

const input1 = {
  title: 'test getUnconfirmedBalance query',
  query: gql`
   {
    getUnconfirmedBalance {
      unconfirmedBalance {
        USDT
        BTC
        ETH 
        DASH
      }
      unconfirmedBalanceUSD {
        USDT
        BTC
        ETH 
        DASH
      }
      }
    }
  `,
  expected: {
    data: {
      getUnconfirmedBalance: {
        unconfirmedBalance: {
          USDT: 42,
          BTC: 42,
          ETH : 42,
          DASH: 42
        },
        unconfirmedBalanceUSD: {
          USDT: 42,
          BTC: 42,
          ETH : 42,
          DASH: 42
        }
      }
    }
  }
};

describe.each`
  input
  ${input1}
`('When the :input is $input', ({ input }) => {
  it(`${input.title}`, async () => {
    // @ts-ignore
    modules.numberToFixed = jest.fn().mockReturnValue(42);

    const { query, expected } = input;
    await IncomingTransactionModel.create(incomingTransactionData);
    const result = await data(query, { user: user1, IncomingTransactionModel, injector });
    expect(result).toEqual(expected);
  });
});
