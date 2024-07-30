import 'reflect-metadata';
import 'module-alias/register';
import * as dotenv from 'dotenv';

import express from 'express';
import { createServer } from 'http';
import { ContextFunction } from 'apollo-server-core';

// tslint:disable-next-line:ordered-imports
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import * as Sentry from '@sentry/node';

import { GraphQLModule } from '@graphql-modules/core';

import { createAppModule } from '@spot_wallet/app';
import { BackendInitProvider } from '@spot_wallet/backend';
import { sentryInitializer, didEncounterErrors } from '@spot_wallet/utils';

dotenv.config();

const run = async (resolve: any) => {
  const PORT = process.env.PORT || 7000;
  console.log('PORT::::::::::back:::::::', PORT);
  
  const BTC_CHANGE_ENV = process.env.BCLUSTER_ENV || 'backend';
  const HOST = '127.0.0.1';

  console.log('PORT, BTC_CHANGE_ENV, HOST::::::::::::', PORT, BTC_CHANGE_ENV, HOST);

  const appModule: GraphQLModule = createAppModule(BTC_CHANGE_ENV);
  // await appModule.injector.get(BackendInitProvider).onInit();
  // eslint-disable-next-line no-unused-expressions
  appModule.injector;
console.log('ssssssssssssssssssssssssssssssssssssss');

  // sentry Initializer
  // sentryInitializer(Sentry);
console.log('zzzzzzzzzzzzzzzzzzzzzzz');

  // ** We are reading express req and res and passing to context which will be passed to all GQ resolvers
  const contextGenerator: ContextFunction = async ({ req, connection }) => {
    if (connection) return connection.context;

    const token = req.headers.authorization || '';

    return { token };
  };
  console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
  
  const appoloServerConfig: ApolloServerExpressConfig = {
    // ** We can use GQL module in appolo server and use context builder like ...MyAccountsModule.context({ req, res })
    modules: [appModule],
    // schema,
    context: contextGenerator,
    subscriptions: {
      onConnect: (connectionParams: any) => {
        // tslint:disable-next-line:curly
        if (connectionParams.Authorization) {
          return { token: connectionParams.Authorization };
        }
      }
    },
    plugins: [
      {
        requestDidStart() {
          return {
            didEncounterErrors: didEncounterErrors(Sentry),
          };
        },
      },
    ],
  };

  const apolloServer = new ApolloServer(appoloServerConfig);
console.log('2222222222222222222222222222222222222222222222222222222222');

  const app = express();
  apolloServer.applyMiddleware({ app });

  const httpServer = createServer(app);
console.log('++++++++++++++++++++++++111111111111++++++++++++++++++++++++');

  apolloServer.installSubscriptionHandlers(httpServer);
console.log('++++++++++++++++++++++++++++++++++++++++++++++++');

  httpServer.listen({ port: PORT, host: HOST }, () => {
    console.log('http://${HOST}:${PORT}${apolloServer.graphqlPath}:::::::::::', `http://${HOST}:${PORT}${apolloServer.graphqlPath}`);
    
    // tslint:disable-next-line: no-console
    console.info(`🚀 Server ready at http://${HOST}:${PORT}${apolloServer.graphqlPath}`);
    // tslint:disable-next-line: no-console
    console.info(`🚀 Subsciription ready at ws://${HOST}:${PORT}${apolloServer.subscriptionsPath}`);
    resolve();
  });

  app.get('/health', (req, res) => res.status(200).send({ status: 'OK' }));
};

const startPromise = new Promise(run);

startPromise
  .then(() => {
    console.log('!!! Crypto Spot backend Started !!!!');
  })
  .catch(err => {
    console.error('!!! ERROR !!!!', err);
  });
