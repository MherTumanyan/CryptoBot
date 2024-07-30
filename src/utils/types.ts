export type CustomID = {
    alphabet?: string;
    fixAlphabet?: string;
    length?: number;
};

export type AccountsIds = {
    BTC?: string,
    USDT?: string,
    ETH?: string,
    DASH?: string
}

export type OrderOperationStatus = {
    error?: string
    code?: number
    success?: boolean
    maxError?: boolean
    minError?: boolean
    isNanOrInvalidBalance?: boolean
}
