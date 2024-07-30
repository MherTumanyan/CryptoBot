import { GraphQLModule } from '@graphql-modules/core';

import { createCoreModule } from '@spot_wallet/core';

import { BackendDBInitProvider, BackendInitProvider } from './providers';

import { createAccountModule } from '../account/account.module';
import { createFinanceModule } from '../finance/finance.module';
import { createAdminModule } from '../admin/admin.module';

let gm: GraphQLModule = null;

export const createBackendModule = (): GraphQLModule => {
  if (gm) return gm;

  console.log('createBackendModule');

  const coreModule = createCoreModule();
  const accountModule = createAccountModule();
  const financeModule = createFinanceModule();
  const adminModule = createAdminModule();

  gm = new GraphQLModule({
    imports: [coreModule, accountModule, financeModule, adminModule],
    context: async () => ({
      version: '0.0.1'
    }),
    providers: [BackendDBInitProvider, BackendInitProvider]
  });

  return gm;
};
