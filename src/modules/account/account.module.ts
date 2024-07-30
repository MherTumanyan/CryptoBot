import path from 'path';
import { Model, Document } from 'mongoose';
import { loadSchemaFiles, loadResolversFiles } from 'graphql-toolkit';
import { GraphQLModule } from '@graphql-modules/core';

import { createCoreModule, SchemaProvider, ISession, TokenProvider, NamespaceEntityProvider, EntityEnum, User, IncomingTransaction, OutgoingTransaction, Whitelist, Technical, SuggestedReceivers } from '@spot_wallet/core';
import { resolversComposition } from '@spot_wallet/core/directives';
import { AccountProvider } from './providers';

export interface IAccountModuleContext {
    UserModel: Model<User & Document>;
    IncomingTransactionModel: Model<IncomingTransaction & Document>;
    OutgoingTransactionModel: Model<OutgoingTransaction & Document>;
    WhitelistModel: Model< Whitelist & Document>;
    TechnicalModel: Model<Technical & Document>;
    SuggestedReceiversModel: Model<SuggestedReceivers & Document>;
    telegramId?: string;
    user?: Omit<User, '__typename'>;
    isService: boolean;
}

let gm: GraphQLModule = null;

export const createAccountModule = (): GraphQLModule => {
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
      const UserModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<User & Document>>(EntityEnum.USER);
      const IncomingTransactionModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<IncomingTransaction & Document>>(EntityEnum.INCOMING_TRANSACTION);
      const OutgoingTransactionModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<OutgoingTransaction & Document>>(EntityEnum.OUTGOING_TRANSACTION);
      const WhitelistModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<Whitelist & Document>>(EntityEnum.WHITELIST);
      const TechnicalModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
      const SuggestedReceiversModel = injector.get(NamespaceEntityProvider).getEntityModel<Model<SuggestedReceivers & Document>>(EntityEnum.SUGGESTED_RECEIVERS);

      const userData = { user: null, telegramId: null };

      let isService = false;

      if (session.token) {
        const response = await injector.get(TokenProvider).decodeToken(session.token);
        const { telegramId, isService: isServiceRequest } = response;
        const user = response?.telegramId && (await UserModel.findOne({ telegramId: response.telegramId }));

        userData.user = user?.toObject();
        userData.telegramId = telegramId;
        isService = isServiceRequest || isService;
      }

      return {
        ...userData,
        UserModel,
        IncomingTransactionModel,
        OutgoingTransactionModel,
        WhitelistModel,
        TechnicalModel,
        SuggestedReceiversModel,
        isService
      };
    },
    providers: [AccountProvider]
  });

  return gm;
};
