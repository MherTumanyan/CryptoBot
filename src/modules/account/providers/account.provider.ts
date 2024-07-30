import { Injectable, ProviderScope } from '@graphql-modules/di';
import { Document, Model } from 'mongoose';
import { isEmpty } from 'lodash';
import { AsyncInitProvider, EntityEnum, NamespaceEntityProvider, WithdrawFeeByCoin, SuggestedReceivers, Technical } from '@spot_wallet/core';

@Injectable({
  scope: ProviderScope.Application
})
export class AccountProvider extends AsyncInitProvider {
  constructor(
        private nsp: NamespaceEntityProvider,
  ) {
    super('AccountProvider');
  }

  public async initializer(): Promise<void> {
    console.log('AccountProvider onInit - STARTED');
    await this.nsp.onInit();
    console.log('AccountProvider onInit - END');
  }

  public async setInternalReceivers(accountId: string, ownerId: string): Promise<void> {
    try {
      const TechnicalModel = this.nsp.getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
      const SuggestedReceiversModel = this.nsp.getEntityModel<Model<SuggestedReceivers & Document>>(EntityEnum.SUGGESTED_RECEIVERS);
      const { suggestedReceiversCount } = await TechnicalModel.findOne({});
      const suggestedReceivers = (await SuggestedReceiversModel.findOne({ ownerId }))?.toObject();
      if (!isEmpty(suggestedReceivers)) {
        const internal = suggestedReceivers.internal.filter(receiver => receiver !== accountId);
        internal.unshift(accountId);

        if (internal.length > suggestedReceiversCount)
          internal.pop();

        await SuggestedReceiversModel.updateOne({ ownerId }, { internal });

      } else
        await SuggestedReceiversModel.create({ ownerId, internal: [accountId] });

    } catch ({ message }) {
      throw new Error(message);
    }
  }

}
