import { Transaction } from 'coinbase'

export interface CoinbaseTransaction extends Transaction {
    id: string    
}
