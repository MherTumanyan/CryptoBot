import mongoose from 'mongoose';
import { GraphQLModule } from '@graphql-modules/core';

import { TwilioProvider } from './providers/twilio.provider';
import {
  SchemaProvider,
  NamespaceEntityProvider,
  MongooseSDKProviderToken,
  DefaultLoggerProvider,
  DefaultEnvProvider,
  TokenProvider,
  TechnicalProvider,
  ReportProvider,
  GraphqlClientProvider,
  WhitelistProvider,
  CoinbaseProvider,
  ExchangeCurrencyRateProvider,
  HistoryMetaProvider
} from './providers';

let gm: GraphQLModule = null;

export const createCoreModule = (): GraphQLModule<{}, {}, {}> => {
  if (gm) return gm;

  console.log('createCoreModule');
  gm = new GraphQLModule({
    providers: [
      {
        provide: MongooseSDKProviderToken,
        useValue: mongoose
      },
      DefaultEnvProvider,
      DefaultLoggerProvider,
      SchemaProvider,
      NamespaceEntityProvider,
      TokenProvider,
      TechnicalProvider,
      TwilioProvider,
      ReportProvider,
      GraphqlClientProvider,
      WhitelistProvider,
      CoinbaseProvider,
      ExchangeCurrencyRateProvider,
      HistoryMetaProvider
    ]
  });

  return gm;
};
