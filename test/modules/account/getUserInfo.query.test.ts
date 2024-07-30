import 'reflect-metadata';
import gql from 'graphql-tag';

import * as modules from '../../../src/utils/helpers';
import { data, injector } from '../../helper';
import { user2 } from '../../utils';

const input1 = {
  title: 'test getUserInfo query',
  query: gql`
  {
    getUserInfo {
            firstName
            lastName
            nickName
            uuid
            accountId
            telegramId
            language
            balance {
                USDT
                BTC
                ETH
                DASH
            }
            balanceUSD {
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
      getUserInfo: {
        firstName: 'Joker',
        lastName: 'Joker2',
        nickName: 'joker101',
        uuid: null,
        accountId: '093373',
        telegramId: '56846954',
        language: 'AM',
        balance: {
          'BTC': 456,
          'DASH': 456,
          'ETH': 456,
          'USDT': 456,
        },
        balanceUSD: {
          'BTC': 456,
          'DASH': 456,
          'ETH': 456,
          'USDT': 456,
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
    const { query, expected } = input;
    // @ts-ignore
    modules.numberToFixed = jest.fn().mockReturnValue(456);

    const result = await data(query, { user: user2, injector });
    expect(result).toEqual(expected);
  });
});
