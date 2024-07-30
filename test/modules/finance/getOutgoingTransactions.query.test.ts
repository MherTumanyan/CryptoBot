import 'reflect-metadata';
import gql from 'graphql-tag';

import { getModels, data } from '../../helper';
import { OutgoingTransactionData2, user8 } from '../../utils';

const OutgoingTransactionModel = getModels('OutgoingTransaction', 'outgoingTransaction');
const UserModel = getModels('User', 'users');

const input1 = {
  title: 'test getIncomingTransactions query',
  query: gql`
    {
        getOutgoingTransactions {
  transactionType
  status
  method 
  txid 
  userId 
  coinType 
  orderId 
        }
    }
  `,
  expected: {
    data: {
      getOutgoingTransactions: [{
        coinType: 'DASH',
        method: 'WITHDRAW',
        orderId: 'TT84655241',
        status: 'PENDING',
        transactionType: 'OUT',
        txid: '2a9645f-a10a-52da-b6aa-10a56845ad',
        userId: '5656c6d2-b926a3-46bf-a3f9-5aba260ll65',

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
    await OutgoingTransactionModel.create(OutgoingTransactionData2);
    await UserModel.create(user8);
    const result = await data(query, { OutgoingTransactionModel, user: user8 });
    expect(result).toEqual(expected);
  });
});
