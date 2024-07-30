import { ModuleContext } from '@graphql-modules/core';
import { ApolloError } from 'apollo-server-core';
import { isEmpty } from 'lodash';

import { MutationResolvers, User, OutgoingTransactionMethod } from '@spot_wallet/types';
import { getCustomId, UserAlreadyExists } from '@spot_wallet/utils';
import { TwilioProvider } from '@spot_wallet/core/providers/twilio.provider';
import { Query } from '../../finance/resolvers/finance.query';

import { IAccountModuleContext } from '../account.module';

export const Mutation: MutationResolvers = {
  async registerTelegramUser(
    root,
    { firstName, lastName, telegramId },
    { UserModel }: ModuleContext<IAccountModuleContext>
  ) {
    try {
      const user = await UserModel.findOne({ telegramId });
      if (user) return { error: UserAlreadyExists, code: 409, success: false };

      const accountId = getCustomId({});
      const newUser = await UserModel.create({ telegramId, accountId, firstName, lastName }) as Pick<User, 'telegramId' | 'accountId' | 'firstName' | 'lastName' | '_id'>;
      return {
        ...newUser,
        code: 200,
        success: true,
        error: '',
      };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async updateUser(
    root,
    { nickName, language },
    { UserModel, user: { _id }, }: ModuleContext<IAccountModuleContext>
  ) {
    try {
      // @ts-ignore
      const response = await Query.validateName(root, { name: nickName }, { UserModel });

      if (response.code === 409 || response.code === 400) return response;

      const updatedUser = await UserModel.findByIdAndUpdate(_id, { nickName, language }, { new: true });

      return {
        ...response,
        data: updatedUser
      };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async sendVerificationSms(root, { phoneNumber }, { user, UserModel, injector }: ModuleContext<IAccountModuleContext>) {
    try {
      // @ts-ignore
      const response = await Query.validatePhoneNumber(root, { phoneNumber }, { UserModel });
      if (response.code !== 200) return response;

      const verificationCode = await injector.get(TwilioProvider).verificationSms(phoneNumber);

      const { _id } = user;
      await UserModel.updateOne({ _id }, { phoneNumber, verificationCode });

      return { error: '', code: 200, success: true };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async verifyActivationCode(root, { code }, { UserModel, user }: ModuleContext<IAccountModuleContext>) {
    try {
      if (user.verificationCode !== code) return { error: '', code: 400, success: false };
      await UserModel.findOneAndUpdate({ _id: user._id }, { verificationCode: '0', verified: true });
      return { error: '', code: 200, success: true };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

  async toggleNotify(root, { notify }, { UserModel, user }: ModuleContext<IAccountModuleContext>) {
    try {
      await UserModel.findByIdAndUpdate(user._id, { notify });
      return { error: '', code: 200, success: true };
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },

};
