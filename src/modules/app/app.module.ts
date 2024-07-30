import { GraphQLModule } from '@graphql-modules/core';
import { createBackendModule } from '@spot_wallet/backend';

export const createAppModule = (moduleName: string): GraphQLModule => {
  let gModule: GraphQLModule = null;

  switch (moduleName.toLowerCase()) {
    case 'backend':
      gModule = new GraphQLModule({
        imports: [createBackendModule()]
      });
      break;

    default: {
      throw new Error('ERROR - Wrong type of module specified');
    }
  }

  return gModule;
};
