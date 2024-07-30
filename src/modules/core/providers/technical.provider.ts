import { Model, Document } from 'mongoose';
import { map } from 'lodash';
import { ProviderScope, Injectable } from '@graphql-modules/di';

import { currencies, getCustomId } from '@spot_wallet/utils';
import { AsyncInitProvider } from './base.provider';
import { NamespaceEntityProvider, DefaultEnvProvider } from '.';
import { CoinbaseProvider } from './coinbase.provider';
import { CoinAndCurrencyType, EntityEnum, ExchangeRates, Technical } from '../types';

@Injectable({
  scope: ProviderScope.Application
})
export class TechnicalProvider extends AsyncInitProvider {

  constructor(private nsp: NamespaceEntityProvider, private envProvider: DefaultEnvProvider, private coinBaseProvider: CoinbaseProvider ) {
    super('TechnicalProvider');
  }
  private exchangeRates: ExchangeRates = {};

  public async initializer(): Promise<void> {
    await this.nsp.onInit();
    this.envProvider.onInit();
    await this.coinBaseProvider.onInit();

    const TechnicalModel = this.nsp.getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
    const existingTechnicalDetails = await TechnicalModel.findOne({});
    if (!existingTechnicalDetails) {
      this.exchangeRates = await this.setCurrencyExchangeRates(currencies as CoinAndCurrencyType[]);
      await this.createTechnicalDetails();
    }
  }

  public async createTechnicalDetails(): Promise<void> {
    try {
      const TechnicalModel = this.nsp.getEntityModel<Model<Technical & Document>>(EntityEnum.TECHNICAL);
      await TechnicalModel.create({
        minTransactionUSD: 10,
        maxTransactionUSD: 1000,
        rates: this.exchangeRates,
        fees: {
          fixWithdrawFee: {
            id: getCustomId({ length: 4 }),
            amountUSD: 0,
            fee: 0,
            feeUSD: 4 // $
          },
          withdrawFees: [
            {
              id: getCustomId({ length: 4 }),
              amountUSD: 0,
              fee: 0,
              feeUSD: 4 // $
            },
            {
              id: getCustomId({ length: 4 }),
              amountUSD: 200,
              fee: 0,
              feeUSD: 2 // $
            }
          ],
          easyTransferFees: [
            {
              id: getCustomId({ length: 4 }),
              amountUSD: 0,
              fee: 0,
              feeUSD: 2 // $
            },
            {
              id: getCustomId({ length: 4 }),
              amountUSD: 200,
              fee: 0,
              feeUSD: 2 // $
            }
          ],
        },
        schedulerRecurrenceTimes: {
          everyOneMinute: '*/1 * * * *'
        },
        suggestedReceiversCount: 5
      });
    } catch ({ message }) {
      console.log(message);
    }
  }

  public async setCurrencyExchangeRates(currencies: CoinAndCurrencyType[]): Promise<ExchangeRates> {
    let exchangeRates: ExchangeRates = {};
    await Promise.all(map(currencies, async from => {
      await Promise.all(map(currencies, async to => {
        if (from !== to) {
          const exchangeRate = await this.setCurrencyExchangeRate(from, to);
          exchangeRates = { ...exchangeRates, ...exchangeRate };
        }
      }));
    }));
    return exchangeRates;
  }

  private async setCurrencyExchangeRate(from: CoinAndCurrencyType, to: CoinAndCurrencyType): Promise<{ [key: string]: number }> {
    const rate = await this.coinBaseProvider.getExchangeRate(from, to);
    return { [`${from}To${to}ExchangeRate`]: Number(rate) };
  }
}
