import { Injectable, ProviderScope } from '@graphql-modules/di';
import { Document, Model } from 'mongoose';
import { sortBy, find, map, isEmpty } from 'lodash';
import { AsyncInitProvider, CoinbaseProvider, CoinType, CurrencyType, DefaultEnvProvider, EntityEnum, ExchangeCurrencyRateProvider, NamespaceEntityProvider, Technical, WithdrawFeeByCoin, EasyTransferFeeByCoin, Withdraw, EasyTransfer, ReceivingAddress, EasyTransferFee, EasyTransferFeePercent, SuggestedReceivers } from '@spot_wallet/core';
import { numberToFixed } from '@spot_wallet/utils';
import { ApolloError } from 'apollo-server-core';

@Injectable({
  scope: ProviderScope.Application
})
export class FinanceProvider extends AsyncInitProvider {
  constructor(
        private nsp: NamespaceEntityProvider,
        private envProvider: DefaultEnvProvider,
        private coinbaseProvider: CoinbaseProvider,
        private exchangeCurrencyRateProvider: ExchangeCurrencyRateProvider,
  ) {
    super('FinanceProvider');
  }

  public async initializer(): Promise<void> {
    console.log('FinanceProvider onInit - STARTED');
    await this.nsp.onInit();
    await this.exchangeCurrencyRateProvider.onInit();
    this.envProvider.onInit();
    await this.exchangeCurrencyRateProvider.onInit();

    console.log('FinanceProvider onInit - END');
  }

  public async getWithdrawFeeByCoin(coinAddress: string, coinType: CoinType, amountInCoin: number): Promise<WithdrawFeeByCoin> {
    try {
      const { fee: networkFee } = await this.coinbaseProvider.getNetworkFees(coinType, coinAddress);
      // TODO need to fix systemFee value
      const TechnicalModel = this.nsp.getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
      const technicalDetails = await TechnicalModel.findOne();
      const { fixWithdrawFee } = technicalDetails.fees;
      let withdrawFeeCoin;
      if (fixWithdrawFee.fee)
        withdrawFeeCoin = networkFee + (fixWithdrawFee.fee * amountInCoin);
      else {
        const fixWithdrawFeeInCoin = await this.exchangeCurrencyRateProvider.convertCurrency(fixWithdrawFee.feeUSD, CurrencyType.Usd, coinType);
        withdrawFeeCoin = networkFee + fixWithdrawFeeInCoin;
      }
      const withdrawFeeCoinUSD = await this.exchangeCurrencyRateProvider.convertCurrency(withdrawFeeCoin, coinType, CurrencyType.Usd);
      return {
        withdrawFeeInitialPercent: fixWithdrawFee.fee * 100, // value from DB
        withdrawFeeInitialUSD: fixWithdrawFee.feeUSD, // value from DB
        withdrawFeeCoinUSD,
        withdrawFeeCoin,
      };
    } catch ({ message }) {
      throw new Error(message);
    }
  }

  public async isInternalAddress(address: string, coinType: CoinType): Promise<boolean> {
    try {
      const ReceivingAddressModel = this.nsp.getEntityModel<Model<ReceivingAddress & Document>>(EntityEnum.RECEIVING_ADDRESS);
      const isAddressInternal = await ReceivingAddressModel.findOne({ address, coinType });
      return !!isAddressInternal;
    } catch ({ message }) {
      throw new Error(message);
    }
  }

  // TODO fix return type
  public async getEasyTransferFeeByCoin(outgoingAmount: number, coinType: CoinType): Promise<EasyTransferFeeByCoin> {
    try {
      const TechnicalModel = this.nsp.getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
      const technicalDetails = await TechnicalModel.findOne();
      const { fees: { easyTransferFees } } = technicalDetails;
      const sortedFees = sortBy(easyTransferFees, ['amountUSD']);

      let easyTransferFeePercent: number = sortedFees[0].fee;
      let easyTransferFeeUSD: number = sortedFees[0].feeUSD;
      for (const el of sortedFees) {
        if (!el.amountUSD) continue;
        const amountInCoin = await this.exchangeCurrencyRateProvider.convertCurrency(el.amountUSD, CurrencyType.Usd, coinType);
        if (amountInCoin <= outgoingAmount) {
          easyTransferFeePercent = el.fee;
          easyTransferFeeUSD = el.feeUSD;
        }
      }

      let easyTransferFeeCoin: number;
      if (!!easyTransferFeePercent)
        easyTransferFeeCoin = outgoingAmount * easyTransferFeePercent;
      else
        easyTransferFeeCoin = await this.exchangeCurrencyRateProvider.convertCurrency(easyTransferFeeUSD, CurrencyType.Usd, coinType);

      const easyTransferFeeCoinUSD = await this.exchangeCurrencyRateProvider.convertCurrency(easyTransferFeeCoin, coinType, CurrencyType.Usd);

      return {
        easyTransferFeePercent: easyTransferFeePercent * 100, // value from DB
        easyTransferFeeUSD, // value from DB
        easyTransferFeeCoinUSD,
        easyTransferFeeCoin,
      };
    } catch ({ message }) {
      throw new Error(message);
    }
  }

  public async getEasyTransferOrder(amountInCurrency: number, currency: CurrencyType, coinType: CoinType, userCoinBalance: number, maxAvailableBalance: boolean = false): Promise<EasyTransfer> {
    try {
      let amountInCoin: number;
      if (maxAvailableBalance) {
        amountInCoin = await this.getEasyTransferMaxAvailableBalance(userCoinBalance, coinType);
        amountInCurrency = await this.exchangeCurrencyRateProvider.convertCurrency(amountInCoin, coinType, CurrencyType.Usd);
      } else
        amountInCoin = await this.exchangeCurrencyRateProvider.convertCurrency(amountInCurrency, currency, coinType);

      const { easyTransferFeePercent, easyTransferFeeUSD, easyTransferFeeCoin, easyTransferFeeCoinUSD } = await this.getEasyTransferFeeByCoin(amountInCoin, coinType);

      let amountInUSD: number;
      if (currency === CurrencyType.Usd)
        amountInUSD = amountInCurrency;
      else
        amountInUSD = await this.exchangeCurrencyRateProvider.convertCurrency(amountInCoin, coinType, CurrencyType.Usd);

      const easyTransferFeeInPercent = easyTransferFeePercent || (easyTransferFeeUSD * 100) / +amountInUSD;
      const easyTransferFeeInCurrency = await this.exchangeCurrencyRateProvider.convertCurrency(easyTransferFeeCoin, coinType, currency);

      const totalEasyTransferAmountInCoin = amountInCoin + easyTransferFeeCoin;
      const totalEasyTransferAmountInCurrency = amountInCurrency + easyTransferFeeInCurrency;
      const totalEasyTransferAmountInUsd = amountInUSD + easyTransferFeeCoinUSD;

      return {
        amountInCoin: numberToFixed(amountInCoin),
        amountInUSD: numberToFixed(amountInUSD, 1),
        amountInCurrency: numberToFixed(amountInCurrency, 1),

        easyTransferFeeInitialPercent: easyTransferFeePercent,
        easyTransferFeeInitialUSD: easyTransferFeeUSD,
        easyTransferFeeInPercent: numberToFixed(easyTransferFeeInPercent, 1),
        easyTransferFeeCoin: numberToFixed(easyTransferFeeCoin),
        easyTransferFeeInCurrency: numberToFixed(easyTransferFeeInCurrency, 1),

        totalEasyTransferAmountInCoin,
        totalEasyTransferAmountInCurrency: numberToFixed(totalEasyTransferAmountInCurrency, 1),
        totalEasyTransferAmountInUsd: numberToFixed(totalEasyTransferAmountInUsd, 1),
      };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  }

  public async getWithdrawOrder(amountInCurrency: number, currency: CurrencyType, coinType: CoinType, coinAddress: string, userCoinBalance: number, maxAvailableBalance: boolean = false ): Promise<Withdraw> {
    try {
      let amountInCoin: number;
      if (maxAvailableBalance) {
        amountInCoin = await this.getWithdrawMaxAvailableBalance(userCoinBalance, coinType, coinAddress);
        amountInCurrency = await this.exchangeCurrencyRateProvider.convertCurrency(amountInCoin, coinType, CurrencyType.Usd);
      } else
        amountInCoin = await this.exchangeCurrencyRateProvider.convertCurrency(amountInCurrency, currency, coinType);

      let amountInUSD: number;
      if (currency === CurrencyType.Usd)
        amountInUSD = amountInCurrency;
      else
        amountInUSD = await this.exchangeCurrencyRateProvider.convertCurrency(amountInCoin, coinType, CurrencyType.Usd);

      const { withdrawFeeCoin, withdrawFeeCoinUSD, withdrawFeeInitialPercent } = await this.getWithdrawFeeByCoin(coinAddress, coinType, amountInCoin);
      const withdrawFeeInPercent = (withdrawFeeCoinUSD * 100) / amountInUSD;
      const withdrawFeeInCurrency = await this.exchangeCurrencyRateProvider.convertCurrency(withdrawFeeCoin, coinType, currency);

      const totalWithdrawAmountInCoin = amountInCoin + withdrawFeeCoin;
      const totalWithdrawAmountInCurrency = amountInCurrency + withdrawFeeInCurrency;
      const totalWithdrawAmountInUsd = amountInUSD + withdrawFeeCoinUSD;
      return {
        amountInCoin: numberToFixed(amountInCoin),
        amountInUSD: numberToFixed(amountInUSD, 1),
        amountInCurrency: numberToFixed(amountInCurrency),

        withdrawFeeInitialPercent,
        withdrawFeeInitialUSD: withdrawFeeCoinUSD,
        withdrawFeeInPercent: numberToFixed(withdrawFeeInPercent, 3),
        withdrawFeeCoin: numberToFixed(withdrawFeeCoin),
        withdrawFeeInCurrency: numberToFixed(withdrawFeeInCurrency, 1),

        totalWithdrawAmountInCoin,
        totalWithdrawAmountInCurrency: numberToFixed(totalWithdrawAmountInCurrency, 1),
        totalWithdrawAmountInUsd: numberToFixed(totalWithdrawAmountInUsd, 1),
      };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  }

  public async getEasyTransferMaxAvailableBalance (userCoinBalance: number, coinType: CoinType): Promise<number> {
    // get fees from technical
    const TechnicalModel = this.nsp.getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
    const technicalDetails = await TechnicalModel.findOne();
    const { fees: { easyTransferFees } } = technicalDetails;
    const sortedFees = sortBy(easyTransferFees, ['amountUSD']);

    const amountInUSD = await this.exchangeCurrencyRateProvider.convertCurrency(userCoinBalance, coinType, CurrencyType.Usd);
    const availableBalance = await this.getEasyTransferEstimatedAvailableBalance(sortedFees, amountInUSD, userCoinBalance, coinType);
    return availableBalance;
  }

  public async getEasyTransferEstimatedAvailableBalance (sortedFees: EasyTransferFee[], totalBalance: number, userCoinBalance: number, coinType: CoinType, estimatedAvailableBalance: number = null): Promise<number> {
    const { min, max, fee } = this.getEasyTransferFeeRange(sortedFees, estimatedAvailableBalance || totalBalance);

    estimatedAvailableBalance = totalBalance - fee;

    if (estimatedAvailableBalance > min && estimatedAvailableBalance <= max && estimatedAvailableBalance <= totalBalance) {
      const easyTransferFeeInCoin = await this.exchangeCurrencyRateProvider.convertCurrency(fee, CurrencyType.Usd, coinType);
      return userCoinBalance - easyTransferFeeInCoin;
    }

    await this.getEasyTransferEstimatedAvailableBalance(sortedFees, totalBalance, userCoinBalance, coinType, estimatedAvailableBalance);
  }

  public getEasyTransferFeeRange (sortedFees: EasyTransferFee[], totalBalance: number): EasyTransferFeePercent {
    const newFees = map(sortedFees, (sortedFee, index) => {
      let { fee } = sortedFee;
      if (!fee && sortedFee?.feeUSD) fee = sortedFee.feeUSD;
      else fee = totalBalance * fee;

      return { min: sortedFee.amountUSD, max: sortedFees[index + 1]?.amountUSD || Infinity, fee };
    });

    return find(newFees, (fee) => totalBalance > fee.min && totalBalance <= fee.max);
  }

  public async getWithdrawMaxAvailableBalance (userCoinBalance: number, coinType: CoinType, coinAddress: string): Promise<number> {
    const TechnicalModel = this.nsp.getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
    const { fee: networkFee } = await this.coinbaseProvider.getNetworkFees(coinType, coinAddress);
    const technicalDetails = await TechnicalModel.findOne();
    const { fixWithdrawFee } = technicalDetails.fees;

    let withdrawFeeCoin;
    if (fixWithdrawFee.fee)
      withdrawFeeCoin = networkFee + (fixWithdrawFee.fee * userCoinBalance);
    else {
      const fixWithdrawFeeInCoin = await this.exchangeCurrencyRateProvider.convertCurrency(fixWithdrawFee.feeUSD, CurrencyType.Usd, coinType);
      withdrawFeeCoin = networkFee + fixWithdrawFeeInCoin;
    }

    const availableBalance = userCoinBalance - withdrawFeeCoin;

    return availableBalance;
  }

  public async setExternalReceivers(coinAddress: string, coinType: CoinType, ownerId: string): Promise<void> {
    try {
      const TechnicalModel = this.nsp.getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
      const SuggestedReceiversModel = this.nsp.getEntityModel<Model<SuggestedReceivers & Document>>(EntityEnum.SUGGESTED_RECEIVERS);
      const { suggestedReceiversCount } = await TechnicalModel.findOne({});
      const suggestedReceivers = (await SuggestedReceiversModel.findOne({ ownerId }))?.toObject();
      if (!isEmpty(suggestedReceivers)) {
        const externalByCoin = suggestedReceivers.external[coinType].filter(receiver => receiver !== coinAddress);
        externalByCoin.unshift(coinAddress);
        if (externalByCoin.length > suggestedReceiversCount)
          externalByCoin.pop();

        await SuggestedReceiversModel.updateOne({ ownerId }, { [`external.${coinType}`]: externalByCoin });

      } else
        await SuggestedReceiversModel.create({ ownerId, external: { [coinType]: [coinAddress] } });

    } catch ({ message }) {
      throw new Error(message);
    }
  }

}
