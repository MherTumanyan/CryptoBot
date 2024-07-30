
import { Container } from 'typedi';
import { Injectable, ProviderScope, Inject } from '@graphql-modules/di';
import { IEntityDefinition } from '@sfast/gql-schema-parser';
import { createMongooseSchema } from '@sfast/gql-schema-mongoose';
import { Model, model, Document } from 'mongoose';
import { reduce, map, isArray, get, set } from 'lodash';
import rp from 'request-promise';

import { connect, TELEGRAM_ID_KEYS, UnknownStorageType } from '@spot_wallet/utils';
import { DefaultEnvProvider } from './env.default.provider';
import { AsyncInitProvider } from './base.provider';
import { EntityEnum, MongoConfig, RegisterSchemaType, User } from '../types';
import { IDBProvider } from './db.provider';

export interface INamespaceEntityProvider extends IDBProvider {
  registerEntities: (entities: IEntityDefinition[]) => Promise<void>;
  registerSchema: (entitySchema: RegisterSchemaType) => void;
}

const NAMESPACE_READY = 'NAMESPACE_READY';

@Injectable({
  scope: ProviderScope.Application
})
export class NamespaceEntityProvider extends AsyncInitProvider implements INamespaceEntityProvider {
  constructor(@Inject(DefaultEnvProvider) private envProvider: DefaultEnvProvider) {
    super('NamespaceEntityProvider');
  }
  public async initializer(): Promise<void> {
    return new Promise(resolve => {
      console.log('NamespaceEntityProvider onInit - START');
      this.envProvider.onInit();
      console.log('NamespaceEntityProvider onInit - END');
      this.once(NAMESPACE_READY, resolve);
    });
  }

  public ready(): void {
    this.emit(NAMESPACE_READY);
  }

  public async registerNamespace(mongoConfig: MongoConfig): Promise<void> {
    const { url, config } = mongoConfig;
    await connect(url);
  }

  public registerEntities(entities: IEntityDefinition[], dbType: string = 'mongo'): Promise<void> {
    console.log('NamespaceEntityProvider registerEntities');
    return reduce(
      entities,
      async (prevPromise: Promise<void>, entityDef: IEntityDefinition) => {
        await prevPromise;
        const { name } = entityDef;
        switch (dbType) {
          case 'mongo':
            {
              const entitySchema: RegisterSchemaType = {
                name,
                schema: createMongooseSchema(entityDef),
                options: {
                  collection: entityDef.collection
                },
              };
              this.registerSchema(entitySchema);
            }
            break;
          default:
            throw new Error(UnknownStorageType);
        }
      },
      Promise.resolve()
    );
  }
  public registerSchema(entitySchema: RegisterSchemaType): void {
    const { name, schema } = entitySchema;
    const entityModel = model(name, schema);
    Container.set(name, entityModel);
  }

  public getEntityModel<Type>(entityName: string): Type {
    return Container.get(entityName);
  }

  public async attachStorageEmitter(entityName: string): Promise<void> {
    const model = this.getEntityModel<any & Document>(entityName);

    model.watch([], { fullDocument: 'updateLookup' }).on('change', (data: any) => {
      if (data.operationType === 'insert' || data.operationType === 'update' || data.operationType === 'replace') {
        this.emit('change', { data: data.fullDocument, entityName, operationType: data.operationType });
      }
    });
  }

  public async sendMessage(method: string, body: Record<string, any>, url: string, headers?: any, force: boolean = false): Promise<any> {
    const botUrl = this.envProvider.BOT_URL;
    const includesIds = Object.keys(body).some(key => TELEGRAM_ID_KEYS.includes(key));
    if (!url.includes(botUrl) || !includesIds || force)
      return this.request(method, body, url, headers);

    const allTelegramIds = [];

    await Promise.all(
      TELEGRAM_ID_KEYS.map(async key => {
        const value = get(body, key);
        if (!value) return;
        const filteredIds = await this.filterTelegramIds(value);
        allTelegramIds.push(...filteredIds);
        set(body, key, isArray(value) ? filteredIds : filteredIds[0]);
      })
    );

    if (!allTelegramIds.length) return;
    return this.request(method, body, url, headers);
  }

  public async request(method: string, body: object, url: string, headers?: any): Promise<any> {
    const options = {
      method,
      uri: url,
      headers: { 'User-Agent': 'Request-Promise', ...headers },
      body,
      json: true // Automatically stringifies the body to JSON
    };

    return rp(options);
  }

  private async filterTelegramIds(ids: string | any[]): Promise<string[]> {
    const UserModel = this.getEntityModel<Model<User & Document>>(EntityEnum.USER);
    const tgIds = isArray(ids) ? ids : [ids];
    const filteredTelegramIds = [];
    await Promise.all(
      map(tgIds, async value => {
        const telegramId = value?.telegramId || value;
        const user = await UserModel.findOne({ telegramId }, { notify: 1, _id: 0 });
        if (user?.notify) filteredTelegramIds.push(value);
      })
    );
    return filteredTelegramIds;
  }
}
