import { Injectable, ProviderScope } from '@graphql-modules/di';

import { Twilio } from 'twilio';
import { ApolloError } from 'apollo-server-core';
import { NotCorrectValue } from '@spot_wallet/utils';
import { AsyncInitProvider } from './base.provider';
import { DefaultEnvProvider } from './env.default.provider';
import { TokenProvider } from './token.provider';

import { NamespaceEntityProvider } from './namespace.entity.provider';

@Injectable({
  scope: ProviderScope.Session
})
export class TwilioProvider extends AsyncInitProvider {
    private twilio: Twilio;

    private appName: string;

    constructor(private envProvider: DefaultEnvProvider, private tokenProvider: TokenProvider, private nsp: NamespaceEntityProvider) {
      super('TwilioProvider');

      const { TWILIO_SID, TWILIO_TOKEN, APP_NAME } = this.envProvider;
      this.twilio = new Twilio(TWILIO_SID, TWILIO_TOKEN);
      this.appName = APP_NAME;
    }

    public async initializer(): Promise<void> {
      this.envProvider.onInit();
      this.tokenProvider.onInit();
      this.nsp.onInit();
    }

    public async verificationSms(phone: string): Promise<string> {
      try {
        if (!phone) throw new ApolloError(NotCorrectValue);
        const { TWILIO_PHONE_NUMBER } = this.envProvider;
        const code = Math.random()
          .toString()
          .substring(2, 8);
        await this.twilio.messages.create({
          from: TWILIO_PHONE_NUMBER,
          to: `+${phone}`,
          body: `Your ${this.appName || 'TelO BTC'} verification code is: ${code}`
        });
        return code;
      } catch (error) {
        throw new Error(error.message);
      }
    }
}
