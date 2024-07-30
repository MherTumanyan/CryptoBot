import { Injectable, ProviderScope, Inject } from '@graphql-modules/di';
import { NamespaceEntityProvider, AsyncInitProvider, ExchangeCurrencyRateProvider } from '@spot_wallet/core';
import { BackendDBInitProvider } from './backend.db.init';

@Injectable({
  scope: ProviderScope.Application
})
export class BackendInitProvider extends AsyncInitProvider {
  constructor(
        @Inject(BackendDBInitProvider) private dbProvider: BackendDBInitProvider,
        @Inject(NamespaceEntityProvider) private nsp: NamespaceEntityProvider,
        @Inject(ExchangeCurrencyRateProvider) private exchangeCurrencyRateProvider: ExchangeCurrencyRateProvider
  ) {
    super('BackendInitProvider');
  }

  public async initializer(): Promise<void> {
    console.log('BackendInitProvider onInit - STARTED');
    await this.dbProvider.onInit();
    await this.exchangeCurrencyRateProvider.onInit();
    this.nsp.onInit();
    console.log('BackendInitProvider onInit - END');
  }
}
