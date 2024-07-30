import path from 'path';
import { Model, Document } from 'mongoose';
import { loadSchemaFiles, loadResolversFiles } from 'graphql-toolkit';
import { GraphQLModule } from '@graphql-modules/core';
import {
  createCoreModule,
  SchemaProvider,
  ISession,
  NamespaceEntityProvider,
  EntityEnum,
  TokenProvider,
  DefaultEnvProvider,
  Rates,
  User,
  IncomingTransaction,
  OutgoingTransaction,
  ReceivingAddress,
  Technical,
  HistoryMeta,
  SuggestedReceivers
} from '@spot_wallet/core';
import { resolversComposition } from '../core/directives/resolvers-composition';

import { FinanceProvider } from './providers';

export interface IFinanceModuleContext {
    UserModel: Model<User & Document>;
    IncomingTransactionModel: Model<IncomingTransaction & Document>;
    OutgoingTransactionModel: Model<OutgoingTransaction & Document>;
    ReceivingAddressModel: Model<ReceivingAddress & Document>;
    HistoryMetaModel: Model<HistoryMeta & Document>;
    TechnicalModel: Model<Technical & Document>;
    SuggestedReceiversModel: Model<SuggestedReceivers & Document>;
    user: User;
    telegramId: string;
    technicalDetails: Technical;
    botUrl: string;
    exchangeRates: Rates;
}

let gm: GraphQLModule = null;

export const createFinanceModule = (): GraphQLModule => {
  if (gm) return gm;
  const coreModule = createCoreModule();
  gm = new GraphQLModule({
    imports: [coreModule],
    resolversComposition,
    typeDefs: ({ injector }) => {
      const schemaPath: string = path.resolve(__dirname, '../core/types/genTypes.graphql');

      const accountModuleTypeDefs: string[] = loadSchemaFiles(schemaPath);
      const baseTypeDefs: string = injector.get(SchemaProvider).typeDefs;

      return [baseTypeDefs, ...accountModuleTypeDefs].join('\n');
    },
    resolvers: loadResolversFiles(path.resolve(__dirname, './resolvers/')) as any,
    context: async (session: ISession, currentContext, { injector }) => {
      const OutgoingTransactionModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<OutgoingTransaction & Document>>(EntityEnum.OUTGOING_TRANSACTION);
      const HistoryMetaModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<HistoryMeta & Document>>(EntityEnum.HISTORY_META);
      const ReceivingAddressModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<ReceivingAddress & Document>>(EntityEnum.RECEIVING_ADDRESS);
      const UserModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<User & Document>>(EntityEnum.USER);
      const IncomingTransactionModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<IncomingTransaction & Document>>(EntityEnum.INCOMING_TRANSACTION);
      const TechnicalModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
      const SuggestedReceiversModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<SuggestedReceivers & Document>>(EntityEnum.SUGGESTED_RECEIVERS);

      const botUrl = injector.get(DefaultEnvProvider).BOT_URL;

      const userData = { user: null, telegramId: null };
      let isService = false;
      if (session.token) {
        const { telegramId, isService: isServiceRequest } = await injector.get(TokenProvider).decodeToken(session.token);
        const user = await UserModel.findOne({ telegramId });

        userData.user = user?.toObject();
        userData.telegramId = telegramId;
        isService = isServiceRequest || isService;
      }

      return {
        ...userData,
        UserModel,
        IncomingTransactionModel,
        OutgoingTransactionModel,
        ReceivingAddressModel,
        HistoryMetaModel,
        TechnicalModel,
        SuggestedReceiversModel,
        botUrl,
        isService,
      };
    },
    providers: [FinanceProvider]
  });

  return gm;
};
