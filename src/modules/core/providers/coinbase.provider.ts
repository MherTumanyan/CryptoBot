import { ProviderScope, Injectable } from '@graphql-modules/di';
import { Client, Account, Transaction } from 'coinbase';
import { CoinbasePro } from 'coinbase-pro-node';
import { isEmpty, map } from 'lodash';
import { NamespaceEntityProvider, DefaultEnvProvider } from '.';
import { AccountsIds, AccounstNotFound, AccountNotFound, CurrencyNotFound, numberToFixed } from '@spot_wallet/utils';
import { CoinAndCurrencyType, CoinType, NetworkFee } from '@spot_wallet/types';
import { AsyncInitProvider } from './base.provider';
import { CoinbaseTransaction } from '@customTypes/types';
@Injectable({
  scope: ProviderScope.Application,
})
export class CoinbaseProvider extends AsyncInitProvider {
    private CoinbaseProClient: CoinbasePro;
    private CoinbaseClient: Client;
    private AccountIds: AccountsIds;
    constructor(private nsp: NamespaceEntityProvider, private envProvider: DefaultEnvProvider) {
      super('CoinbaseProvider');
    }

    public async initializer(): Promise<void> {
      await this.nsp.onInit();
      this.envProvider.onInit();

      this.CoinbaseClient = new Client({
        apiKey: this.envProvider.COINBASE_API_KEY,
        apiSecret: this.envProvider.COINBASE_API_SECRET,
        // @ts-ignore
        strictSSL: false,
      });

      this.CoinbaseProClient = new CoinbasePro({
        apiKey: this.envProvider.COINBASE_PRO_KEY,
        apiSecret: this.envProvider.COINBASE_PRO_SECRET,
        passphrase: this.envProvider.COINBASE_PRO_PASSPHRASE,
        useSandbox: false
      });

      this.AccountIds = await this.getAccountIds();
    }

    public async createWalletAddress(coinType: CoinType): Promise<string> {
      const accountId = this.AccountIds[coinType];
      return new Promise((resolve, reject) => {
        return this.CoinbaseClient.getAccount(accountId, (error, account) => {
          if (isEmpty(account)) reject({ code: 404, error: true, message: AccountNotFound });
          if (error) return reject(error);

          account.createAddress({}, (error, addressInfo) => {
            if (error) return reject(error.message);

            resolve(addressInfo.address);
          });
        });
      });
    }

    public async getExchangeRate(from: CoinAndCurrencyType, to: CoinAndCurrencyType, toFixed: number = 6): Promise<number> {
      return new Promise((resolve, reject) => {
        this.CoinbaseClient.getExchangeRates({ 'currency': from }, function(error, rates) {
          if (error) return reject(error.message);

          return rates.data.rates[to] ?
            resolve(numberToFixed(Number(rates.data.rates[to]), toFixed)):
            reject({ code: 404, error: true, message: CurrencyNotFound });
        });
      });
    }

    public async sendMoney(amount: string, address: string, idem: string, coinType: CoinType): Promise<CoinbaseTransaction> {
      const accountId = this.AccountIds[coinType];

      return new Promise((resolve, reject) => {
        return this.CoinbaseClient.getAccount(accountId, async (error, account) => {
          if (error)
            return reject(error.message);

          // @ts-ignore
          account.sendMoney({
            to: address,
            amount,
            currency: coinType,
            idem
          }, (error, tx: CoinbaseTransaction) => {
            if (error) return reject(error.message);
            resolve(tx);
          });
        });
      });
    }

    public async getTransaction(coinType: CoinType, transactionId: string): Promise<Transaction> {
      const accountId = this.AccountIds[coinType];

      return new Promise((resolve, reject) => {
        return this.CoinbaseClient.getAccount(accountId, (error, account) => {

          if (isEmpty(account)) reject({ code: 404, error: true, message: AccountNotFound });
          if (error) return reject(error);

          account.getTransaction(transactionId, (error, tx: CoinbaseTransaction) => {

            if (error) return reject(error);

            resolve(tx);
          });
        });
      });
    }

    public async getNetworkFees(currency: CoinType, address: string): Promise<NetworkFee> {
      try {
        const { fee } = await this.CoinbaseProClient.rest.withdraw.getFeeEstimate(currency, address);

        if (!fee) return { error: '', code: 404, success: false };

        return { error: '', code: 200, success: true, fee: Number(fee) };
      } catch (error) {
        console.log(error.message);
        return { error: error.message, code: 500, success: false };
      }
    }

    private async getAccounts(): Promise<Account[]> {
      return new Promise((resolve, reject) => {
        return this.CoinbaseClient.getAccounts({}, function(error, accounts) {
          if (isEmpty(accounts)) reject({ code: 404, error: true, message: AccounstNotFound });
          if (error) return reject(error.message);

          resolve(accounts);
        });
      });
    }

    private async getAccountIds(): Promise<AccountsIds> {
      const accounts = await this.getAccounts();
      const coins = Object.values(CoinType);

      const accountIds = {};
      map(accounts, (account) => {
        const { id } = account;
        const currency = account.currency as CoinType;
        if (coins.includes(currency)) accountIds[currency] = id;
      });

      return accountIds;
    }

}
