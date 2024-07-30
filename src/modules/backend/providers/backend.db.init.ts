import { Injectable, ProviderScope, Inject } from '@graphql-modules/di';

import {
  AsyncInitProvider,
  NamespaceEntityProvider,
  ReportProvider,
  SchemaProvider,
  DefaultEnvProvider,
  IDBProvider,
  MongoConfig,
  EntityEnum,
  HistoryMetaProvider
} from '@spot_wallet/core';
import { pubsub } from '../../backend/utils';

// ** Init provider - for everything we need for backend initialization
@Injectable({
  scope: ProviderScope.Application
})
export class BackendDBInitProvider extends AsyncInitProvider implements IDBProvider {
  constructor(
    @Inject(NamespaceEntityProvider) private nsp: NamespaceEntityProvider,
    @Inject(SchemaProvider) private schemaProvider: SchemaProvider,
    @Inject(DefaultEnvProvider) private envProvider: DefaultEnvProvider,
    @Inject(ReportProvider) private reportProvider: ReportProvider,
    @Inject(HistoryMetaProvider) private historyMetaProvider: HistoryMetaProvider
  ) {
    super('BackendDBInitProvider');
  }

  public async initializer(): Promise<void> {
    console.log('BackendDBInitProvider onInit - STARTED');
    // ** INITIALIZATION PART
    this.schemaProvider.onInit();
    this.envProvider.onInit();
    this.nsp.onInit();
    await this.reportProvider.onInit();
    await this.historyMetaProvider.onInit();

    const { MASTER_MONGO_URL, MASTER_MONGO_DATABASE, MASTER_MONGO_ARGS } = this.envProvider;

    const masterNamespace: MongoConfig = {
      url: `${MASTER_MONGO_URL}/${MASTER_MONGO_DATABASE}${MASTER_MONGO_ARGS}`,
    };

    const masterEntitites = this.schemaProvider.getNamespaceEntities('master');
    await this.nsp.registerEntities(masterEntitites);
    await this.nsp.registerNamespace(masterNamespace);

    await this.nsp.attachStorageEmitter(EntityEnum.INCOMING_TRANSACTION);
    await this.nsp.attachStorageEmitter(EntityEnum.OUTGOING_TRANSACTION);
    await this.nsp.attachStorageEmitter(EntityEnum.RECEIVING_ADDRESS);

    this.nsp.on('change', ({ data, entityName, operationType }) => {
      this.reportProvider.sendReport(data, entityName);
      this.historyMetaProvider.changeHistoryMetaTxStatus(data, entityName);
      pubsub.publish('SCHEMA_CHANGED', { data, entityName, operationType });
    }
    );
    this.nsp.ready();
    console.log('BackendDBInitProvider onInit - END');
  }

  public getEntityModel<Type>(entityName: string): Type {
    return this.nsp.getEntityModel<Type>(entityName);
  }
}
