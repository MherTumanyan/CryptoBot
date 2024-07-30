import { Mongoose } from 'mongoose';
import { Injectable, ProviderScope, Inject } from '@graphql-modules/di';
import { ILogger, DefaultLoggerProvider } from './loger.default.provider';
import { MongooseSDKProviderToken } from './provider.tokens';

import { SyncInitProvider } from './base.provider';

export interface IEnvConfig {
    loger: ILogger;
    debug: boolean;
    MASTER_MONGO_URL: string;
    MASTER_MONGO_DATABASE: string;
    PORT: number;
    REQUEST_TO_ELECTRUM_IN: string;
    REQUEST_TO_ELECTRUM_OUT: string;
    AUTH_TOKEN_ELECTRUM_IN: string;
    AUTH_TOKEN_ELECTRUM_OUT: string;
    BOT_URL: string;
    PRIVATE_CHANNEL_ID: string;

    ELECTRUM_URL: string;
    ELECTRUM_OUT_WALLET_PASSWORD: string;
    ELECTRUM_IN_WALLET_PASSWORD: string;
    ELECTRUM_ENABLE: number;
    // ** in case we want to inject our own version of mongoose
    mongoose?: Mongoose;

    JWT_SECRET: string;
    JWT_SECRET_MAIL: string;

    BTC_CHANGE_SENDGRID_KEY: string;

    COINBASE_API_KEY: string;
    COINBASE_API_SECRET: string;
    COINBASE_PRO_KEY: string;
    COINBASE_PRO_SECRET: string;
    COINBASE_PRO_PASSPHRASE: string;
    DASH_ADDRESS_VERIFICATION_URL: string;
    BTC_TRANSACTION_MIN_AMOUNT: string;
    BLOCKCHAIN_INFO_URL: string;
    JWT_SECRET_ADMIN: string;
    ADMIN_BOT_URL: string;
    USD_TO_AMD: string;
    BTC_TO_USD: string;
    USD_TO_RUB: string;

    TWILIO_SID: string;
    TWILIO_TOKEN: string;
    TWILIO_PHONE_NUMBER: string;
    APP_NAME: string;
    BLOT_API_SECRET: string;
    EASY_TRANSFER_EXPIRE_TIME: string;
    WITHDRAW_EXPIRE_TIME: string;

    TRANSACTION_URL: string

    onInit: () => void;
}

@Injectable({
  scope: ProviderScope.Application
})
export class DefaultEnvProvider extends SyncInitProvider implements IEnvConfig {
  public initializer(): void {
    console.log('DefaultEnvProvider onInit - START');
    this.loger.onInit();

    this.debug = !!process.env.debug;

    this.MASTER_MONGO_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
    this.MASTER_MONGO_DATABASE = process.env.MASTER_MONGO_DATABASE || 'crypto_spot';
    this.MASTER_MONGO_ARGS = process.env.MONGODB_ARGS || '';

    this.PORT = +process.env.PORT || 4000;
    console.log('DefaultEnvProvider onInit - END');
    this.BOT_URL = process.env.BOT_URL;
    this.PRIVATE_CHANNEL_ID = process.env.PRIVATE_CHANNEL_ID;
    this.ELECTRUM_URL = process.env.ELECTRUM_URL;
    this.ELECTRUM_OUT_WALLET_PASSWORD = process.env.ELECTRUM_OUT_WALLET_PASSWORD;
    this.ELECTRUM_IN_WALLET_PASSWORD = process.env.ELECTRUM_IN_WALLET_PASSWORD;
    this.REQUEST_TO_ELECTRUM_IN = process.env.REQUEST_TO_ELECTRUM_IN;
    this.REQUEST_TO_ELECTRUM_OUT = process.env.REQUEST_TO_ELECTRUM_OUT;
    this.AUTH_TOKEN_ELECTRUM_IN = process.env.AUTH_TOKEN_ELECTRUM_IN;
    this.AUTH_TOKEN_ELECTRUM_OUT = process.env.AUTH_TOKEN_ELECTRUM_OUT;
    this.ELECTRUM_ENABLE = +process.env.ELECTRUM_ENABLE;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.JWT_SECRET_MAIL = process.env.JWT_SECRET_MAIL;

    this.BTC_CHANGE_SENDGRID_KEY = process.env.BTC_CHANGE_SENDGRID_KEY;

    this.COINBASE_API_KEY = process.env.COINBASE_API_KEY;
    this.COINBASE_API_SECRET = process.env.COINBASE_API_SECRET;
    this.COINBASE_PRO_KEY = process.env.COINBASE_PRO_KEY;
    this.COINBASE_PRO_SECRET = process.env.COINBASE_PRO_SECRET;
    this.COINBASE_PRO_PASSPHRASE = process.env.COINBASE_PRO_PASSPHRASE;
    this.DASH_ADDRESS_VERIFICATION_URL = process.env.DASH_ADDRESS_VERIFICATION_URL;
    this.BTC_TRANSACTION_MIN_AMOUNT = process.env.BTC_TRANSACTION_MIN_AMOUNT;
    this.BLOCKCHAIN_INFO_URL = process.env.BLOCKCHAIN_INFO_URL;
    this.JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
    this.ADMIN_BOT_URL = process.env.ADMIN_BOT_URL;
    this.USD_TO_AMD = process.env.USD_TO_AMD;
    this.BTC_TO_USD = process.env.BTC_TO_USD;
    this.USD_TO_RUB = process.env.USD_TO_RUB;

    this.TWILIO_SID = process.env.TWILIO_SID;
    this.TWILIO_TOKEN = process.env.TWILIO_TOKEN;
    this.TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
    this.APP_NAME = process.env.APP_NAME;

    this.BLOT_API_SECRET = process.env.BLOT_API_SECRET;

    this.CLAN_API_URL = process.env.CLAN_API_URL;
    this.CLAN_JWT_KEY = process.env.CLAN_JWT_KEY;

    this.EASY_TRANSFER_EXPIRE_TIME = process.env.EASY_TRANSFER_EXPIRE_TIME || '30000';
    this.WITHDRAW_EXPIRE_TIME = process.env.WITHDRAW_EXPIRE_TIME || '30000';

    this.TRANSACTION_URL = process.env.TRANSACTION_URL;
  }

    public debug: boolean = false;
    public MASTER_MONGO_URL: string;
    public MASTER_MONGO_DATABASE: string;
    public MASTER_MONGO_ARGS: string;
    public PORT: number;
    public BOT_URL: string;
    public PRIVATE_CHANNEL_ID: string;
    public ELECTRUM_URL: string;
    public ELECTRUM_OUT_WALLET_PASSWORD: string;
    public ELECTRUM_IN_WALLET_PASSWORD: string;
    public REQUEST_TO_ELECTRUM_IN: string;
    public REQUEST_TO_ELECTRUM_OUT: string;
    public AUTH_TOKEN_ELECTRUM_IN: string;
    public AUTH_TOKEN_ELECTRUM_OUT: string;
    public ELECTRUM_ENABLE: number;
    public port: number;
    public JWT_SECRET: string;
    public JWT_SECRET_MAIL: string;
    public BTC_CHANGE_SENDGRID_KEY: string;
    public COINBASE_API_KEY: string;
    public COINBASE_API_SECRET: string;
    public COINBASE_PRO_KEY: string;
    public COINBASE_PRO_SECRET: string;
    public COINBASE_PRO_PASSPHRASE: string;
    public DASH_ADDRESS_VERIFICATION_URL: string;
    public BTC_TRANSACTION_MIN_AMOUNT: string;
    public BLOCKCHAIN_INFO_URL: string;
    public JWT_SECRET_ADMIN: string;
    public ADMIN_BOT_URL: string;
    public USD_TO_AMD: string;
    public BTC_TO_USD: string;
    public USD_TO_RUB: string;
    public TWILIO_SID: string;
    public TWILIO_TOKEN: string;
    public TWILIO_PHONE_NUMBER: string;
    public APP_NAME: string;
    public BLOT_API_SECRET: string;
    public CLAN_API_URL: string;
    public CLAN_JWT_KEY: string;
    public EASY_TRANSFER_EXPIRE_TIME: string;
    public WITHDRAW_EXPIRE_TIME: string;
    public TRANSACTION_URL: string

    constructor(@Inject(DefaultLoggerProvider) public loger: DefaultLoggerProvider, @Inject(MongooseSDKProviderToken) public mongoose?: Mongoose) {
      super('DefaultEnvProvider');
    }
}
