import { ModuleContext } from '@graphql-modules/core';
import { ApolloError } from 'apollo-server-core';

import { MutationResolvers } from '@spot_wallet/types';
import { IAccountModuleContext } from '../account.module';

export const Mutation: MutationResolvers = {
  async changeGeneralSettings(root, args, { UserModel, user: { _id } }: ModuleContext<IAccountModuleContext>) {
    try {
      await UserModel.findOneAndUpdate({ _id }, args);

      return {
        error: '',
        code: 200,
        success: true
      };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  }
};
