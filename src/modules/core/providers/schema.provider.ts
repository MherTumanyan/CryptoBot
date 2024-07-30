import path from 'path';
import glob from 'glob';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { loadSchemaFiles } from 'graphql-toolkit';
import { GraphEntityParser, IEntityDefinition, DIRECTIVES } from '@sfast/gql-schema-parser';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { reduce } from 'lodash';

import { SyncInitProvider } from './base.provider';

@Injectable({
  scope: ProviderScope.Application
})
export class SchemaProvider extends SyncInitProvider {
    public typeDefs: string;

    private graphParser: GraphEntityParser;

    constructor() {
      super('SchemaProvider');
    }

    public initializer(): void {
      try {
        console.log('SchemaProvider onInit - START');

        // ** those are all the models we have in a system
        // ** this part has lots of common things with envisioned engine
        const coreSchemasPath = path.resolve(__dirname, '../schema/');
        const schemas = glob
          .sync(`${coreSchemasPath}/**/*.graphql`, { ignore: `${coreSchemasPath}/**/*.spec.graphql` })
          .map(file => loadSchemaFiles(file));

        this.typeDefs = [DIRECTIVES, schemas].join('');
        const dn: DocumentNode = gql(this.typeDefs);
        this.graphParser = new GraphEntityParser(dn);
        console.log('SchemaProvider onInit - END');
      } catch (err) {
        throw new Error(err.message);
      }
    }

    public get entities(): Record<string, IEntityDefinition> {
      return this.graphParser.entities;
    }

    public getNamespaceEntities(namespace: string): IEntityDefinition[] {
      return reduce(
        this.graphParser.entities,
        (acc: IEntityDefinition[], entityItem: IEntityDefinition) => {
          if (entityItem.namespace.indexOf(namespace) > -1) acc.push(entityItem);
          return acc;
        },
        []
      );
    }
}
