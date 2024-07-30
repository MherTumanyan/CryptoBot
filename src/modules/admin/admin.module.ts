import path from 'path';
import { Model, Document } from 'mongoose';
import { loadSchemaFiles, loadResolversFiles } from 'graphql-toolkit';

import { GraphQLModule } from '@graphql-modules/core';
import {
  createCoreModule,
  SchemaProvider,
  ISession,
  TokenProvider,
  NamespaceEntityProvider,
  EntityEnum,
  DefaultEnvProvider,
  User,
  Technical,
  IncomingTransaction,
  HistoryMeta,
  OutgoingTransaction
} from '@spot_wallet/core';
import { resolversComposition } from '@spot_wallet/core/directives';

export interface IAdminModuleContext {
    telegramId: string;
    user: User;
    UserModel: Model<User & Document>;
    TechnicalModel: Model<Technical & Document>;
    isService: boolean;
    IncomingTransactionModel: Model<IncomingTransaction & Document>;
    OutgoingTransactionModel: Model<OutgoingTransaction & Document>;
    HistoryMetaModel: Model<HistoryMeta & Document>;
    botUrl: string;
}

let gm: GraphQLModule = null;

export const createAdminModule = (): GraphQLModule => {
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
      const TechnicalModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
      const HistoryMetaModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<HistoryMeta & Document>>(EntityEnum.HISTORY_META);
      const UserModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<User & Document>>(EntityEnum.USER);
      const IncomingTransactionModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<IncomingTransaction & Document>>(EntityEnum.INCOMING_TRANSACTION);
      const OutgoingTransactionModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<OutgoingTransaction & Document>>(EntityEnum.OUTGOING_TRANSACTION);

      const botUrl = injector.get(DefaultEnvProvider).BOT_URL;

      const userData = { user: null, telegramId: null };
      let isService = false;

      if (session?.token) {
        const response = await injector.get(TokenProvider).decodeAdminToken(session.token);

        const user = response?.telegramId && (await UserModel.findOne({ telegramId: response.telegramId }));

        userData.user = user?.toObject();
        userData.telegramId = response?.telegramId;
        isService = response?.isService ? response?.isService : isService;
      }

      return {
        ...userData,
        isService,
        UserModel,
        TechnicalModel,
        IncomingTransactionModel,
        OutgoingTransactionModel,
        HistoryMetaModel,
        botUrl
      };
    },
    providers: []
  });

  return gm;
};
