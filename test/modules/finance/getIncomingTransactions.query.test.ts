import 'reflect-metadata';
import gql from 'graphql-tag';

import { getModels, data } from '../../helper';
import { incomingTrasactionData2, user11 } from '../../utils';

const IncomingTransactionModel= getModels('IncomingTransaction', 'incomingTransaction');
const UserModel = getModels('User', 'users');

const input1 = {
  title: 'test getIncomingTransactions query',
  query: gql`
    {
        getIncomingTransactions {
            address
            method
            status
            transactionType
        }
    }
  `,
  expected: {
    data: {
      getIncomingTransactions: [{
        address: 'dshdsfdgdffnsdljfsddfgdff',
        transactionType: 'IN',
        method: 'PAYMENT',
        status: 'COMPLETED'
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
    await IncomingTransactionModel.create(incomingTrasactionData2);
    await UserModel.create(user11);
    const result = await data(query, { IncomingTransactionModel, user: user11 });
    expect(result).toEqual(expected);
  });
});
