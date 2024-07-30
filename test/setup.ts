import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CoinbaseProvider, CoinType, ExchangeCurrencyRateProvider, NamespaceEntityProvider, ReportProvider, TechnicalProvider, TransactionStatus } from '@spot_wallet/core';
import { injector } from './helper';
import { TwilioProvider } from '@spot_wallet/core/providers/twilio.provider';
import { FinanceProvider } from '@spot_wallet/finance/providers';
import { AccountProvider } from '@spot_wallet/account/providers';

let mongoServer;
const opts = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectInterval: 1000,
  poolSize: 10,
  bufferMaxEntries: 0,
  reconnectTries: 5000,
  useUnifiedTopology: true,
};

beforeAll(async () => {
  jest.setTimeout(30000);
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err);
    console.log('connect');
  });
  injector.provide({
    provide: ExchangeCurrencyRateProvider,
    overwrite: true,
    // @ts-ignore
    useValue: {
      convertCurrency: () => Promise.resolve(456),
      getMinAndMaxTransactionValue: () => {
        return Promise.resolve({
          minTransactionValue: 56555,
          maxTransactionValue: 5335,
        });
      },
      setCurrencyExchangeRates: ()=> Promise.resolve()
    }
  });

  injector.provide({
    provide: NamespaceEntityProvider,
    overwrite: true,
    // @ts-ignore
    useValue: {
      sendMessage: () => Promise.resolve(true),
    }
  });

  injector.provide({
    provide: AccountProvider,
    overwrite: true,
    // @ts-ignore
    useValue: {
      setInternalReceivers: () => Promise.resolve(),
    }
  });

  injector.provide({
    provide: TwilioProvider,
    overwrite: true,
    // @ts-ignore
    useValue:  {
      verificationSms: () => Promise.resolve('54589662')
    }
  });

  injector.provide({
    provide: TechnicalProvider,
    overwrite: true,
    // @ts-ignore
    useValue: {
      setCurrencyExchangeRates: () => Promise.resolve({}),
    }
  });

  injector.provide({
    provide: FinanceProvider,
    overwrite: true,
    // @ts-ignore
    useValue:  {
      getWithdrawOrder: () => {
        return Promise.resolve({
          amountInCoin: 0.856,
          amountInUSD: 12,
          amountInCurrency: 15,

          withdrawFeeInitialPercent: 65,
          withdrawFeeInitialUSD: 15,
          withdrawFeeInPercent: 56,
          withdrawFeeCoin: 47,
          withdrawFeeInCurrency: 56,

          totalWithdrawAmountInCoin: 15,
          totalWithdrawAmountInCurrency: 46,
          totalWithdrawAmountInUsd: 69,
        });
      },
      getEasyTransferOrder: () => {
        return Promise.resolve({
          amountInCoin: 1,
          amountInUSD: 1,

          easyTransferFeeInitialPercent: 1,
          easyTransferFeeInitialUSD: 1,
          easyTransferFeeInPercent: 1,
          easyTransferFeeCoin: 1,
          easyTransferFeeInCurrency: 1,

          totalEasyTransferAmountInCoin: 1,
          totalEasyTransferAmountInCurrency: 1,
          totalEasyTransferAmountInUsd: 1,
        });
      },
      isInternalAddress: ()=>{
        return Promise.resolve(true);
      },
      setExternalReceivers: () => Promise.resolve()
    }
  });
  injector.provide({
    provide: ReportProvider,
    overwrite: true,
    // @ts-ignore
    useValue:  {
      dailyReport: () => Promise.resolve(true)
    }
  });
  injector.provide({
    provide: CoinbaseProvider,
    overwrite: true,
    useValue:  {
      // @ts-ignore
      sendMoney: () => Promise.resolve({ id: '5665' }),
      createWalletAddress: () => Promise.resolve('address'),
      // @ts-ignore
      getTransaction: () => Promise.resolve({ status: 'CANCELED', network: { transaction_url: 'url' } })
    }
  });
});
beforeEach(async (done) => {
  const collections = await mongoose.connection.db.collections();
  for (const connection of collections) {
    await connection.deleteMany({});
  }
  done();
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
