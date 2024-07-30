import { IncomingTransactionMethod, TransactionStatus, ReceivingAddressStatus, OutgoingTransactionMethod } from '@spot_wallet/core';

// Users data list
export const user1 = {
  'language': 'AM',
  'telegramId': '56846954',
  'balance': {
    'BTC': 899.998492,
    'USDT': 200,
    'ETH': 99.947168,
    'DASH': 99.567664
  },
  'accountId': '093373',
  'firstName': 'Joker',
  'lastName': 'Joker2',
  'nickName': 'joker101',
  'uuid': '5dg55g4d8d6dg-5g5f88g5-f5g5f5g55f',
  'status': TransactionStatus.Pending,
  'method': IncomingTransactionMethod.Payment
};

export const incomingTransactionData = {
  'userId': '5dg55g4d8d6dg-5g5f88g5-f5g5f5g55f',
  'address': 'hgfhgf4h5fghfd6h5gfgf6hfg5h',
  'txId': '6df6gdf5gfd6s5g6g5d',
  'amount': '260'
};

export const user2 = {
  'language' : 'AM',
  'telegramId' : '56846954',
  'balance' : {
    'BTC' : 899.998492,
    'USDT' : 200,
    'ETH' : 99.947168,
    'DASH' : 99.567664
  },
  'accountId' : '093373',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker101',
};

export const user3 = {
  'language' : 'AM',
  'telegramId' : '56846954',
  'accountId' : '093373',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker101',
};

export const user4 = {
  'language' : 'AM',
  'telegramId' : '856443315',
  'accountId' : '093373',
  'firstName' : 'Vahag',
  'lastName' : 'Torosyan',
  'nickName' : 'Vahag',
  'phoneNumber': '37455897459'
};

export const user5 = {
  '_id' : '60dae9d11d3cbd5be28066c0',
  'verificationCode': '1234'
};

export const user6 = {
  'orderId' : 'TT8439241',
  'uuid' : '5656c6d2-b3a3-46bf-a3f9-5aba260bb160',
  'balance' : {
    'BTC' : 0,
    'USDT' : 0,
    'ETH' : 0,
    'DASH' : 0
  },
  'language' : 'AM',
  'telegramId' : '568469fg54',
  'accountId' : '255694563215',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker1015',
};

export const user7 = {
  'orderId' : 'TT8439441',
  'uuid' : '5656c6d2-b65a3-46bf-a3f9-5aba260bb120',
  'balance' : {
    'BTC' : 0,
    'USDT' : 0,
    'ETH' : 0,
    'DASH' : 0
  },
  'language' : 'AM',
  'telegramId' : '5684369fg54',
  'accountId' : '255394563215',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker16',
};
export const user8 = {
  'orderId' : 'TT84655241',
  'uuid' : '5656c6d2-b926a3-46bf-a3f9-5aba260ll65',
  'balance' : {
    'BTC' : 3,
    'USDT' : 3,
    'ETH' : 3,
    'DASH' : 3
  },
  'language' : 'AM',
  'telegramId' : '569744554',
  'accountId' : '745126574',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker218',
};

export const user9 = {
  'orderId' : 'TT8439441',
  'uuid' : '54f566f8d-b65a3-46bf-a3f9-55d6s8s4a64',
  'balance' : {
    'BTC' : 0,
    'USDT' : 0,
    'ETH' : 0,
    'DASH' : 0
  },
  'language' : 'AM',
  'telegramId' : '521679632q4',
  'accountId' : '216745984as7',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker78',
};

export const user10 = {
  'orderId' : 'TT6321580',
  'uuid' : '9874563d2-b65a3-46bf-b96f9-25674b6',
  'balance' : {
    'BTC' : 0,
    'USDT' : 0,
    'ETH' : 0,
    'DASH' : 0
  },
  'language' : 'AM',
  'telegramId' : '96476a96454',
  'accountId' : '6542793158s5',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker661',
};

export const user11 = {
  'orderId' : 'TT63211',
  'uuid' : '45sa5ds-as5dasad-5asds26s6a0',
  'balance' : {
    'BTC' : 0,
    'USDT' : 0,
    'ETH' : 0,
    'DASH' : 0
  },
  'language' : 'AM',
  'telegramId' : '354586843511',
  'accountId' : '564583154145',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker966',
};

export const user12 = {
  'orderId' : 'TT4756315896',
  'uuid' : '6995652-dsfuukd5-55s88d8e6',
  'balance' : {
    'BTC' : 0,
    'USDT' : 0,
    'ETH' : 0,
    'DASH' : 0
  },
  'language' : 'AM',
  'telegramId' : '125676974563',
  'accountId' : '125489673',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker541',
  'phoneNumber': '37455687945'
};

export const user13 = {
  'orderId' : 'TT843459241',
  'uuid' : '5656ssc6d2-b3a3-46bf-a3f9-bb160',
  'balance' : {
    'BTC' : 0,
    'USDT' : 0,
    'ETH' : 0,
    'DASH' : 0
  },
  'language' : 'AM',
  'telegramId' : '568469fg54',
  'accountId' : '255694563215',
  'toAccount' : '65885488484',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker918',
};

export const user14 = {
  'orderId' : 'TT15684796',
  'uuid' : '5565s66d85d5s-5d5s55s-5d5s5ds8',
  'balance' : {
    'BTC' : 0,
    'USDT' : 0,
    'ETH' : 0,
    'DASH' : 0
  },
  'language' : 'AM',
  'telegramId' : '568469fg54',
  'accountId' : '56859856655',
  'toAccount' : '565556759755',
  'firstName' : 'Joker',
  'lastName' : 'Joker2',
  'nickName' : 'joker658',
};

export const userData1 = {
  'language' : 'AM',
  'telegramId' : '856474543315',
  'accountId' : '093373',
  'firstName' : 'Jocker',
  'lastName' : 'Jocker',
  'nickName' : 'Jocker5478',
};

export const userData2 = {
  language : 'EN',
  telegramId : '8565214',
  accountId : '093373',
  firstName : 'test',
  lastName : 'poxos',
  nickName : 'poxos',
  uuid : '5656c6d2-b3a3-46bf-a3f9-5aba260bb160',
};

// Model data list
export const OutgoingTransactionData = {
  'transactionType' : 'OUT',
  'status' : TransactionStatus.Pending,
  'method' : 'WITHDRAW',
  'txid' : '2a926a5f-a10a-52da-b6aa-10af115485ad',
  'userId' : '5656c6d2-b3a3-46bf-a3f9-5aba260bb160',
  'outgoingAmount' : 2,
  'outgoingAmountWithFee' : 2,
  'outgoingAmountUSD' : 2,
  'outgoingAmountWithFeeUSD' : 2,
  'coinType' : 'DASH',
  'orderId' : 'TT8439241',
  'toAccount' : '255694563215',
  'validDate' :   Date.now() + 10000
};

export const OutgoingTransactionData2 = {
  'transactionType' : 'OUT',
  'status' : TransactionStatus.Pending,
  'method' : 'WITHDRAW',
  'txid' : '2a9645f-a10a-52da-b6aa-10a56845ad',
  'userId' : '5656c6d2-b926a3-46bf-a3f9-5aba260ll65',
  'outgoingAmount' : 2,
  'outgoingAmountWithFee' : 2,
  'outgoingAmountUSD' : 2,
  'outgoingAmountWithFeeUSD' : 2,
  'coinType' : 'DASH',
  'orderId' : 'TT84655241',
  'toAccount' : '255694563215',
  'validDate' :   Date.now() + 10000
};

export const OutgoingTransactionData3 = {
  'transactionType' : 'OUT',
  'status' : TransactionStatus.Pending,
  'method' : OutgoingTransactionMethod.EasyTransfer,
  'txid' : '5696a5f-8696cc-52cdda-cdaa-10afdcddss',
  'userId' : '5656c6d2-b926a3-46bf-a3f9-5aba260ll65',
  'outgoingAmount' : 2,
  'outgoingAmountWithFee' : 2,
  'outgoingAmountUSD' : 2,
  'outgoingAmountWithFeeUSD' : 2,
  'coinType' : 'DASH',
  'orderId' : 'TT651668',
  'toAccount' : '255694563215',
  'validDate' :   Date.now()
};

export const OutgoingTransactionData4 = {
  'transactionType' : 'OUT',
  'status' : TransactionStatus.Pending,
  'method' : OutgoingTransactionMethod.Withdraw,
  'txid' : '5685662-42565-88668-6886-86558',
  'userId' : 'hd55d96f-bbgga3-l66l55h6-55h5g55a',
  'outgoingAmount' : 2,
  'outgoingAmountWithFee' : 2,
  'outgoingAmountUSD' : 2,
  'outgoingAmountWithFeeUSD' : 2,
  'coinType' : 'DASH',
  'orderId' : 'TT6597336545',
  'toAccount' : '255694563215',
  'validDate' :   Date.now() + 10000
};

export const OutgoingTransactionData5 = {
  'transactionType' : 'OUT',
  'status' : TransactionStatus.Pending,
  'method' : 'WITHDRAW',
  'txid' : '2a926a545f-a10a-52da-b6aa-15485ad',
  'userId' : '5656ssc6d2-b3a3-46bf-a3f9-bb160',
  'outgoingAmount' : 2,
  'outgoingAmountWithFee' : 2,
  'outgoingAmountUSD' : 2,
  'outgoingAmountWithFeeUSD' : 2,
  'coinType' : 'DASH',
  'orderId' : 'TT843459241',
  'toAccount' : '65885488484',
  'validDate' :   Date.now() + 10000
};

export const OutgoingTransactionData6 = {
  'transactionType' : 'OUT',
  'status' : TransactionStatus.Pending,
  'method' : 'WITHDRAW',
  'txid' : '2a926a545f-a10a-52da-b6aa-15485ad',
  'userId' : '5565s66d85d5s-5d5s55s-5d5s5ds8',
  'outgoingAmount' : 2,
  'outgoingAmountWithFee' : 2,
  'outgoingAmountUSD' : 2,
  'outgoingAmountWithFeeUSD' : 2,
  'coinType' : 'DASH',
  'orderId' : 'TT15684796',
  'toAccount' : '565556759755',
  'validDate' :   Date.now() + 10000
};

export const incomingTrasactionData1 = {
  transactionType : 'IN',
  method : 'PAYMENT',
  status : 'COMPLETED',
  address : 'dshdsfnsdljfsdf',
  txId : '15d5df4485df5g48',
  hash : '55dsf4sdsd8811sd',
  coinType : 'DASH',
};

export const incomingTrasactionData2 = {
  transactionType : 'IN',
  method : 'PAYMENT',
  status : 'COMPLETED',
  address : 'dshdsfdgdffnsdljfsddfgdff',
  txId : '5f6df5gdf2d3f5g2',
  hash : 'dfg8f6d2f5df5fd66gd',
  userId: '45sa5ds-as5dasad-5asds26s6a0',
  coinType : 'DASH',
};

export const receivingAddressData = {
  providerType : 'COINBASE',
  status : ReceivingAddressStatus.Active,
  userId : '5656c6d2-b3a3-46bf-a3f9-5aba260bb160',
  address : 'dshdsfnsdljfsdf',
  coinType : 'DASH',
};

export const receivingAddressData1 = {
  providerType : 'COINBASE',
  status : ReceivingAddressStatus.Active,
  userId : '54f566f8d-b65a3-46bf-a3f9-55d6s8s4a64',
  address : 'ffd55d6-d66d5s4-5ds5d45sd-666sdd',
  coinType : 'DASH',
};

export const technicalData = {
  minTransactionUSD: 10,
  maxTransactionUSD: 1000,
  rates: {
    USDToRUBExchangeRate : 72.6602,
  },
  fees: {
    fixWitdrawFee: {
      id: 15,
      amountUSD: 0,
      fee: 0,
      feeUSD: 4
    },
    withdrawFees: [
      {
        id: 15,
        amountUSD: 0,
        fee: 0,
        feeUSD: 4
      },
    ],
    easyTransferFees: [
      {
        id: 15,
        amountUSD: 0,
        fee: 0,
        feeUSD: 2
      },
    ],
  },
  schedulerRecurrenceTimes: {
    everyOneMinute: '*/1 * * * *'
  }
};

export const historyData1 = {
  userId : '5656ssc6d2-b3a3-46bf-a3f9-bb160',
  transactionType : 'OUT',
};

export const historyData2 = {
  userId : '45sa5ds-as5dasad-5asds26s6a0',
  transactionType : 'IN',
};

// Mock data
export const createEasyTransferOrderMutationMockData1 = {
  code: 200,
  success: true,
  error: '',
  data: {
    amountInCoin: 1,
    easyTransferFeeCoin: 2,
    totalEasyTransferAmountInCoin:6,
    easyTransferFeeInCurrency: 5,
    totalEasyTransferAmountInCurrency: 2,
    easyTransferFeeInPercent: 2,
    orderId: 2,
    validDate: 2,
    easyTransferExpireTime: 2,
  }
};

export const createEasyTransferOrderMutationMockData2 = {
  code: 400,
  success: true,
  error: '',
  data: {
    amountInCoin: 1,
    easyTransferFeeCoin: 2,
    totalEasyTransferAmountInCoin:6,
    easyTransferFeeInCurrency: 5,
    totalEasyTransferAmountInCurrency: 2,
    easyTransferFeeInPercent: 2,
    orderId: 2,
    validDate: 2,
    easyTransferExpireTime: 2,
  }
};
