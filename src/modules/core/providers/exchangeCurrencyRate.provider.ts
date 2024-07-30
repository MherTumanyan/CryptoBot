import schedule from 'node-schedule';
import NodeCache from 'node-cache';
import { Document, Model } from 'mongoose';
import { map } from 'lodash';

import { Injectable, ProviderScope } from '@graphql-modules/di';
import { EntityEnum } from '@spot_wallet/core';
import { currencies } from '@spot_wallet/utils';
import { Technical, CurrencyType, CoinType, CoinAndCurrencyType, MinAndMaxTransactionFee } from '@spot_wallet/types';
import { AsyncInitProvider } from './base.provider';
import { DefaultEnvProvider, NamespaceEntityProvider } from '.';
import { CoinbaseProvider } from './coinbase.provider';
import { TechnicalProvider } from './technical.provider';

@Injectable({
  scope: ProviderScope.Application
})
export class ExchangeCurrencyRateProvider extends AsyncInitProvider {
    private cache: NodeCache;
    private TechnicalModel: Model<Technical & Document>;

    constructor(private nsp: NamespaceEntityProvider, private envProvider: DefaultEnvProvider, private coinBaseProvider: CoinbaseProvider, private techincalProvider: TechnicalProvider) {
      super('ExchangeCurrencyRateProvider');
    }

    public async initializer(): Promise<void> {
      await this.nsp.onInit();
      await this.coinBaseProvider.onInit();
      this.envProvider.onInit();
      await this.techincalProvider.onInit();

      this.TechnicalModel = this.nsp.getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
      this.cache = new NodeCache();
      await this.setCurrencyExchangeRates(currencies as CurrencyType[]);
    }

    private async setCurrencyExchangeRate(from: CoinAndCurrencyType, to: CoinAndCurrencyType): Promise<void> {
      const rate = await this.coinBaseProvider.getExchangeRate(from, to);
      this.cache.set(`${from}To${to}ExchangeRate`, Number(rate));
    }

    private getExchangeRateFromCash(from: CoinAndCurrencyType, to: CoinAndCurrencyType): number {
      return this.cache.get(`${from}To${to}ExchangeRate`);
    }

    private async getExchangeRateLive(from: CoinAndCurrencyType, to: CoinAndCurrencyType): Promise<number> {
      return this.coinBaseProvider.getExchangeRate(from, to);
    }

    private async getExchangeRateFromDB(from: CoinAndCurrencyType, to: CoinAndCurrencyType): Promise<number> {
      const technicalDetails = await this.TechnicalModel.findOne();
      const { rates } = technicalDetails;
      return rates[`${from}To${to}ExchangeRate`];
    }

    public async convertCurrency(amount: number, from: CoinAndCurrencyType, to: CoinAndCurrencyType): Promise<number> {
      const rate = await this.getExchangeRate(from, to);
      return amount * rate;
    }

    public async getMinAndMaxTransactionValue(coinType: CoinType): Promise<MinAndMaxTransactionFee> {
      const technicalDetails = await this.TechnicalModel.findOne();
      const { minTransactionUSD, maxTransactionUSD } = technicalDetails;
      const rate = await this.getExchangeRate(CurrencyType.Usd, coinType);
      return {
        minTransactionValue: minTransactionUSD * rate,
        maxTransactionValue: maxTransactionUSD * rate,
      };
    }

    public async getExchangeRate(from: CoinAndCurrencyType, to: CoinAndCurrencyType): Promise<number> {
      const rateFromCash = this.getExchangeRateFromCash(from, to);
      if (rateFromCash) return rateFromCash;

      const liveRate = await this.getExchangeRateLive(from, to);
      if (liveRate) return liveRate;

      const rateFromDb = await this.getExchangeRateFromDB(from, to);
      if (rateFromDb) return rateFromDb;
    }

    public async setCurrencyExchangeRates(currencies: CoinAndCurrencyType[]): Promise<void> {
      await Promise.all(map(currencies, async from => {
        await Promise.all(map(currencies, async to => {
          if (from !== to) await this.setCurrencyExchangeRate(from, to);
        }));
      }));
    }
}
