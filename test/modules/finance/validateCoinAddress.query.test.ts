import 'reflect-metadata';
import gql from 'graphql-tag';

import { CoinType } from '@spot_wallet/types';
import { data, getModels, injector } from '../../helper';
import { receivingAddressData, user6 } from '../../utils';

const ReceivingAddressModel = getModels('ReceivingAddress', 'receivingAddress');

const input1 = {
  title: 'when Coin address not valid',
  query: gql`
  { 
    validateCoinAddress(coinType: ${ CoinType.Dash }, coinAddress: "294a463e-d705-53f9-82d2-65fedeef5c77") {
        success, 
        code, 
        error
      }
    }
  `,
  expected: {
    data: {
      validateCoinAddress: {
        success: false,
        code: 400,
        error: '',
      }
    }
  }
};

const input2 = {
  title: 'when Coin address is valid',
  query: gql`
    { 
      validateCoinAddress(coinType: ${ CoinType.Btc }, coinAddress: "1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck" ) {
          success, 
          code, 
          error
        }
      }
    `,
  expected: {
    data: {
      validateCoinAddress: {
        success: true,
        code: 200,
        error: '',
      }
    }
  }
};

const input3 = {
  title: 'when address belongs to sender',
  query: gql`
    { 
      validateCoinAddress(coinType: ${ CoinType.Btc }, coinAddress: "dshdsfnsdljfsdf" ) {
          success, 
          code, 
          error
        }
      }
    `,
  expected: {
    data: {
      validateCoinAddress: {
        success: false,
        code: 409,
        error: '',
      }
    }
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
    await ReceivingAddressModel.create(receivingAddressData);
    const result = await data(query, { injector, ReceivingAddressModel, user: user6 });
    expect(result).toEqual(expected);
  });
});
