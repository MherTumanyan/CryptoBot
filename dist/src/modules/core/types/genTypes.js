"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletType = exports.UserRole = exports.TransactionStatus = exports.TransactionMethod = exports.ReceivingAddressStatus = exports.Paymentmethod = exports.OutgoingTransactionMethod = exports.NetworkRulesEnum = exports.Language = exports.IncomingTransactionMethod = exports.HistoryTransactionType = exports.ElectrumWalletType = exports.CurrencyType = exports.CoinType = exports.AddressPurpose = exports.AcceptationStatus = void 0;
var AcceptationStatus;
(function (AcceptationStatus) {
    AcceptationStatus["Pending"] = "PENDING";
    AcceptationStatus["Expired"] = "EXPIRED";
    AcceptationStatus["SellerSelected"] = "SELLER_SELECTED";
    AcceptationStatus["BuyerSelected"] = "BUYER_SELECTED";
    AcceptationStatus["BuyerPayed"] = "BUYER_PAYED";
    AcceptationStatus["IncompletePayment"] = "INCOMPLETE_PAYMENT";
    AcceptationStatus["Done"] = "DONE";
    AcceptationStatus["Blocked"] = "BLOCKED";
    AcceptationStatus["BuyerCanceled"] = "BUYER_CANCELED";
    AcceptationStatus["SystemCanceled"] = "SYSTEM_CANCELED";
    AcceptationStatus["Selected"] = "SELECTED";
})(AcceptationStatus = exports.AcceptationStatus || (exports.AcceptationStatus = {}));
var AddressPurpose;
(function (AddressPurpose) {
    AddressPurpose["SellerPayment"] = "SELLER_PAYMENT";
    AddressPurpose["ExternalPayment"] = "EXTERNAL_PAYMENT";
})(AddressPurpose = exports.AddressPurpose || (exports.AddressPurpose = {}));
var CoinType;
(function (CoinType) {
    CoinType["Btc"] = "BTC";
    CoinType["Dash"] = "DASH";
    CoinType["Eth"] = "ETH";
    CoinType["Usdt"] = "USDT";
})(CoinType = exports.CoinType || (exports.CoinType = {}));
var CurrencyType;
(function (CurrencyType) {
    CurrencyType["Usd"] = "USD";
    CurrencyType["Rub"] = "RUB";
    CurrencyType["Amd"] = "AMD";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
var ElectrumWalletType;
(function (ElectrumWalletType) {
    ElectrumWalletType["In"] = "IN";
    ElectrumWalletType["Out"] = "OUT";
})(ElectrumWalletType = exports.ElectrumWalletType || (exports.ElectrumWalletType = {}));
var HistoryTransactionType;
(function (HistoryTransactionType) {
    HistoryTransactionType["In"] = "IN";
    HistoryTransactionType["Out"] = "OUT";
    HistoryTransactionType["BuyBtcOffer"] = "BUY_BTC_OFFER";
})(HistoryTransactionType = exports.HistoryTransactionType || (exports.HistoryTransactionType = {}));
var IncomingTransactionMethod;
(function (IncomingTransactionMethod) {
    IncomingTransactionMethod["Payment"] = "PAYMENT";
    IncomingTransactionMethod["EasyTransfer"] = "EASY_TRANSFER";
    IncomingTransactionMethod["InternalPayment"] = "INTERNAL_PAYMENT";
})(IncomingTransactionMethod = exports.IncomingTransactionMethod || (exports.IncomingTransactionMethod = {}));
var Language;
(function (Language) {
    Language["En"] = "EN";
    Language["Ru"] = "RU";
    Language["Am"] = "AM";
})(Language = exports.Language || (exports.Language = {}));
var NetworkRulesEnum;
(function (NetworkRulesEnum) {
    NetworkRulesEnum["In"] = "IN";
    NetworkRulesEnum["Out"] = "OUT";
})(NetworkRulesEnum = exports.NetworkRulesEnum || (exports.NetworkRulesEnum = {}));
var OutgoingTransactionMethod;
(function (OutgoingTransactionMethod) {
    OutgoingTransactionMethod["Withdraw"] = "WITHDRAW";
    OutgoingTransactionMethod["EasyTransfer"] = "EASY_TRANSFER";
    OutgoingTransactionMethod["InternalWithdraw"] = "INTERNAL_WITHDRAW";
    OutgoingTransactionMethod["WithdrawBuyBtcForFriend"] = "WITHDRAW_BUY_BTC_FOR_FRIEND";
    OutgoingTransactionMethod["EasyTransferBuyBtcForYourself"] = "EASY_TRANSFER_BUY_BTC_FOR_YOURSELF";
    OutgoingTransactionMethod["EasyTransferBuyBtcForFriend"] = "EASY_TRANSFER_BUY_BTC_FOR_FRIEND";
})(OutgoingTransactionMethod = exports.OutgoingTransactionMethod || (exports.OutgoingTransactionMethod = {}));
var Paymentmethod;
(function (Paymentmethod) {
    Paymentmethod["Telcell"] = "TELCELL";
    Paymentmethod["Easypay"] = "EASYPAY";
    Paymentmethod["Idram"] = "IDRAM";
})(Paymentmethod = exports.Paymentmethod || (exports.Paymentmethod = {}));
var ReceivingAddressStatus;
(function (ReceivingAddressStatus) {
    ReceivingAddressStatus["Active"] = "ACTIVE";
    ReceivingAddressStatus["Expired"] = "EXPIRED";
})(ReceivingAddressStatus = exports.ReceivingAddressStatus || (exports.ReceivingAddressStatus = {}));
var TransactionMethod;
(function (TransactionMethod) {
    TransactionMethod["Withdraw"] = "WITHDRAW";
    TransactionMethod["EasyTransfer"] = "EASY_TRANSFER";
    TransactionMethod["InternalWithdraw"] = "INTERNAL_WITHDRAW";
    TransactionMethod["Payment"] = "PAYMENT";
    TransactionMethod["InternalPayment"] = "INTERNAL_PAYMENT";
    TransactionMethod["WithdrawBuyBtcForFriend"] = "WITHDRAW_BUY_BTC_FOR_FRIEND";
    TransactionMethod["EasyTransferBuyBtcForYourself"] = "EASY_TRANSFER_BUY_BTC_FOR_YOURSELF";
    TransactionMethod["EasyTransferBuyBtcForFriend"] = "EASY_TRANSFER_BUY_BTC_FOR_FRIEND";
    TransactionMethod["Cashback"] = "CASHBACK";
})(TransactionMethod = exports.TransactionMethod || (exports.TransactionMethod = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Pending"] = "PENDING";
    TransactionStatus["Inprogress"] = "INPROGRESS";
    TransactionStatus["Resolved"] = "RESOLVED";
    TransactionStatus["Confirmed"] = "CONFIRMED";
    TransactionStatus["Completed"] = "COMPLETED";
    TransactionStatus["Canceled"] = "CANCELED";
    TransactionStatus["Failed"] = "FAILED";
    TransactionStatus["Expired"] = "EXPIRED";
    TransactionStatus["SystemCanceled"] = "SYSTEM_CANCELED";
    TransactionStatus["Sent"] = "SENT";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "ADMIN";
    UserRole["User"] = "USER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var WalletType;
(function (WalletType) {
    WalletType["Electrum"] = "ELECTRUM";
})(WalletType = exports.WalletType || (exports.WalletType = {}));
//# sourceMappingURL=genTypes.js.map