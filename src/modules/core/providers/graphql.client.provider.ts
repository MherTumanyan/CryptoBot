import { ProviderScope, Injectable } from '@graphql-modules/di';

import { AsyncInitProvider } from './base.provider';
import { NamespaceEntityProvider, DefaultEnvProvider } from '.';

@Injectable({
  scope: ProviderScope.Application
})
export class GraphqlClientProvider extends AsyncInitProvider {
  constructor(private nsp: NamespaceEntityProvider, private envProvider: DefaultEnvProvider) {
    super('GraphqlClientProvider');
  }

  public async initializer(): Promise<void> {
    await this.nsp.onInit();
    this.envProvider.onInit();
  }
}
