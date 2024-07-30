import { Rates } from '../types/genTypes';
import { Document } from 'mongoose';
export type Fees = {
    electrumTransactionFee: number;
    easyTransferFee: number;
    increaseRate: number;
};

export type Recurrences = {
    everyOneMinute: string;
};

export interface TechnicalDetails extends Document {
    cleanBTC: number;
    minTransactionBTC: number;
    exchangeRates: Rates;
    fees: Fees;
    schedulerRecurrenceTimes: Recurrences;
}
