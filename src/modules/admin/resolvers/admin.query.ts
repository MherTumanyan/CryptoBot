import { map, isEmpty, chunk } from 'lodash';
import { ApolloError } from 'apollo-server-core';
import { ModuleContext } from '@graphql-modules/core';
import { QueryResolvers, OperationStatus } from '@spot_wallet/types';
import { IAdminModuleContext } from '../admin.module';
import { NamespaceEntityProvider, ReportProvider } from '@spot_wallet/core';

export const Query: QueryResolvers = {
  getTechnicalDetails: async (root, {}, { TechnicalModel }: ModuleContext<IAdminModuleContext>) => {
    try {
      const technicals = await TechnicalModel.findOne({});
      return technicals ? technicals : null;
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  sendNotifications: async (root, { message, telegramIds }, { UserModel, injector, botUrl }: ModuleContext<IAdminModuleContext>) => {
    try {
      if (isEmpty(telegramIds)) {
        const users = await UserModel.find({});
        telegramIds = map(users, user => user.telegramId);
      }
      const droppedIds = chunk(telegramIds, 15);
      injector.get(NamespaceEntityProvider).sendMessage(
        'POST',
        {
          message,
          telegramIds: droppedIds
        },
        `${botUrl}/sendNotifications`
      );
      return { error: '', code: 200, success: true };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  },

  // ScheduleJob
  dailyReport: async (root, {}, { injector }): Promise<OperationStatus> => {
    try {
      await injector.get(ReportProvider).dailyReport();

      return { error: '', code: 200, success: true };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  }

};
