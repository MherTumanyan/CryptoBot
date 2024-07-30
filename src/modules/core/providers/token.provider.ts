import { Injectable, ProviderScope } from '@graphql-modules/di';
import jwt, { DecodeOptions } from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-core';

import { ResetTokenExpiredError, IncorrectTokenError } from '@spot_wallet/utils';
import { DefaultEnvProvider, SyncInitProvider } from '.';

@Injectable({
  scope: ProviderScope.Application
})
export class TokenProvider extends SyncInitProvider {
  constructor(private envProvider: DefaultEnvProvider) {
    super('TokenProvider');
  }

  public initializer(): void {
    this.envProvider.onInit();
  }

  public generateToken(userId: string, admin: boolean = false, secret?: string, expiresIn: string = '48h'): string {
    if (admin) return jwt.sign({ admin }, secret || this.envProvider.JWT_SECRET, { expiresIn });
    return jwt.sign({ userId }, secret || this.envProvider.JWT_SECRET, { expiresIn });
  }

  public decodeToken(token: string): any {
    const { JWT_SECRET } = this.envProvider;
    const verify = jwt.verify(token, JWT_SECRET);
    if (!verify) throw new ApolloError(ResetTokenExpiredError);

    const payload = jwt.decode(token, JWT_SECRET as DecodeOptions);
    if (!payload) throw new ApolloError(IncorrectTokenError);

    if (payload.telegramId) return { telegramId: payload.telegramId };
    if (payload.isService) return { isService: payload.isService };

    throw new ApolloError(IncorrectTokenError);
  }

  public decodeAdminToken(token: string): any {
    const { JWT_SECRET_ADMIN } = this.envProvider;
    const verify = jwt.verify(token, JWT_SECRET_ADMIN);
    if (!verify) throw new ApolloError(ResetTokenExpiredError);

    const payload = jwt.decode(token, JWT_SECRET_ADMIN as DecodeOptions);
    if (!payload) throw new ApolloError(IncorrectTokenError);
    if (payload.userId) return { userId: payload.userId };

    if (payload.telegramId) return { telegramId: payload.telegramId };
    if (payload.isService) return { isService: payload.isService };

    throw new ApolloError(IncorrectTokenError);
  }
}
