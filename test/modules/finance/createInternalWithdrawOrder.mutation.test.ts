import 'reflect-metadata';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-core';

import { createEasyTransferOrderMutationMockData1, createEasyTransferOrderMutationMockData2, receivingAddressData1, user9 } from '../../utils';
import * as modules from '../../../src/modules/finance/resolvers/finance.mutation';
import { CoinType, CurrencyType } from '@spot_wallet/types';
import { getModels, data, injector } from '../../helper';

const UserModel = getModels('User', 'users');
const ReceivingAddressModel = getModels('ReceivingAddress', 'receivingAddress');
const HistoryMetaModel = getModels('HistoryMeta', 'historyMeta');
const OutgoingTransactionModel= getModels('OutgoingTransaction', 'outgoingTransaction');

const input1 = {
  title: 'test createInternalWithdrawOrder mutation',
  query: gql`
  mutation{
    createInternalWithdrawOrder(currency: ${ CurrencyType.Usd }, amountInCurrency: 20, coinType: ${ CoinType.Dash }, coinAddress: "ffd55d6-d66d5s4-5ds5d45sd-666sdd") {
        success,
        code,
        error
      }
    }
  `,
  createEasyTransferOrderMutationMockData: createEasyTransferOrderMutationMockData1,
  expected: {
    data: {
      createInternalWithdrawOrder: {
        success: true,
        code: 200,
        error: '',
      }
    }
  }
};

const input2 = {
  title: 'Checking catch block',
  query: gql`
  mutation{
    createInternalWithdrawOrder(currency: ${ CurrencyType.Usd }, amountInCurrency: 20, coinType: ${ CoinType.Dash }, coinAddress: "ffd55d6-d66d5s4-5ds5d45sd-666sdd") {
        success,
        code,
        error
      }
    }
  `,
  expected: {
    error: new ApolloError('message')
  }
};

const input3 = {
  title: 'test createInternalWithdrawOrder mutation',
  query: gql`
  mutation{
    createInternalWithdrawOrder(currency: ${ CurrencyType.Usd }, amountInCurrency: 20, coinType: ${ CoinType.Dash }, coinAddress: "ffd55d6-d66d5s4-5ds5d45sd-666sdd") {
        success,
        code,
        error
      }
    }
  `,
  createEasyTransferOrderMutationMockData: createEasyTransferOrderMutationMockData2,
  expected: {
    data: {
      createInternalWithdrawOrder: {
        success: true,
        code: 400,
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
    const { query, expected, createEasyTransferOrderMutationMockData } = input;
    await UserModel.create(user9);
    await ReceivingAddressModel.create(receivingAddressData1);
    // @ts-ignore
    modules.Mutation.createEasyTransferOrder = jest.fn().mockReturnValue(createEasyTransferOrderMutationMockData);
    if (input.expected.error) {
      const result = await data(query, { injector, user: user9 });
      return expect(result.errors[0]).toBeInstanceOf(GraphQLError);
    }
    const result = await data(query, { injector, user: user9, OutgoingTransactionModel, HistoryMetaModel, ReceivingAddressModel, UserModel });
    expect(result).toEqual(expected);
  });
});
