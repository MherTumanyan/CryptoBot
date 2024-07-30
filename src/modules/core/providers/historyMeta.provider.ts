import { Model, Document } from 'mongoose';
import { Injectable, ProviderScope, Inject } from '@graphql-modules/di';
import { AsyncInitProvider } from './base.provider';
import { NamespaceEntityProvider } from './namespace.entity.provider';
import { TransactionStatus, EntityEnum, HistoryMeta } from '@spot_wallet/types';

@Injectable({
  scope: ProviderScope.Session
})
export class HistoryMetaProvider extends AsyncInitProvider {
  constructor(
          @Inject(NamespaceEntityProvider) private nsp: NamespaceEntityProvider,
  ) {
    super('HistoryMetaProvider');
  }

  public async initializer(): Promise<void> {
    this.nsp.onInit();

  }

  public async changeHistoryMetaTxStatus (data: { _id: string, status: TransactionStatus }, entityName: EntityEnum): Promise<void> {
    try {
      if ((entityName === EntityEnum.OUTGOING_TRANSACTION || entityName === EntityEnum.INCOMING_TRANSACTION) && data.status !== TransactionStatus.Pending) {
        const HistoryMetaModel = this.nsp.getEntityModel<Model<HistoryMeta & Document>>(EntityEnum.HISTORY_META);
        return HistoryMetaModel.updateOne({ transactionId: data._id }, { transactionStatus: data.status });
      }
    } catch ({ message }) {
      throw new Error(message);
    }
  }
}
