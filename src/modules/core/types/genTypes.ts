import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};


























export enum AcceptationStatus {
  Pending = 'PENDING',
  Expired = 'EXPIRED',
  SellerSelected = 'SELLER_SELECTED',
  BuyerSelected = 'BUYER_SELECTED',
  BuyerPayed = 'BUYER_PAYED',
  IncompletePayment = 'INCOMPLETE_PAYMENT',
  Done = 'DONE',
  Blocked = 'BLOCKED',
  BuyerCanceled = 'BUYER_CANCELED',
  SystemCanceled = 'SYSTEM_CANCELED',
  Selected = 'SELECTED'
}

export type AccountOwnerName = {
  __typename?: 'AccountOwnerName';
  accountId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Address = {
  __typename?: 'Address';
  address?: Maybe<Scalars['String']>;
};

export enum AddressPurpose {
  SellerPayment = 'SELLER_PAYMENT',
  ExternalPayment = 'EXTERNAL_PAYMENT'
}

export type Amount = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type BestPrice = {
  __typename?: 'BestPrice';
  value?: Maybe<Scalars['String']>;
  unit?: Maybe<CurrencyType>;
};

export type BestPriceInput = {
  value?: Maybe<Scalars['String']>;
  unit?: Maybe<CurrencyType>;
};

export type BtcWallet = {
  __typename?: 'BTCWallet';
  address?: Maybe<Scalars['String']>;
};

export enum CoinType {
  Btc = 'BTC',
  Dash = 'DASH',
  Eth = 'ETH',
  Usdt = 'USDT'
}

export type CredentialsHistory = {
  __typename?: 'CredentialsHistory';
  nickName?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
};

export enum CurrencyType {
  Usd = 'USD',
  Rub = 'RUB',
  Amd = 'AMD'
}

export type CurrencyValue = {
  __typename?: 'CurrencyValue';
  value?: Maybe<Scalars['Float']>;
};


export type EasyTransfer = {
  __typename?: 'EasyTransfer';
  amountInCoin?: Maybe<Scalars['Float']>;
  amountInUSD?: Maybe<Scalars['Float']>;
  amountInCurrency?: Maybe<Scalars['Float']>;
  easyTransferFeeInitialPercent?: Maybe<Scalars['Float']>;
  easyTransferFeeInitialUSD?: Maybe<Scalars['Float']>;
  easyTransferFeeInPercent?: Maybe<Scalars['Float']>;
  easyTransferFeeCoin?: Maybe<Scalars['Float']>;
  easyTransferFeeInCurrency?: Maybe<Scalars['Float']>;
  totalEasyTransferAmountInCoin?: Maybe<Scalars['Float']>;
  totalEasyTransferAmountInCurrency?: Maybe<Scalars['Float']>;
  totalEasyTransferAmountInUsd?: Maybe<Scalars['Float']>;
};

export type EasyTransferFee = {
  __typename?: 'EasyTransferFee';
  id?: Maybe<Scalars['String']>;
  amountUSD?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  feeUSD?: Maybe<Scalars['Float']>;
};

export type EasyTransferFeeByCoin = {
  __typename?: 'EasyTransferFeeByCoin';
  easyTransferFeePercent?: Maybe<Scalars['Float']>;
  easyTransferFeeUSD?: Maybe<Scalars['Float']>;
  easyTransferFeeCoinUSD?: Maybe<Scalars['Float']>;
  easyTransferFeeCoin?: Maybe<Scalars['Float']>;
};

export type EasyTransferFeePercent = {
  __typename?: 'EasyTransferFeePercent';
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
};

export type EasyTransferOrder = {
  __typename?: 'EasyTransferOrder';
  currency?: Maybe<CurrencyType>;
  coinType?: Maybe<CoinType>;
  amountInCurrency?: Maybe<Scalars['Float']>;
  amountInCoin?: Maybe<Scalars['Float']>;
  easyTransferFeeCoin?: Maybe<Scalars['Float']>;
  totalEasyTransferAmountInCoin?: Maybe<Scalars['Float']>;
  easyTransferFeeInCurrency?: Maybe<Scalars['Float']>;
  totalEasyTransferAmountInCurrency?: Maybe<Scalars['Float']>;
  easyTransferFeeInPercent?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  validDate?: Maybe<Scalars['Float']>;
  easyTransferExpireTime?: Maybe<Scalars['Float']>;
};

export type EasyTransferOrderResponse = {
  __typename?: 'EasyTransferOrderResponse';
  error?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  data?: Maybe<EasyTransferOrder>;
  maxError?: Maybe<Scalars['Boolean']>;
  minError?: Maybe<Scalars['Boolean']>;
  isNanOrInvalidBalance?: Maybe<Scalars['Boolean']>;
};

export enum ElectrumWalletType {
  In = 'IN',
  Out = 'OUT'
}

export type ExchangeRates = {
  __typename?: 'ExchangeRates';
  USDToUSDTExchangeRate?: Maybe<Scalars['Float']>;
  BTCToDASHExchangeRate?: Maybe<Scalars['Float']>;
  BTCToETHExchangeRate?: Maybe<Scalars['Float']>;
  USDToDASHExchangeRate?: Maybe<Scalars['Float']>;
  RUBToUSDTExchangeRate?: Maybe<Scalars['Float']>;
  RUBToAMDExchangeRate?: Maybe<Scalars['Float']>;
  RUBToUSDExchangeRate?: Maybe<Scalars['Float']>;
  USDToETHExchangeRate?: Maybe<Scalars['Float']>;
  RUBToBTCExchangeRate?: Maybe<Scalars['Float']>;
  USDToAMDExchangeRate?: Maybe<Scalars['Float']>;
  BTCToRUBExchangeRate?: Maybe<Scalars['Float']>;
  RUBToETHExchangeRate?: Maybe<Scalars['Float']>;
  USDToBTCExchangeRate?: Maybe<Scalars['Float']>;
  BTCToAMDExchangeRate?: Maybe<Scalars['Float']>;
  BTCToUSDTExchangeRate?: Maybe<Scalars['Float']>;
  BTCToUSDExchangeRate?: Maybe<Scalars['Float']>;
  RUBToDASHExchangeRate?: Maybe<Scalars['Float']>;
  USDToRUBExchangeRate?: Maybe<Scalars['Float']>;
  DASHToUSDExchangeRate?: Maybe<Scalars['Float']>;
  ETHToRUBExchangeRate?: Maybe<Scalars['Float']>;
  DASHToBTCExchangeRate?: Maybe<Scalars['Float']>;
  ETHToBTCExchangeRate?: Maybe<Scalars['Float']>;
  DASHToRUBExchangeRate?: Maybe<Scalars['Float']>;
  ETHToAMDExchangeRate?: Maybe<Scalars['Float']>;
  ETHToUSDExchangeRate?: Maybe<Scalars['Float']>;
  USDTToDASHExchangeRate?: Maybe<Scalars['Float']>;
  ETHToDASHExchangeRate?: Maybe<Scalars['Float']>;
  USDTToETHExchangeRate?: Maybe<Scalars['Float']>;
  DASHToETHExchangeRate?: Maybe<Scalars['Float']>;
  ETHToUSDTExchangeRate?: Maybe<Scalars['Float']>;
  USDTToRUBExchangeRate?: Maybe<Scalars['Float']>;
  USDTToUSDExchangeRate?: Maybe<Scalars['Float']>;
  DASHToAMDExchangeRate?: Maybe<Scalars['Float']>;
  USDTToAMDExchangeRate?: Maybe<Scalars['Float']>;
  USDTToBTCExchangeRate?: Maybe<Scalars['Float']>;
  DASHToUSDTExchangeRate?: Maybe<Scalars['Float']>;
  AMDToBTCExchangeRate?: Maybe<Scalars['Float']>;
  AMDToUSDExchangeRate?: Maybe<Scalars['Float']>;
  AMDToUSDTExchangeRate?: Maybe<Scalars['Float']>;
  AMDToRUBExchangeRate?: Maybe<Scalars['Float']>;
  AMDToDASHExchangeRate?: Maybe<Scalars['Float']>;
  AMDToETHExchangeRate?: Maybe<Scalars['Float']>;
};

export type ExternalAddress = {
  __typename?: 'ExternalAddress';
  BTC?: Maybe<Array<Maybe<Scalars['String']>>>;
  USDT?: Maybe<Array<Maybe<Scalars['String']>>>;
  ETH?: Maybe<Array<Maybe<Scalars['String']>>>;
  DASH?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Fees = {
  __typename?: 'Fees';
  withdrawFees?: Maybe<Array<Maybe<WithdrawFee>>>;
  fixWithdrawFee?: Maybe<WithdrawFee>;
  easyTransferFees?: Maybe<Array<Maybe<EasyTransferFee>>>;
};

export type HistoryMeta = {
  __typename?: 'HistoryMeta';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  transactionId?: Maybe<Scalars['String']>;
  transactionType?: Maybe<HistoryTransactionType>;
  userId?: Maybe<Scalars['String']>;
  transactionStatus?: Maybe<TransactionStatus>;
};

export type HistoryResponse = {
  __typename?: 'HistoryResponse';
  createdAt?: Maybe<Scalars['Date']>;
  orderId?: Maybe<Scalars['String']>;
  transactionType?: Maybe<NetworkRulesEnum>;
  method?: Maybe<TransactionMethod>;
  amount?: Maybe<Scalars['Float']>;
  amountUSD?: Maybe<Scalars['Float']>;
  feeUSD?: Maybe<Scalars['Float']>;
  feeCoin?: Maybe<Scalars['Float']>;
  sender?: Maybe<CredentialsHistory>;
  receiver?: Maybe<CredentialsHistory>;
  status?: Maybe<TransactionStatus>;
  discount?: Maybe<Scalars['Float']>;
  outgoingTransactionFeeInPercent?: Maybe<Scalars['Float']>;
  coinType?: Maybe<CoinType>;
};

export enum HistoryTransactionType {
  In = 'IN',
  Out = 'OUT',
  BuyBtcOffer = 'BUY_BTC_OFFER'
}

export type IncomingTransaction = {
  __typename?: 'IncomingTransaction';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  transactionType?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  txId?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  coinType?: Maybe<CoinType>;
  amountCurrency?: Maybe<OfferAmount>;
  amountUSD?: Maybe<Scalars['Float']>;
  hash?: Maybe<Scalars['String']>;
  method?: Maybe<IncomingTransactionMethod>;
  status?: Maybe<TransactionStatus>;
  fromAccount?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
};

export enum IncomingTransactionMethod {
  Payment = 'PAYMENT',
  EasyTransfer = 'EASY_TRANSFER',
  InternalPayment = 'INTERNAL_PAYMENT'
}

export type InternalAddress = {
  __typename?: 'InternalAddress';
  isInternal?: Maybe<Scalars['Boolean']>;
};

export enum Language {
  En = 'EN',
  Ru = 'RU',
  Am = 'AM'
}

export type LimitedValues = {
  __typename?: 'LimitedValues';
  minTransactionValue?: Maybe<Scalars['Float']>;
  maxTransactionValue?: Maybe<Scalars['Float']>;
  minTransactionValueInCoin?: Maybe<Scalars['Float']>;
  maxTransactionValueInCoin?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerTelegramUser?: Maybe<RegisterUser>;
  updateUser?: Maybe<UpdateUser>;
  sendVerificationSms?: Maybe<OperationStatus>;
  verifyActivationCode?: Maybe<OperationStatus>;
  toggleNotify?: Maybe<OperationStatus>;
  changeGeneralSettings?: Maybe<OperationStatus>;
  checkEasyTransferStatus?: Maybe<OperationStatus>;
  checkOutgoingTransactionStatus?: Maybe<OperationStatus>;
  checkReceiveCoinTransactions?: Maybe<OperationStatus>;
  setCurrencyExchangeRates?: Maybe<OperationStatus>;
  updateCurrencyExchangeRates?: Maybe<OperationStatus>;
  createWithdrawOrder?: Maybe<WithdrawOrderResponse>;
  acceptWithdrawOrder?: Maybe<OperationStatus>;
  createInternalWithdrawOrder?: Maybe<WithdrawOrderResponse>;
  acceptInternalWithdrawOrder?: Maybe<OperationStatus>;
  cancelWithdraw?: Maybe<OperationStatus>;
  createEasyTransferOrder?: Maybe<EasyTransferOrderResponse>;
  acceptEasyTransferOrder?: Maybe<OperationStatus>;
  cancelEasyTransfer?: Maybe<OperationStatus>;
  receiveCoins?: Maybe<OperationStatus>;
};


export type MutationRegisterTelegramUserArgs = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  telegramId?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  nickName?: Maybe<Scalars['String']>;
  language?: Maybe<Language>;
};


export type MutationSendVerificationSmsArgs = {
  phoneNumber?: Maybe<Scalars['String']>;
};


export type MutationVerifyActivationCodeArgs = {
  code?: Maybe<Scalars['String']>;
};


export type MutationToggleNotifyArgs = {
  notify?: Maybe<Scalars['Boolean']>;
};


export type MutationChangeGeneralSettingsArgs = {
  language?: Maybe<Language>;
  currency?: Maybe<CurrencyType>;
};


export type MutationCreateWithdrawOrderArgs = {
  amountInCurrency?: Maybe<Scalars['Float']>;
  currency?: Maybe<CurrencyType>;
  coinType?: Maybe<CoinType>;
  coinAddress?: Maybe<Scalars['String']>;
  maxAvailableBalance?: Maybe<Scalars['Boolean']>;
};


export type MutationAcceptWithdrawOrderArgs = {
  orderId?: Maybe<Scalars['String']>;
};


export type MutationCreateInternalWithdrawOrderArgs = {
  amountInCurrency?: Maybe<Scalars['Float']>;
  currency?: Maybe<CurrencyType>;
  coinType?: Maybe<CoinType>;
  coinAddress?: Maybe<Scalars['String']>;
  maxAvailableBalance?: Maybe<Scalars['Boolean']>;
};


export type MutationAcceptInternalWithdrawOrderArgs = {
  orderId?: Maybe<Scalars['String']>;
};


export type MutationCancelWithdrawArgs = {
  orderId?: Maybe<Scalars['String']>;
};


export type MutationCreateEasyTransferOrderArgs = {
  amountInCurrency?: Maybe<Scalars['Float']>;
  currency?: Maybe<CurrencyType>;
  coinType?: Maybe<CoinType>;
  receiverAccountId?: Maybe<Scalars['String']>;
  maxAvailableBalance?: Maybe<Scalars['Boolean']>;
};


export type MutationAcceptEasyTransferOrderArgs = {
  orderId?: Maybe<Scalars['String']>;
};


export type MutationCancelEasyTransferArgs = {
  orderId?: Maybe<Scalars['String']>;
};


export type MutationReceiveCoinsArgs = {
  address?: Maybe<Scalars['String']>;
  total?: Maybe<Amount>;
  transactionId?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
};

export type NeedVerification = {
  __typename?: 'NeedVerification';
  error?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  needVerification?: Maybe<Scalars['Boolean']>;
};

export enum NetworkRulesEnum {
  In = 'IN',
  Out = 'OUT'
}

export type Offer = {
  btcAmount?: Maybe<Scalars['String']>;
};

export type OfferAmount = {
  __typename?: 'OfferAmount';
  value?: Maybe<Scalars['Float']>;
  unit?: Maybe<CurrencyType>;
};

export type OperationStatus = {
  __typename?: 'OperationStatus';
  error?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type OrderId = {
  __typename?: 'OrderId';
  id?: Maybe<Scalars['String']>;
};

export type OutgoingTransaction = {
  __typename?: 'OutgoingTransaction';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  transactionType?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
  txid?: Maybe<Scalars['String']>;
  receiverAddress?: Maybe<Scalars['String']>;
  outgoingAmount?: Maybe<Scalars['Float']>;
  outgoingAmountUSD?: Maybe<Scalars['Float']>;
  outgoingAmountWithFee?: Maybe<Scalars['Float']>;
  outgoingAmountWithFeeUSD?: Maybe<Scalars['Float']>;
  outgoingAmountCurrency?: Maybe<OfferAmount>;
  coinType?: Maybe<CoinType>;
  status?: Maybe<TransactionStatus>;
  method?: Maybe<OutgoingTransactionMethod>;
  orderId?: Maybe<Scalars['String']>;
  toAccount?: Maybe<Scalars['String']>;
  outgoingTransactionFeeInPercent?: Maybe<Scalars['Float']>;
  validDate?: Maybe<Scalars['Float']>;
  coinBaseTransactionId?: Maybe<Scalars['String']>;
};

export enum OutgoingTransactionMethod {
  Withdraw = 'WITHDRAW',
  EasyTransfer = 'EASY_TRANSFER',
  InternalWithdraw = 'INTERNAL_WITHDRAW',
  WithdrawBuyBtcForFriend = 'WITHDRAW_BUY_BTC_FOR_FRIEND',
  EasyTransferBuyBtcForYourself = 'EASY_TRANSFER_BUY_BTC_FOR_YOURSELF',
  EasyTransferBuyBtcForFriend = 'EASY_TRANSFER_BUY_BTC_FOR_FRIEND'
}

export enum Paymentmethod {
  Telcell = 'TELCELL',
  Easypay = 'EASYPAY',
  Idram = 'IDRAM'
}

export type Query = {
  __typename?: 'Query';
  getUserInfo?: Maybe<UserInfo>;
  getAccount?: Maybe<AccountOwnerName>;
  getWhiteLists?: Maybe<Whitelist>;
  getUnconfirmedBalance?: Maybe<UnconfirmedBalanceInfo>;
  getRecentReceivers?: Maybe<SuggestedReceivers>;
  getTechnicalDetails?: Maybe<Technical>;
  sendNotifications?: Maybe<OperationStatus>;
  dailyReport?: Maybe<OperationStatus>;
  getOrderId?: Maybe<OrderId>;
  getIncomingTransactions?: Maybe<Array<Maybe<IncomingTransaction>>>;
  getOutgoingTransactions?: Maybe<Array<Maybe<OutgoingTransaction>>>;
  getMinAndMaxTransactionValue?: Maybe<LimitedValues>;
  getUsdAmount?: Maybe<CurrencyValue>;
  getWithdrawTransactionFee?: Maybe<Array<Maybe<SortedFee>>>;
  getEasyTransferFee?: Maybe<Array<Maybe<SortedFee>>>;
  validateTransferAmount?: Maybe<ValidAmount>;
  validatePhoneNumber?: Maybe<ValidPhoneNumber>;
  validateDigits?: Maybe<ValidPhoneNumber>;
  validateName?: Maybe<OperationStatus>;
  validateCurrencyValue?: Maybe<ValidBtcValue>;
  getHistory?: Maybe<Array<Maybe<HistoryResponse>>>;
  getNewReceivingAddress?: Maybe<Scalars['String']>;
  isAddressInternal?: Maybe<Scalars['Boolean']>;
  validateCoinAddress?: Maybe<OperationStatus>;
};


export type QueryGetAccountArgs = {
  accountId?: Maybe<Scalars['String']>;
  externalCall?: Maybe<Scalars['Boolean']>;
};


export type QuerySendNotificationsArgs = {
  message: Scalars['String'];
  telegramIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryGetMinAndMaxTransactionValueArgs = {
  coinType?: Maybe<CoinType>;
  currency?: Maybe<CurrencyType>;
};


export type QueryGetUsdAmountArgs = {
  btcAmount?: Maybe<Scalars['Float']>;
  toFixed?: Maybe<Scalars['Int']>;
};


export type QueryValidateTransferAmountArgs = {
  amountInCoin?: Maybe<Scalars['Float']>;
  totalAmountInCoin?: Maybe<Scalars['Float']>;
  coin?: Maybe<CoinType>;
};


export type QueryValidatePhoneNumberArgs = {
  phoneNumber?: Maybe<Scalars['String']>;
};


export type QueryValidateDigitsArgs = {
  phoneNumber?: Maybe<Scalars['String']>;
};


export type QueryValidateNameArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryValidateCurrencyValueArgs = {
  value?: Maybe<Scalars['String']>;
  currency?: Maybe<CurrencyType>;
  withoutMinAmount?: Maybe<Scalars['Boolean']>;
  withoutMaxAmount?: Maybe<Scalars['Boolean']>;
};


export type QueryGetHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryGetNewReceivingAddressArgs = {
  coinType: Scalars['String'];
};


export type QueryIsAddressInternalArgs = {
  address?: Maybe<Scalars['String']>;
  coinType?: Maybe<CoinType>;
};


export type QueryValidateCoinAddressArgs = {
  coinAddress?: Maybe<Scalars['String']>;
  coinType?: Maybe<CoinType>;
  externalCall?: Maybe<Scalars['Boolean']>;
};

export type Rates = {
  __typename?: 'Rates';
  USD?: Maybe<Scalars['Float']>;
  RUB?: Maybe<Scalars['Float']>;
  AMD?: Maybe<Scalars['Float']>;
};

export type ReceivingAddress = {
  __typename?: 'ReceivingAddress';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['String'];
  address: Scalars['String'];
  coinType: Scalars['String'];
  providerType?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  addressHistory?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum ReceivingAddressStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED'
}

export type Recurrences = {
  __typename?: 'Recurrences';
  everyOneMinute?: Maybe<Scalars['String']>;
};

export type RegisterUser = {
  __typename?: 'RegisterUser';
  error?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['String']>;
  telegramId?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type SenderInfo = {
  accountId?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
};

export type SortedFee = {
  __typename?: 'SortedFee';
  feeInPercent?: Maybe<Scalars['Float']>;
  feeInUSD?: Maybe<Scalars['Float']>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};

export type SuggestedReceivers = {
  __typename?: 'SuggestedReceivers';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  ownerId?: Maybe<Scalars['String']>;
  internal?: Maybe<Array<Maybe<Scalars['String']>>>;
  external?: Maybe<ExternalAddress>;
};

export type Technical = {
  __typename?: 'Technical';
  minTransactionUSD?: Maybe<Scalars['Float']>;
  maxTransactionUSD?: Maybe<Scalars['Float']>;
  exchangeRates?: Maybe<Rates>;
  fees?: Maybe<Fees>;
  schedulerRecurrenceTimes?: Maybe<Recurrences>;
  rates?: Maybe<ExchangeRates>;
  suggestedReceiversCount?: Maybe<Scalars['Float']>;
};

export type TimestampType = {
  type?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export enum TransactionMethod {
  Withdraw = 'WITHDRAW',
  EasyTransfer = 'EASY_TRANSFER',
  InternalWithdraw = 'INTERNAL_WITHDRAW',
  Payment = 'PAYMENT',
  InternalPayment = 'INTERNAL_PAYMENT',
  WithdrawBuyBtcForFriend = 'WITHDRAW_BUY_BTC_FOR_FRIEND',
  EasyTransferBuyBtcForYourself = 'EASY_TRANSFER_BUY_BTC_FOR_YOURSELF',
  EasyTransferBuyBtcForFriend = 'EASY_TRANSFER_BUY_BTC_FOR_FRIEND',
  Cashback = 'CASHBACK'
}

export enum TransactionStatus {
  Pending = 'PENDING',
  Inprogress = 'INPROGRESS',
  Resolved = 'RESOLVED',
  Confirmed = 'CONFIRMED',
  Completed = 'COMPLETED',
  Canceled = 'CANCELED',
  Failed = 'FAILED',
  Expired = 'EXPIRED',
  SystemCanceled = 'SYSTEM_CANCELED',
  Sent = 'SENT'
}

export type TransferResponse = {
  __typename?: 'TransferResponse';
  error?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  isInternalWithdraw?: Maybe<Scalars['Boolean']>;
  orderId?: Maybe<Scalars['String']>;
};

export type UnconfirmedBalanceInfo = {
  __typename?: 'UnconfirmedBalanceInfo';
  unconfirmedBalance?: Maybe<UserBalance>;
  unconfirmedBalanceUSD?: Maybe<UserBalance>;
};

export type UpdateEasyTransferFee = {
  easyTransferFeeUSD?: Maybe<Scalars['Float']>;
  easyTransferFee?: Maybe<Scalars['Float']>;
};

export type UpdateElectrumFees = {
  amountUSD?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  feeUSD?: Maybe<Scalars['Float']>;
  rateId?: Maybe<Scalars['String']>;
};

export type UpdateUser = {
  __typename?: 'UpdateUser';
  error?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  data?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  uuid?: Maybe<Scalars['String']>;
  telegramId: Scalars['String'];
  accountId: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  language?: Maybe<Language>;
  balance?: Maybe<UserBalance>;
  lastInteraction?: Maybe<Scalars['Date']>;
  role?: Maybe<UserRole>;
  phoneNumber?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  verificationCode?: Maybe<Scalars['String']>;
  isBlocked?: Maybe<Scalars['Boolean']>;
  notify?: Maybe<Scalars['Boolean']>;
};

export type UserBalance = {
  __typename?: 'UserBalance';
  BTC: Scalars['Float'];
  USDT: Scalars['Float'];
  ETH: Scalars['Float'];
  DASH: Scalars['Float'];
  totalUSD?: Maybe<Scalars['Float']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  uuid?: Maybe<Scalars['String']>;
  telegramId: Scalars['String'];
  accountId: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  language?: Maybe<Language>;
  balance?: Maybe<UserBalance>;
  lastInteraction?: Maybe<Scalars['Date']>;
  role?: Maybe<UserRole>;
  phoneNumber?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  verificationCode?: Maybe<Scalars['String']>;
  isBlocked?: Maybe<Scalars['Boolean']>;
  notify?: Maybe<Scalars['Boolean']>;
  balanceUSD?: Maybe<UserBalance>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Valid = {
  __typename?: 'Valid';
  error?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  maxError?: Maybe<Scalars['Boolean']>;
  minError?: Maybe<Scalars['Boolean']>;
  isNanOrInvalidBalance?: Maybe<Scalars['Boolean']>;
};

export type ValidAmount = {
  __typename?: 'ValidAmount';
  valid?: Maybe<Valid>;
};

export type ValidBtcValue = {
  __typename?: 'ValidBtcValue';
  error?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
};

export type ValidPhoneNumber = {
  __typename?: 'ValidPhoneNumber';
  error?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export enum WalletType {
  Electrum = 'ELECTRUM'
}

export type Whitelist = {
  __typename?: 'Whitelist';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  whitelists?: Maybe<Whitelists>;
};

export type Whitelists = {
  __typename?: 'Whitelists';
  whitelistForDev?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Withdraw = {
  __typename?: 'Withdraw';
  amountInCoin?: Maybe<Scalars['Float']>;
  amountInUSD?: Maybe<Scalars['Float']>;
  amountInCurrency?: Maybe<Scalars['Float']>;
  withdrawFeeInitialPercent?: Maybe<Scalars['Float']>;
  withdrawFeeInitialUSD?: Maybe<Scalars['Float']>;
  withdrawFeeInPercent?: Maybe<Scalars['Float']>;
  withdrawFeeCoin?: Maybe<Scalars['Float']>;
  withdrawFeeInCurrency?: Maybe<Scalars['Float']>;
  totalWithdrawAmountInCoin?: Maybe<Scalars['Float']>;
  totalWithdrawAmountInCurrency?: Maybe<Scalars['Float']>;
  totalWithdrawAmountInUsd?: Maybe<Scalars['Float']>;
};

export type WithdrawFee = {
  __typename?: 'WithdrawFee';
  id?: Maybe<Scalars['String']>;
  amountUSD?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  feeUSD?: Maybe<Scalars['Float']>;
  amount?: Maybe<Scalars['Float']>;
};

export type WithdrawFeeByCoin = {
  __typename?: 'WithdrawFeeByCoin';
  withdrawFeeInitialPercent?: Maybe<Scalars['Float']>;
  withdrawFeeInitialUSD?: Maybe<Scalars['Float']>;
  withdrawFeeCoinUSD?: Maybe<Scalars['Float']>;
  withdrawFeeCoin?: Maybe<Scalars['Float']>;
};

export type WithdrawOrder = {
  __typename?: 'WithdrawOrder';
  currency?: Maybe<CurrencyType>;
  coinType?: Maybe<CoinType>;
  amountInCurrency?: Maybe<Scalars['Float']>;
  amountInCoin?: Maybe<Scalars['Float']>;
  withdrawFeeCoin?: Maybe<Scalars['Float']>;
  totalWithdrawAmountInCoin?: Maybe<Scalars['Float']>;
  withdrawFeeInCurrency?: Maybe<Scalars['Float']>;
  totalWithdrawAmountInCurrency?: Maybe<Scalars['Float']>;
  withdrawFeeInPercent?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  validDate?: Maybe<Scalars['Float']>;
  withdrawExpireTime?: Maybe<Scalars['Float']>;
};

export type WithdrawOrderResponse = {
  __typename?: 'WithdrawOrderResponse';
  error?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  data?: Maybe<WithdrawOrder>;
  maxError?: Maybe<Scalars['Boolean']>;
  minError?: Maybe<Scalars['Boolean']>;
  isNanOrInvalidBalance?: Maybe<Scalars['Boolean']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  UserInfo: ResolverTypeWrapper<UserInfo>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  LANGUAGE: Language;
  UserBalance: ResolverTypeWrapper<UserBalance>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  UserRole: UserRole;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  AccountOwnerName: ResolverTypeWrapper<AccountOwnerName>;
  Whitelist: ResolverTypeWrapper<Whitelist>;
  Whitelists: ResolverTypeWrapper<Whitelists>;
  UnconfirmedBalanceInfo: ResolverTypeWrapper<UnconfirmedBalanceInfo>;
  SuggestedReceivers: ResolverTypeWrapper<SuggestedReceivers>;
  ExternalAddress: ResolverTypeWrapper<ExternalAddress>;
  Technical: ResolverTypeWrapper<Technical>;
  Rates: ResolverTypeWrapper<Rates>;
  Fees: ResolverTypeWrapper<Fees>;
  WithdrawFee: ResolverTypeWrapper<WithdrawFee>;
  EasyTransferFee: ResolverTypeWrapper<EasyTransferFee>;
  Recurrences: ResolverTypeWrapper<Recurrences>;
  ExchangeRates: ResolverTypeWrapper<ExchangeRates>;
  OperationStatus: ResolverTypeWrapper<OperationStatus>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  OrderId: ResolverTypeWrapper<OrderId>;
  IncomingTransaction: ResolverTypeWrapper<IncomingTransaction>;
  CoinType: CoinType;
  OfferAmount: ResolverTypeWrapper<OfferAmount>;
  CurrencyType: CurrencyType;
  IncomingTransactionMethod: IncomingTransactionMethod;
  TransactionStatus: TransactionStatus;
  OutgoingTransaction: ResolverTypeWrapper<OutgoingTransaction>;
  OutgoingTransactionMethod: OutgoingTransactionMethod;
  LimitedValues: ResolverTypeWrapper<LimitedValues>;
  CurrencyValue: ResolverTypeWrapper<CurrencyValue>;
  SortedFee: ResolverTypeWrapper<SortedFee>;
  ValidAmount: ResolverTypeWrapper<ValidAmount>;
  Valid: ResolverTypeWrapper<Valid>;
  ValidPhoneNumber: ResolverTypeWrapper<ValidPhoneNumber>;
  ValidBtcValue: ResolverTypeWrapper<ValidBtcValue>;
  HistoryResponse: ResolverTypeWrapper<HistoryResponse>;
  NetworkRulesEnum: NetworkRulesEnum;
  TransactionMethod: TransactionMethod;
  CredentialsHistory: ResolverTypeWrapper<CredentialsHistory>;
  Mutation: ResolverTypeWrapper<{}>;
  RegisterUser: ResolverTypeWrapper<RegisterUser>;
  UpdateUser: ResolverTypeWrapper<UpdateUser>;
  User: ResolverTypeWrapper<User>;
  WithdrawOrderResponse: ResolverTypeWrapper<WithdrawOrderResponse>;
  WithdrawOrder: ResolverTypeWrapper<WithdrawOrder>;
  EasyTransferOrderResponse: ResolverTypeWrapper<EasyTransferOrderResponse>;
  EasyTransferOrder: ResolverTypeWrapper<EasyTransferOrder>;
  amount: Amount;
  TimestampType: TimestampType;
  UpdateElectrumFees: UpdateElectrumFees;
  UpdateEasyTransferFee: UpdateEasyTransferFee;
  ReceivingAddressStatus: ReceivingAddressStatus;
  WalletType: WalletType;
  AcceptationStatus: AcceptationStatus;
  PAYMENTMETHOD: Paymentmethod;
  AddressPurpose: AddressPurpose;
  HistoryTransactionType: HistoryTransactionType;
  ElectrumWalletType: ElectrumWalletType;
  HistoryMeta: ResolverTypeWrapper<HistoryMeta>;
  ReceivingAddress: ResolverTypeWrapper<ReceivingAddress>;
  BTCWallet: ResolverTypeWrapper<BtcWallet>;
  BestPrice: ResolverTypeWrapper<BestPrice>;
  BestPriceInput: BestPriceInput;
  NeedVerification: ResolverTypeWrapper<NeedVerification>;
  Address: ResolverTypeWrapper<Address>;
  InternalAddress: ResolverTypeWrapper<InternalAddress>;
  EasyTransfer: ResolverTypeWrapper<EasyTransfer>;
  Withdraw: ResolverTypeWrapper<Withdraw>;
  WithdrawFeeByCoin: ResolverTypeWrapper<WithdrawFeeByCoin>;
  EasyTransferFeeByCoin: ResolverTypeWrapper<EasyTransferFeeByCoin>;
  Offer: Offer;
  TransferResponse: ResolverTypeWrapper<TransferResponse>;
  SenderInfo: SenderInfo;
  EasyTransferFeePercent: ResolverTypeWrapper<EasyTransferFeePercent>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  UserInfo: UserInfo;
  ID: Scalars['ID'];
  Date: Scalars['Date'];
  String: Scalars['String'];
  UserBalance: UserBalance;
  Float: Scalars['Float'];
  Boolean: Scalars['Boolean'];
  AccountOwnerName: AccountOwnerName;
  Whitelist: Whitelist;
  Whitelists: Whitelists;
  UnconfirmedBalanceInfo: UnconfirmedBalanceInfo;
  SuggestedReceivers: SuggestedReceivers;
  ExternalAddress: ExternalAddress;
  Technical: Technical;
  Rates: Rates;
  Fees: Fees;
  WithdrawFee: WithdrawFee;
  EasyTransferFee: EasyTransferFee;
  Recurrences: Recurrences;
  ExchangeRates: ExchangeRates;
  OperationStatus: OperationStatus;
  Int: Scalars['Int'];
  OrderId: OrderId;
  IncomingTransaction: IncomingTransaction;
  OfferAmount: OfferAmount;
  OutgoingTransaction: OutgoingTransaction;
  LimitedValues: LimitedValues;
  CurrencyValue: CurrencyValue;
  SortedFee: SortedFee;
  ValidAmount: ValidAmount;
  Valid: Valid;
  ValidPhoneNumber: ValidPhoneNumber;
  ValidBtcValue: ValidBtcValue;
  HistoryResponse: HistoryResponse;
  CredentialsHistory: CredentialsHistory;
  Mutation: {};
  RegisterUser: RegisterUser;
  UpdateUser: UpdateUser;
  User: User;
  WithdrawOrderResponse: WithdrawOrderResponse;
  WithdrawOrder: WithdrawOrder;
  EasyTransferOrderResponse: EasyTransferOrderResponse;
  EasyTransferOrder: EasyTransferOrder;
  amount: Amount;
  TimestampType: TimestampType;
  UpdateElectrumFees: UpdateElectrumFees;
  UpdateEasyTransferFee: UpdateEasyTransferFee;
  HistoryMeta: HistoryMeta;
  ReceivingAddress: ReceivingAddress;
  BTCWallet: BtcWallet;
  BestPrice: BestPrice;
  BestPriceInput: BestPriceInput;
  NeedVerification: NeedVerification;
  Address: Address;
  InternalAddress: InternalAddress;
  EasyTransfer: EasyTransfer;
  Withdraw: Withdraw;
  WithdrawFeeByCoin: WithdrawFeeByCoin;
  EasyTransferFeeByCoin: EasyTransferFeeByCoin;
  Offer: Offer;
  TransferResponse: TransferResponse;
  SenderInfo: SenderInfo;
  EasyTransferFeePercent: EasyTransferFeePercent;
};

export type ObjectIdDirectiveArgs = {   value?: Maybe<Scalars['String']>; };

export type ObjectIdDirectiveResolver<Result, Parent, ContextType = any, Args = ObjectIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type NamespaceDirectiveArgs = {   value?: Maybe<Scalars['String']>; };

export type NamespaceDirectiveResolver<Result, Parent, ContextType = any, Args = NamespaceDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CollectionDirectiveArgs = {   value?: Maybe<Scalars['String']>; };

export type CollectionDirectiveResolver<Result, Parent, ContextType = any, Args = CollectionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type VersionDirectiveArgs = {   value?: Maybe<Scalars['String']>; };

export type VersionDirectiveResolver<Result, Parent, ContextType = any, Args = VersionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IgnoreDirectiveArgs = {   value?: Maybe<Scalars['String']>; };

export type IgnoreDirectiveResolver<Result, Parent, ContextType = any, Args = IgnoreDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DefaultDirectiveArgs = {   value?: Maybe<Scalars['String']>; };

export type DefaultDirectiveResolver<Result, Parent, ContextType = any, Args = DefaultDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RequiredDirectiveArgs = {   value?: Maybe<Scalars['String']>; };

export type RequiredDirectiveResolver<Result, Parent, ContextType = any, Args = RequiredDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UniqueDirectiveArgs = {   value?: Maybe<Scalars['String']>; };

export type UniqueDirectiveResolver<Result, Parent, ContextType = any, Args = UniqueDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SetonceDirectiveArgs = {  };

export type SetonceDirectiveResolver<Result, Parent, ContextType = any, Args = SetonceDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UuidDirectiveArgs = {  };

export type UuidDirectiveResolver<Result, Parent, ContextType = any, Args = UuidDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type OptionalDirectiveArgs = {  };

export type OptionalDirectiveResolver<Result, Parent, ContextType = any, Args = OptionalDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MinDirectiveArgs = {   value?: Maybe<Scalars['Int']>; };

export type MinDirectiveResolver<Result, Parent, ContextType = any, Args = MinDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MaxDirectiveArgs = {   value?: Maybe<Scalars['Int']>; };

export type MaxDirectiveResolver<Result, Parent, ContextType = any, Args = MaxDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MinlengthDirectiveArgs = {   value?: Maybe<Scalars['Int']>; };

export type MinlengthDirectiveResolver<Result, Parent, ContextType = any, Args = MinlengthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MaxlengthDirectiveArgs = {   value?: Maybe<Scalars['Int']>; };

export type MaxlengthDirectiveResolver<Result, Parent, ContextType = any, Args = MaxlengthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type TrimDirectiveArgs = {   value?: Maybe<Scalars['String']>; };

export type TrimDirectiveResolver<Result, Parent, ContextType = any, Args = TrimDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UppercaseDirectiveArgs = {   value?: Maybe<Scalars['Int']>; };

export type UppercaseDirectiveResolver<Result, Parent, ContextType = any, Args = UppercaseDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LowercaseDirectiveArgs = {   value?: Maybe<Scalars['Int']>; };

export type LowercaseDirectiveResolver<Result, Parent, ContextType = any, Args = LowercaseDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HashDirectiveArgs = {   value?: Maybe<Scalars['String']>; };

export type HashDirectiveResolver<Result, Parent, ContextType = any, Args = HashDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ExtendsDirectiveArgs = {   value?: Maybe<Scalars['String']>;
  select?: Maybe<Array<Maybe<Scalars['String']>>>;
  reject?: Maybe<Array<Maybe<Scalars['String']>>>;
  fragment?: Maybe<Array<Maybe<Scalars['String']>>>; };

export type ExtendsDirectiveResolver<Result, Parent, ContextType = any, Args = ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MongoDirectiveArgs = {   timestamps?: Maybe<TimestampType>; };

export type MongoDirectiveResolver<Result, Parent, ContextType = any, Args = MongoDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type FragmentDirectiveArgs = {   value?: Maybe<Array<Maybe<Scalars['String']>>>; };

export type FragmentDirectiveResolver<Result, Parent, ContextType = any, Args = FragmentDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsAuthenticatedDirectiveArgs = {  };

export type IsAuthenticatedDirectiveResolver<Result, Parent, ContextType = any, Args = IsAuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsAdminDirectiveArgs = {  };

export type IsAdminDirectiveResolver<Result, Parent, ContextType = any, Args = IsAdminDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsServiceDirectiveArgs = {  };

export type IsServiceDirectiveResolver<Result, Parent, ContextType = any, Args = IsServiceDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountOwnerNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountOwnerName'] = ResolversParentTypes['AccountOwnerName']> = {
  accountId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BestPriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['BestPrice'] = ResolversParentTypes['BestPrice']> = {
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes['CurrencyType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BtcWalletResolvers<ContextType = any, ParentType extends ResolversParentTypes['BTCWallet'] = ResolversParentTypes['BTCWallet']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CredentialsHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CredentialsHistory'] = ResolversParentTypes['CredentialsHistory']> = {
  nickName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrencyValue'] = ResolversParentTypes['CurrencyValue']> = {
  value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EasyTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['EasyTransfer'] = ResolversParentTypes['EasyTransfer']> = {
  amountInCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountInUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeInitialPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeInitialUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeInPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalEasyTransferAmountInCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalEasyTransferAmountInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalEasyTransferAmountInUsd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EasyTransferFeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['EasyTransferFee'] = ResolversParentTypes['EasyTransferFee']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  amountUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  fee?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  feeUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EasyTransferFeeByCoinResolvers<ContextType = any, ParentType extends ResolversParentTypes['EasyTransferFeeByCoin'] = ResolversParentTypes['EasyTransferFeeByCoin']> = {
  easyTransferFeePercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeCoinUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EasyTransferFeePercentResolvers<ContextType = any, ParentType extends ResolversParentTypes['EasyTransferFeePercent'] = ResolversParentTypes['EasyTransferFeePercent']> = {
  min?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  fee?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EasyTransferOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['EasyTransferOrder'] = ResolversParentTypes['EasyTransferOrder']> = {
  currency?: Resolver<Maybe<ResolversTypes['CurrencyType']>, ParentType, ContextType>;
  coinType?: Resolver<Maybe<ResolversTypes['CoinType']>, ParentType, ContextType>;
  amountInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountInCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalEasyTransferAmountInCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalEasyTransferAmountInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferFeeInPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validDate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  easyTransferExpireTime?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EasyTransferOrderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EasyTransferOrderResponse'] = ResolversParentTypes['EasyTransferOrderResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['EasyTransferOrder']>, ParentType, ContextType>;
  maxError?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  minError?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isNanOrInvalidBalance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExchangeRatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExchangeRates'] = ResolversParentTypes['ExchangeRates']> = {
  USDToUSDTExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  BTCToDASHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  BTCToETHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDToDASHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  RUBToUSDTExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  RUBToAMDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  RUBToUSDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDToETHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  RUBToBTCExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDToAMDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  BTCToRUBExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  RUBToETHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDToBTCExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  BTCToAMDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  BTCToUSDTExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  BTCToUSDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  RUBToDASHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDToRUBExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  DASHToUSDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ETHToRUBExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  DASHToBTCExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ETHToBTCExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  DASHToRUBExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ETHToAMDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ETHToUSDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDTToDASHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ETHToDASHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDTToETHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  DASHToETHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ETHToUSDTExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDTToRUBExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDTToUSDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  DASHToAMDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDTToAMDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  USDTToBTCExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  DASHToUSDTExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  AMDToBTCExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  AMDToUSDExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  AMDToUSDTExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  AMDToRUBExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  AMDToDASHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  AMDToETHExchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalAddress'] = ResolversParentTypes['ExternalAddress']> = {
  BTC?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  USDT?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  ETH?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  DASH?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Fees'] = ResolversParentTypes['Fees']> = {
  withdrawFees?: Resolver<Maybe<Array<Maybe<ResolversTypes['WithdrawFee']>>>, ParentType, ContextType>;
  fixWithdrawFee?: Resolver<Maybe<ResolversTypes['WithdrawFee']>, ParentType, ContextType>;
  easyTransferFees?: Resolver<Maybe<Array<Maybe<ResolversTypes['EasyTransferFee']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HistoryMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['HistoryMeta'] = ResolversParentTypes['HistoryMeta']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  transactionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionType?: Resolver<Maybe<ResolversTypes['HistoryTransactionType']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionStatus?: Resolver<Maybe<ResolversTypes['TransactionStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HistoryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['HistoryResponse'] = ResolversParentTypes['HistoryResponse']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionType?: Resolver<Maybe<ResolversTypes['NetworkRulesEnum']>, ParentType, ContextType>;
  method?: Resolver<Maybe<ResolversTypes['TransactionMethod']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  feeUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  feeCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['CredentialsHistory']>, ParentType, ContextType>;
  receiver?: Resolver<Maybe<ResolversTypes['CredentialsHistory']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TransactionStatus']>, ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  outgoingTransactionFeeInPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  coinType?: Resolver<Maybe<ResolversTypes['CoinType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IncomingTransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['IncomingTransaction'] = ResolversParentTypes['IncomingTransaction']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  transactionType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  txId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  coinType?: Resolver<Maybe<ResolversTypes['CoinType']>, ParentType, ContextType>;
  amountCurrency?: Resolver<Maybe<ResolversTypes['OfferAmount']>, ParentType, ContextType>;
  amountUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  method?: Resolver<Maybe<ResolversTypes['IncomingTransactionMethod']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TransactionStatus']>, ParentType, ContextType>;
  fromAccount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InternalAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['InternalAddress'] = ResolversParentTypes['InternalAddress']> = {
  isInternal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LimitedValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['LimitedValues'] = ResolversParentTypes['LimitedValues']> = {
  minTransactionValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxTransactionValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  minTransactionValueInCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxTransactionValueInCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  registerTelegramUser?: Resolver<Maybe<ResolversTypes['RegisterUser']>, ParentType, ContextType, RequireFields<MutationRegisterTelegramUserArgs, never>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UpdateUser']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, never>>;
  sendVerificationSms?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<MutationSendVerificationSmsArgs, never>>;
  verifyActivationCode?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<MutationVerifyActivationCodeArgs, never>>;
  toggleNotify?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<MutationToggleNotifyArgs, never>>;
  changeGeneralSettings?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<MutationChangeGeneralSettingsArgs, never>>;
  checkEasyTransferStatus?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType>;
  checkOutgoingTransactionStatus?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType>;
  checkReceiveCoinTransactions?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType>;
  setCurrencyExchangeRates?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType>;
  updateCurrencyExchangeRates?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType>;
  createWithdrawOrder?: Resolver<Maybe<ResolversTypes['WithdrawOrderResponse']>, ParentType, ContextType, RequireFields<MutationCreateWithdrawOrderArgs, never>>;
  acceptWithdrawOrder?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<MutationAcceptWithdrawOrderArgs, never>>;
  createInternalWithdrawOrder?: Resolver<Maybe<ResolversTypes['WithdrawOrderResponse']>, ParentType, ContextType, RequireFields<MutationCreateInternalWithdrawOrderArgs, never>>;
  acceptInternalWithdrawOrder?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<MutationAcceptInternalWithdrawOrderArgs, never>>;
  cancelWithdraw?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<MutationCancelWithdrawArgs, never>>;
  createEasyTransferOrder?: Resolver<Maybe<ResolversTypes['EasyTransferOrderResponse']>, ParentType, ContextType, RequireFields<MutationCreateEasyTransferOrderArgs, never>>;
  acceptEasyTransferOrder?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<MutationAcceptEasyTransferOrderArgs, never>>;
  cancelEasyTransfer?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<MutationCancelEasyTransferArgs, never>>;
  receiveCoins?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<MutationReceiveCoinsArgs, never>>;
};

export type NeedVerificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['NeedVerification'] = ResolversParentTypes['NeedVerification']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  needVerification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OfferAmountResolvers<ContextType = any, ParentType extends ResolversParentTypes['OfferAmount'] = ResolversParentTypes['OfferAmount']> = {
  value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes['CurrencyType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OperationStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['OperationStatus'] = ResolversParentTypes['OperationStatus']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderId'] = ResolversParentTypes['OrderId']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OutgoingTransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OutgoingTransaction'] = ResolversParentTypes['OutgoingTransaction']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  transactionType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receiverAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  outgoingAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  outgoingAmountUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  outgoingAmountWithFee?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  outgoingAmountWithFeeUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  outgoingAmountCurrency?: Resolver<Maybe<ResolversTypes['OfferAmount']>, ParentType, ContextType>;
  coinType?: Resolver<Maybe<ResolversTypes['CoinType']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TransactionStatus']>, ParentType, ContextType>;
  method?: Resolver<Maybe<ResolversTypes['OutgoingTransactionMethod']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  toAccount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  outgoingTransactionFeeInPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  validDate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  coinBaseTransactionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUserInfo?: Resolver<Maybe<ResolversTypes['UserInfo']>, ParentType, ContextType>;
  getAccount?: Resolver<Maybe<ResolversTypes['AccountOwnerName']>, ParentType, ContextType, RequireFields<QueryGetAccountArgs, never>>;
  getWhiteLists?: Resolver<Maybe<ResolversTypes['Whitelist']>, ParentType, ContextType>;
  getUnconfirmedBalance?: Resolver<Maybe<ResolversTypes['UnconfirmedBalanceInfo']>, ParentType, ContextType>;
  getRecentReceivers?: Resolver<Maybe<ResolversTypes['SuggestedReceivers']>, ParentType, ContextType>;
  getTechnicalDetails?: Resolver<Maybe<ResolversTypes['Technical']>, ParentType, ContextType>;
  sendNotifications?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<QuerySendNotificationsArgs, 'message'>>;
  dailyReport?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType>;
  getOrderId?: Resolver<Maybe<ResolversTypes['OrderId']>, ParentType, ContextType>;
  getIncomingTransactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['IncomingTransaction']>>>, ParentType, ContextType>;
  getOutgoingTransactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['OutgoingTransaction']>>>, ParentType, ContextType>;
  getMinAndMaxTransactionValue?: Resolver<Maybe<ResolversTypes['LimitedValues']>, ParentType, ContextType, RequireFields<QueryGetMinAndMaxTransactionValueArgs, never>>;
  getUsdAmount?: Resolver<Maybe<ResolversTypes['CurrencyValue']>, ParentType, ContextType, RequireFields<QueryGetUsdAmountArgs, never>>;
  getWithdrawTransactionFee?: Resolver<Maybe<Array<Maybe<ResolversTypes['SortedFee']>>>, ParentType, ContextType>;
  getEasyTransferFee?: Resolver<Maybe<Array<Maybe<ResolversTypes['SortedFee']>>>, ParentType, ContextType>;
  validateTransferAmount?: Resolver<Maybe<ResolversTypes['ValidAmount']>, ParentType, ContextType, RequireFields<QueryValidateTransferAmountArgs, never>>;
  validatePhoneNumber?: Resolver<Maybe<ResolversTypes['ValidPhoneNumber']>, ParentType, ContextType, RequireFields<QueryValidatePhoneNumberArgs, never>>;
  validateDigits?: Resolver<Maybe<ResolversTypes['ValidPhoneNumber']>, ParentType, ContextType, RequireFields<QueryValidateDigitsArgs, never>>;
  validateName?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<QueryValidateNameArgs, never>>;
  validateCurrencyValue?: Resolver<Maybe<ResolversTypes['ValidBtcValue']>, ParentType, ContextType, RequireFields<QueryValidateCurrencyValueArgs, never>>;
  getHistory?: Resolver<Maybe<Array<Maybe<ResolversTypes['HistoryResponse']>>>, ParentType, ContextType, RequireFields<QueryGetHistoryArgs, never>>;
  getNewReceivingAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetNewReceivingAddressArgs, 'coinType'>>;
  isAddressInternal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryIsAddressInternalArgs, never>>;
  validateCoinAddress?: Resolver<Maybe<ResolversTypes['OperationStatus']>, ParentType, ContextType, RequireFields<QueryValidateCoinAddressArgs, never>>;
};

export type RatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rates'] = ResolversParentTypes['Rates']> = {
  USD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  RUB?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  AMD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReceivingAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceivingAddress'] = ResolversParentTypes['ReceivingAddress']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coinType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  providerType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addressHistory?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecurrencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recurrences'] = ResolversParentTypes['Recurrences']> = {
  everyOneMinute?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterUser'] = ResolversParentTypes['RegisterUser']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telegramId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accountId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SortedFeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SortedFee'] = ResolversParentTypes['SortedFee']> = {
  feeInPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  feeInUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuggestedReceiversResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuggestedReceivers'] = ResolversParentTypes['SuggestedReceivers']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  internal?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  external?: Resolver<Maybe<ResolversTypes['ExternalAddress']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TechnicalResolvers<ContextType = any, ParentType extends ResolversParentTypes['Technical'] = ResolversParentTypes['Technical']> = {
  minTransactionUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxTransactionUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  exchangeRates?: Resolver<Maybe<ResolversTypes['Rates']>, ParentType, ContextType>;
  fees?: Resolver<Maybe<ResolversTypes['Fees']>, ParentType, ContextType>;
  schedulerRecurrenceTimes?: Resolver<Maybe<ResolversTypes['Recurrences']>, ParentType, ContextType>;
  rates?: Resolver<Maybe<ResolversTypes['ExchangeRates']>, ParentType, ContextType>;
  suggestedReceiversCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransferResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransferResponse'] = ResolversParentTypes['TransferResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isInternalWithdraw?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnconfirmedBalanceInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnconfirmedBalanceInfo'] = ResolversParentTypes['UnconfirmedBalanceInfo']> = {
  unconfirmedBalance?: Resolver<Maybe<ResolversTypes['UserBalance']>, ParentType, ContextType>;
  unconfirmedBalanceUSD?: Resolver<Maybe<ResolversTypes['UserBalance']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUser'] = ResolversParentTypes['UpdateUser']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telegramId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LANGUAGE']>, ParentType, ContextType>;
  balance?: Resolver<Maybe<ResolversTypes['UserBalance']>, ParentType, ContextType>;
  lastInteraction?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  verificationCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isBlocked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  notify?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserBalanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBalance'] = ResolversParentTypes['UserBalance']> = {
  BTC?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  USDT?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  ETH?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  DASH?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInfo'] = ResolversParentTypes['UserInfo']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telegramId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LANGUAGE']>, ParentType, ContextType>;
  balance?: Resolver<Maybe<ResolversTypes['UserBalance']>, ParentType, ContextType>;
  lastInteraction?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  verificationCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isBlocked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  notify?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  balanceUSD?: Resolver<Maybe<ResolversTypes['UserBalance']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidResolvers<ContextType = any, ParentType extends ResolversParentTypes['Valid'] = ResolversParentTypes['Valid']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  maxError?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  minError?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isNanOrInvalidBalance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidAmountResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidAmount'] = ResolversParentTypes['ValidAmount']> = {
  valid?: Resolver<Maybe<ResolversTypes['Valid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidBtcValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidBtcValue'] = ResolversParentTypes['ValidBtcValue']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidPhoneNumberResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidPhoneNumber'] = ResolversParentTypes['ValidPhoneNumber']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WhitelistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Whitelist'] = ResolversParentTypes['Whitelist']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  whitelists?: Resolver<Maybe<ResolversTypes['Whitelists']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WhitelistsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Whitelists'] = ResolversParentTypes['Whitelists']> = {
  whitelistForDev?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WithdrawResolvers<ContextType = any, ParentType extends ResolversParentTypes['Withdraw'] = ResolversParentTypes['Withdraw']> = {
  amountInCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountInUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeInitialPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeInitialUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeInPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalWithdrawAmountInCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalWithdrawAmountInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalWithdrawAmountInUsd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WithdrawFeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WithdrawFee'] = ResolversParentTypes['WithdrawFee']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  amountUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  fee?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  feeUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WithdrawFeeByCoinResolvers<ContextType = any, ParentType extends ResolversParentTypes['WithdrawFeeByCoin'] = ResolversParentTypes['WithdrawFeeByCoin']> = {
  withdrawFeeInitialPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeInitialUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeCoinUSD?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WithdrawOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['WithdrawOrder'] = ResolversParentTypes['WithdrawOrder']> = {
  currency?: Resolver<Maybe<ResolversTypes['CurrencyType']>, ParentType, ContextType>;
  coinType?: Resolver<Maybe<ResolversTypes['CoinType']>, ParentType, ContextType>;
  amountInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountInCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalWithdrawAmountInCoin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalWithdrawAmountInCurrency?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawFeeInPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validDate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  withdrawExpireTime?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WithdrawOrderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WithdrawOrderResponse'] = ResolversParentTypes['WithdrawOrderResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['WithdrawOrder']>, ParentType, ContextType>;
  maxError?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  minError?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isNanOrInvalidBalance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccountOwnerName?: AccountOwnerNameResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  BestPrice?: BestPriceResolvers<ContextType>;
  BTCWallet?: BtcWalletResolvers<ContextType>;
  CredentialsHistory?: CredentialsHistoryResolvers<ContextType>;
  CurrencyValue?: CurrencyValueResolvers<ContextType>;
  Date?: GraphQLScalarType;
  EasyTransfer?: EasyTransferResolvers<ContextType>;
  EasyTransferFee?: EasyTransferFeeResolvers<ContextType>;
  EasyTransferFeeByCoin?: EasyTransferFeeByCoinResolvers<ContextType>;
  EasyTransferFeePercent?: EasyTransferFeePercentResolvers<ContextType>;
  EasyTransferOrder?: EasyTransferOrderResolvers<ContextType>;
  EasyTransferOrderResponse?: EasyTransferOrderResponseResolvers<ContextType>;
  ExchangeRates?: ExchangeRatesResolvers<ContextType>;
  ExternalAddress?: ExternalAddressResolvers<ContextType>;
  Fees?: FeesResolvers<ContextType>;
  HistoryMeta?: HistoryMetaResolvers<ContextType>;
  HistoryResponse?: HistoryResponseResolvers<ContextType>;
  IncomingTransaction?: IncomingTransactionResolvers<ContextType>;
  InternalAddress?: InternalAddressResolvers<ContextType>;
  LimitedValues?: LimitedValuesResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NeedVerification?: NeedVerificationResolvers<ContextType>;
  OfferAmount?: OfferAmountResolvers<ContextType>;
  OperationStatus?: OperationStatusResolvers<ContextType>;
  OrderId?: OrderIdResolvers<ContextType>;
  OutgoingTransaction?: OutgoingTransactionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rates?: RatesResolvers<ContextType>;
  ReceivingAddress?: ReceivingAddressResolvers<ContextType>;
  Recurrences?: RecurrencesResolvers<ContextType>;
  RegisterUser?: RegisterUserResolvers<ContextType>;
  SortedFee?: SortedFeeResolvers<ContextType>;
  SuggestedReceivers?: SuggestedReceiversResolvers<ContextType>;
  Technical?: TechnicalResolvers<ContextType>;
  TransferResponse?: TransferResponseResolvers<ContextType>;
  UnconfirmedBalanceInfo?: UnconfirmedBalanceInfoResolvers<ContextType>;
  UpdateUser?: UpdateUserResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserBalance?: UserBalanceResolvers<ContextType>;
  UserInfo?: UserInfoResolvers<ContextType>;
  Valid?: ValidResolvers<ContextType>;
  ValidAmount?: ValidAmountResolvers<ContextType>;
  ValidBtcValue?: ValidBtcValueResolvers<ContextType>;
  ValidPhoneNumber?: ValidPhoneNumberResolvers<ContextType>;
  Whitelist?: WhitelistResolvers<ContextType>;
  Whitelists?: WhitelistsResolvers<ContextType>;
  Withdraw?: WithdrawResolvers<ContextType>;
  WithdrawFee?: WithdrawFeeResolvers<ContextType>;
  WithdrawFeeByCoin?: WithdrawFeeByCoinResolvers<ContextType>;
  WithdrawOrder?: WithdrawOrderResolvers<ContextType>;
  WithdrawOrderResponse?: WithdrawOrderResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  ObjectId?: ObjectIdDirectiveResolver<any, any, ContextType>;
  namespace?: NamespaceDirectiveResolver<any, any, ContextType>;
  collection?: CollectionDirectiveResolver<any, any, ContextType>;
  version?: VersionDirectiveResolver<any, any, ContextType>;
  ignore?: IgnoreDirectiveResolver<any, any, ContextType>;
  default?: DefaultDirectiveResolver<any, any, ContextType>;
  required?: RequiredDirectiveResolver<any, any, ContextType>;
  unique?: UniqueDirectiveResolver<any, any, ContextType>;
  setonce?: SetonceDirectiveResolver<any, any, ContextType>;
  uuid?: UuidDirectiveResolver<any, any, ContextType>;
  optional?: OptionalDirectiveResolver<any, any, ContextType>;
  min?: MinDirectiveResolver<any, any, ContextType>;
  max?: MaxDirectiveResolver<any, any, ContextType>;
  minlength?: MinlengthDirectiveResolver<any, any, ContextType>;
  maxlength?: MaxlengthDirectiveResolver<any, any, ContextType>;
  trim?: TrimDirectiveResolver<any, any, ContextType>;
  uppercase?: UppercaseDirectiveResolver<any, any, ContextType>;
  lowercase?: LowercaseDirectiveResolver<any, any, ContextType>;
  hash?: HashDirectiveResolver<any, any, ContextType>;
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
  mongo?: MongoDirectiveResolver<any, any, ContextType>;
  fragment?: FragmentDirectiveResolver<any, any, ContextType>;
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>;
  isAdmin?: IsAdminDirectiveResolver<any, any, ContextType>;
  isService?: IsServiceDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;