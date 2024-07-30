import { Schema, SchemaOptions } from 'mongoose';
import { CoinType, CurrencyType, OperationStatus } from './genTypes';

export type MongoConfig = {
  url: string;
  config?: Record<string, any>
}

export type RegisterSchemaType = {
  name: string;
  schema: Schema;
  pk?: string;
  parent?: string;
  options?: SchemaOptions;
}

export type CoinAndCurrencyType = CoinType | CurrencyType;

export type MinAndMaxTransactionFee = {
  minTransactionValue: number,
  maxTransactionValue: number,
}

export type NetworkFee = OperationStatus & {
  fee?: number
}
