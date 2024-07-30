import { Model, Document } from 'mongoose';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Injectable, ProviderScope, Inject } from '@graphql-modules/di';

import { AsyncInitProvider } from './base.provider';
import { NamespaceEntityProvider } from './namespace.entity.provider';
import { TransactionMethod, TransactionStatus, User, ReceivingAddress, OutgoingTransaction, IncomingTransaction, OutgoingTransactionMethod, IncomingTransactionMethod, EntityEnum } from '@spot_wallet/types';
import { DefaultEnvProvider } from './env.default.provider';
import { numberToFixed, reportsDateFormat } from '@spot_wallet/utils';

@Injectable({
  scope: ProviderScope.Session
})
export class ReportProvider extends AsyncInitProvider {
  constructor(
        @Inject(NamespaceEntityProvider) private nsp: NamespaceEntityProvider,
        @Inject(DefaultEnvProvider) private envProvider: DefaultEnvProvider,
  ) {
    super('ReportProvider');
  }

  public async initializer(): Promise<void> {
    this.nsp.onInit();
    this.envProvider.onInit();

  }

  public async sendReport (data: { status: any, method: any }, entityName: EntityEnum): Promise<void> { // TODO fix data type
    try {
      if (entityName === EntityEnum.OUTGOING_TRANSACTION && data.status === TransactionStatus.Completed && data.method === TransactionMethod.EasyTransfer) {
        return this.sendEasyTransferReport(data);
      }
      if (entityName === EntityEnum.INCOMING_TRANSACTION && data.status === TransactionStatus.Completed && data.method === TransactionMethod.Payment) {
        return this.sendPaymentReport(data);
      }
      if (entityName === EntityEnum.OUTGOING_TRANSACTION && data.status === TransactionStatus.Completed && data.method === TransactionMethod.Withdraw) {
        return this.sendWithdrawReport(data);
      }
      if (entityName === EntityEnum.OUTGOING_TRANSACTION && data.status === TransactionStatus.Completed && data.method === TransactionMethod.InternalWithdraw) {
        return this.sendInternalWithdrawReport(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async sendEasyTransferReport (data) {
    const UserModel = this.nsp.getEntityModel<Model<User & Document>>(EntityEnum.USER);
    const { outgoingAmount: amount, outgoingAmountWithFee: amountWithFee, outgoingAmountUSD: amountUsd, outgoingAmountWithFeeUSD: amountWithFeeUsd, method: action, coinType } = data;
    const date = moment().format(reportsDateFormat);
    const feeCoin = numberToFixed((amountWithFee - amount));
    const feeUsd = numberToFixed(amountWithFeeUsd - amountUsd, 1);

    const fromUser = await UserModel.findOne({ uuid: data.userId }, { nickName: 1, accountId: 1 });
    const toUser = await UserModel.findOne({ accountId: data.toAccount }, { nickName: 1, accountId: 1 });

    if (isEmpty(fromUser) || isEmpty(toUser))
      return;

    const { nickName: fromNickName, accountId: fromAccountId } = fromUser;
    const { nickName: toNickName, accountId: toAccountId } = toUser;

    const botUrl = this.envProvider.BOT_URL;

    return this.nsp.sendMessage(
      'POST',
      {
        privateChannelId: this.envProvider.PRIVATE_CHANNEL_ID,
        amount,
        amountWithFee,
        amountUsd,
        amountWithFeeUsd,
        feeCoin,
        feeUsd,
        fromNickName,
        fromAccountId,
        toNickName,
        toAccountId,
        action,
        date,
        coinType
      },
      `${botUrl}/transactionReportToPrivateChannel`
    );
  }

  private async sendPaymentReport (data) {
    const UserModel = this.nsp.getEntityModel<Model<User & Document>>(EntityEnum.USER);

    const { amount, amountUSD: amountUsd, address, method: action, coinType } = data;
    const date = moment().format(reportsDateFormat);

    const toUser = await UserModel.findOne({ uuid: data.userId }, { nickName: 1, accountId: 1 });

    if (isEmpty(toUser))
      return;

    const { nickName: toNickName, accountId: toAccountId } = toUser;

    const botUrl = this.envProvider.BOT_URL;

    return this.nsp.sendMessage(
      'POST',
      {
        privateChannelId: this.envProvider.PRIVATE_CHANNEL_ID,
        amount,
        amountUsd,
        address,
        toNickName,
        toAccountId,
        action,
        date,
        coinType
      },
      `${botUrl}/transactionReportToPrivateChannel`
    );
  }

  private async sendWithdrawReport (data) {
    const UserModel = this.nsp.getEntityModel<Model<User & Document>>(EntityEnum.USER);
    const { outgoingAmount: amount, outgoingAmountWithFee, outgoingAmountUSD: amountUsd, outgoingAmountWithFeeUSD: amountWithFeeUsd, method: action, receiverAddress: toAccountId, coinType } = data;
    const date = moment().format(reportsDateFormat);

    const amountWithFee = numberToFixed(outgoingAmountWithFee);
    const feeCoin = numberToFixed((amountWithFee - amount));
    const feeUsd = numberToFixed(amountWithFeeUsd - amountUsd, 1);
    const fromUser = await UserModel.findOne({ uuid: data.userId }, { nickName: 1, accountId: 1 });

    if (isEmpty(fromUser))
      return;

    const { nickName: fromNickName, accountId: fromAccountId } = fromUser;

    const botUrl = this.envProvider.BOT_URL;

    return this.nsp.sendMessage(
      'POST',
      {
        privateChannelId: this.envProvider.PRIVATE_CHANNEL_ID,
        amount,
        amountWithFee,
        amountUsd,
        amountWithFeeUsd,
        toAccountId,
        feeCoin,
        feeUsd,
        fromNickName,
        fromAccountId,
        action,
        date,
        coinType
      },
      `${botUrl}/transactionReportToPrivateChannel`
    );
  }

  private async sendInternalWithdrawReport (data) {
    const ReceivingAddressesModel = this.nsp.getEntityModel<Model<ReceivingAddress & Document>>(EntityEnum.RECEIVING_ADDRESS);
    const UserModel = this.nsp.getEntityModel<Model<User & Document>>(EntityEnum.USER);

    const { outgoingAmount: amount, outgoingAmountWithFee, outgoingAmountUSD: amountUsd, outgoingAmountWithFeeUSD: amountWithFeeUsd, receiverAddress, method: action, coinType } = data;

    const date = moment().format(reportsDateFormat);

    const amountWithFee = numberToFixed(outgoingAmountWithFee);
    const feeCoin = numberToFixed((amountWithFee - amount));
    const feeUsd = numberToFixed(amountWithFeeUsd - amountUsd, 1);

    const receivingAddressUserId = await ReceivingAddressesModel.findOne({ address: receiverAddress }, { userId: 1, _id: 0 });

    if (isEmpty(receivingAddressUserId))
      return;

    const { userId: toUserId } = receivingAddressUserId;

    const fromUser = await UserModel.findOne({ uuid: data.userId }, { nickName: 1, accountId: 1 });
    const toUser = await UserModel.findOne({ uuid: toUserId }, { nickName: 1, accountId: 1 });

    if (isEmpty(fromUser) || isEmpty(toUser))
      return;

    const { nickName: fromNickName, accountId: fromAccountId } = fromUser;
    const { nickName: toNickName, accountId: toAccountId } = toUser;

    const botUrl = this.envProvider.BOT_URL;

    return this.nsp.sendMessage(
      'POST',
      {
        privateChannelId: this.envProvider.PRIVATE_CHANNEL_ID,
        amount,
        amountWithFee,
        amountUsd,
        amountWithFeeUsd,
        feeCoin,
        feeUsd,
        fromNickName,
        fromAccountId,
        toNickName,
        toAccountId,
        action,
        date,
        coinType
      },
      `${botUrl}/transactionReportToPrivateChannel`
    );
  }

  public async dailyReport () {
    const OutgoingTransactionModel = this.nsp.getEntityModel<Model<OutgoingTransaction & Document>>(EntityEnum.OUTGOING_TRANSACTION);
    const IncomingTransactionModel = this.nsp.getEntityModel<Model<IncomingTransaction & Document>>(EntityEnum.INCOMING_TRANSACTION);
    const UserModel = this.nsp.getEntityModel<Model<User & Document>>(EntityEnum.USER);

    const createdDateQuery = {
      createdAt: {
        $gte: moment().subtract(1, 'days').startOf('day').toString(),
        $lte: moment().subtract(1, 'days').endOf('day').toString()
      }
    };

    const updatedDateQuery = {
      updatedAt: {
        $gte: moment().subtract(1, 'days').startOf('day').toString(),
        $lte: moment().subtract(1, 'days').endOf('day').toString()
      }
    };

    const totalUsers = await UserModel.find().count();
    const newUsers = await UserModel.find(createdDateQuery).count();

    const totalWithdraw = await OutgoingTransactionModel.find({ method: OutgoingTransactionMethod.Withdraw, status: TransactionStatus.Completed }).count();
    const newWithdraw = await OutgoingTransactionModel.find({
      method: OutgoingTransactionMethod.Withdraw,
      status: TransactionStatus.Completed,
      ...updatedDateQuery
    }).count();

    const totalInternalWithdraw = await OutgoingTransactionModel.find({ method: OutgoingTransactionMethod.InternalWithdraw, status: TransactionStatus.Completed }).count();
    const newInternalWithdraw = await OutgoingTransactionModel.find({
      method: OutgoingTransactionMethod.InternalWithdraw,
      status: TransactionStatus.Completed,
      ...createdDateQuery
    }).count();

    const totalIncome = await IncomingTransactionModel.find({ method: IncomingTransactionMethod.Payment, status: TransactionStatus.Completed }).count();
    const newIncome = await IncomingTransactionModel.find({
      method: IncomingTransactionMethod.Payment,
      status: TransactionStatus.Completed,
      ...updatedDateQuery
    }).count();

    const totalEasyTransfer = await IncomingTransactionModel.find({ method: IncomingTransactionMethod.EasyTransfer, status: TransactionStatus.Completed }).count();
    const newEasyTransfer = await IncomingTransactionModel.find({
      method: IncomingTransactionMethod.EasyTransfer,
      status: TransactionStatus.Completed,
      ...createdDateQuery
    }).count();

    const botUrl = this.envProvider.BOT_URL;
    const date = moment().format(reportsDateFormat);

    return this.nsp.sendMessage(
      'POST',
      {
        privateChannelId: this.envProvider.PRIVATE_CHANNEL_ID,
        date,
        totalUsers,
        newUsers,
        totalWithdraw,
        newWithdraw,
        totalInternalWithdraw,
        newInternalWithdraw,
        totalIncome,
        newIncome,
        totalEasyTransfer,
        newEasyTransfer
      },
      `${botUrl}/dailyReportToPrivateChannel`
    );
  }

}
