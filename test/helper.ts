import { resolve } from 'path';
import { execute } from 'graphql';
import mongoose, { Schema } from 'mongoose';
import { loadResolversFiles } from 'graphql-toolkit';
import { GraphQLModule } from '@graphql-modules/core';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { ParseToMongoose } from '@sfast/gql-schema-mongoose';
import { makeExecutableSchema } from '@kamilkisiela/graphql-tools';
import { createAppModule } from '../src/modules/app';
import { forEach } from 'lodash';

export const typeDef = () => {
  const schemaPath: string = resolve('src/modules/core/types/genTypes.graphql');
  const accountModuleTypeDefs: string[] = loadFilesSync(schemaPath, { extensions: ['.graphql'] });
  return mergeTypeDefs(accountModuleTypeDefs);
};

const modules = ['src/modules/account/resolvers', 'src/modules/admin/resolvers', 'src/modules/finance/resolvers' ];
const resolvers = [];
forEach(modules, (module) => {
  resolvers.push(...loadResolversFiles(resolve(module)));
});

export const schema = makeExecutableSchema({
  typeDefs: typeDef(),
  resolvers,
});

export const getModels = (schemaName, collection) => {
  const mongooseParser = new ParseToMongoose(typeDef(), { mongoose });
  const mod = mongooseParser.getEntitySchema(schemaName);
  return mongoose.model<any>(collection, new Schema(mod));
};

export const data = (document, contextValue) => execute({
  schema,
  document,
  contextValue
});

export const { injector } = createAppModule('backend');
