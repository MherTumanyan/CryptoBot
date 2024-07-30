"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
var apollo_server_core_1 = require("apollo-server-core");
var lodash_1 = require("lodash");
var types_1 = require("@spot_wallet/types");
var core_1 = require("@spot_wallet/core");
var utils_1 = require("@spot_wallet/utils");
exports.Mutation = {
    // ScheduleJob
    checkEasyTransferStatus: function (root, _a, _b) {
        var OutgoingTransactionModel = _b.OutgoingTransactionModel, UserModel = _b.UserModel, injector = _b.injector, botUrl = _b.botUrl;
        return __awaiter(this, void 0, void 0, function () {
            var outgoingTransaction, _c, message;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, OutgoingTransactionModel.find({ status: types_1.TransactionStatus.Pending, method: types_1.OutgoingTransactionMethod.EasyTransfer, validDate: { $lt: Date.now() } })];
                    case 1:
                        outgoingTransaction = _d.sent();
                        if (lodash_1.isEmpty(outgoingTransaction))
                            return [2 /*return*/, { error: utils_1.TransactionNotFound, code: 404, success: false }];
                        return [4 /*yield*/, Promise.all(lodash_1.map(outgoingTransaction, function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, language, telegramId;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, OutgoingTransactionModel.updateOne({ _id: transaction._id }, { status: types_1.TransactionStatus.SystemCanceled })];
                                        case 1:
                                            _b.sent();
                                            return [4 /*yield*/, UserModel.findOne({ uuid: transaction.userId })];
                                        case 2:
                                            _a = _b.sent(), language = _a.language, telegramId = _a.telegramId;
                                            return [4 /*yield*/, injector.get(core_1.NamespaceEntityProvider).sendMessage('POST', {
                                                    language: language,
                                                    telegramId: telegramId,
                                                    orderId: transaction.orderId
                                                }, botUrl + "/checkOutgoingTransactionStatus")];
                                        case 3:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 3:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    // ScheduleJob
    checkOutgoingTransactionStatus: function (root, _a, _b) {
        var OutgoingTransactionModel = _b.OutgoingTransactionModel, UserModel = _b.UserModel, injector = _b.injector, botUrl = _b.botUrl;
        return __awaiter(this, void 0, void 0, function () {
            var outgoingTransactions, _c, message;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, OutgoingTransactionModel.find({ status: types_1.TransactionStatus.Sent, method: types_1.OutgoingTransactionMethod.Withdraw })];
                    case 1:
                        outgoingTransactions = _d.sent();
                        return [4 /*yield*/, Promise.all(lodash_1.map(outgoingTransactions, function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                                var coinbaseTransaction, status, transactionUrl, transactionStatus, uppercaseStatus, user, _a, telegramId, language;
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, injector.get(core_1.CoinbaseProvider).getTransaction(transaction.coinType, transaction.coinBaseTransactionId)];
                                        case 1:
                                            coinbaseTransaction = _c.sent();
                                            status = coinbaseTransaction.status, transactionUrl = coinbaseTransaction.network.transaction_url;
                                            transactionStatus = [types_1.TransactionStatus.Canceled, types_1.TransactionStatus.Failed, types_1.TransactionStatus.Expired];
                                            uppercaseStatus = status.toUpperCase();
                                            if (!transactionStatus.includes(uppercaseStatus)) return [3 /*break*/, 5];
                                            return [4 /*yield*/, UserModel.findOneAndUpdate({ uuid: transaction.userId }, { $inc: (_b = {}, _b["balance." + transaction.coinType] = Number(transaction.outgoingAmount), _b) }, { new: true })];
                                        case 2:
                                            user = _c.sent();
                                            return [4 /*yield*/, OutgoingTransactionModel.updateOne({ _id: transaction._id }, { status: uppercaseStatus })];
                                        case 3:
                                            _c.sent();
                                            return [4 /*yield*/, injector.get(core_1.NamespaceEntityProvider).sendMessage('POST', {
                                                    orderId: transaction.orderId,
                                                    transactionType: types_1.NetworkRulesEnum.In,
                                                    telegramId: user.telegramId,
                                                    transactionUrl: transactionUrl,
                                                    locale: user.language
                                                }, botUrl + "/outgoingTransactionCanceled")];
                                        case 4:
                                            _c.sent();
                                            return [3 /*break*/, 9];
                                        case 5:
                                            if (!(uppercaseStatus === types_1.TransactionStatus.Completed)) return [3 /*break*/, 9];
                                            return [4 /*yield*/, OutgoingTransactionModel.updateOne({ _id: transaction._id }, { status: uppercaseStatus })];
                                        case 6:
                                            _c.sent();
                                            return [4 /*yield*/, UserModel.findOne({ uuid: transaction.userId })];
                                        case 7:
                                            _a = _c.sent(), telegramId = _a.telegramId, language = _a.language;
                                            return [4 /*yield*/, injector.get(core_1.NamespaceEntityProvider).sendMessage('POST', {
                                                    orderId: transaction.orderId,
                                                    transactionType: types_1.NetworkRulesEnum.Out,
                                                    telegramId: telegramId,
                                                    transactionUrl: transactionUrl,
                                                    receiverAddress: transaction.receiverAddress,
                                                    outgoingAmount: transaction.outgoingAmount,
                                                    outgoingAmountUSD: transaction.outgoingAmountUSD,
                                                    locale: language,
                                                    coinType: transaction.coinType
                                                }, botUrl + "/outgoingTransactionCompleted")];
                                        case 8:
                                            _c.sent();
                                            _c.label = 9;
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 3:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    // ScheduleJob
    checkReceiveCoinTransactions: function (root, _a, _b) {
        var IncomingTransactionModel = _b.IncomingTransactionModel, UserModel = _b.UserModel, injector = _b.injector, botUrl = _b.botUrl;
        return __awaiter(this, void 0, void 0, function () {
            var pendingReceiveCoinTransactions, _c, message;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, IncomingTransactionModel.find({ status: types_1.TransactionStatus.Pending, method: types_1.IncomingTransactionMethod.Payment, address: { $ne: null } })];
                    case 1:
                        pendingReceiveCoinTransactions = _d.sent();
                        return [4 /*yield*/, Promise.all(lodash_1.map(pendingReceiveCoinTransactions, function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                                var coinbaseTransaction, status, transactionUrl, user, incomingAmountUSD;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, injector.get(core_1.CoinbaseProvider).getTransaction(transaction.coinType, transaction.txId)];
                                        case 1:
                                            coinbaseTransaction = _b.sent();
                                            status = coinbaseTransaction.status, transactionUrl = coinbaseTransaction.network.transaction_url;
                                            if (!(status.toUpperCase() === types_1.TransactionStatus.Completed)) return [3 /*break*/, 6];
                                            return [4 /*yield*/, IncomingTransactionModel.updateOne({ _id: transaction._id }, { status: types_1.TransactionStatus.Completed })];
                                        case 2:
                                            _b.sent();
                                            return [4 /*yield*/, UserModel.findOneAndUpdate({ uuid: transaction.userId }, { $inc: (_a = {}, _a["balance." + transaction.coinType] = Number(transaction.amount), _a) }, { new: true })];
                                        case 3:
                                            user = _b.sent();
                                            return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(transaction.amount, transaction.coinType, types_1.CurrencyType.Usd)];
                                        case 4:
                                            incomingAmountUSD = _b.sent();
                                            // Send message to receiver
                                            return [4 /*yield*/, injector.get(core_1.NamespaceEntityProvider).sendMessage('POST', {
                                                    orderId: transaction.orderId,
                                                    coinType: transaction.coinType,
                                                    transactionType: types_1.IncomingTransactionMethod.Payment,
                                                    telegramId: user.telegramId,
                                                    transactionUrl: transactionUrl,
                                                    incomingAmount: utils_1.numberToFixed(transaction.amount),
                                                    incomingAmountUSD: utils_1.numberToFixed(incomingAmountUSD, 1),
                                                    locale: user.language
                                                }, botUrl + "/incomingTransactionConfirm")];
                                        case 5:
                                            // Send message to receiver
                                            _b.sent();
                                            _b.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 3:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    // ScheduleJob
    setCurrencyExchangeRates: function (root, _a, _b) {
        var injector = _b.injector;
        return __awaiter(this, void 0, void 0, function () {
            var _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).setCurrencyExchangeRates(utils_1.currencies)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 2:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // ScheduleJob
    updateCurrencyExchangeRates: function (root, _a, _b) {
        var injector = _b.injector, TechnicalModel = _b.TechnicalModel;
        return __awaiter(this, void 0, void 0, function () {
            var exchangeRates, _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, injector.get(core_1.TechnicalProvider).setCurrencyExchangeRates(utils_1.currencies)];
                    case 1:
                        exchangeRates = _d.sent();
                        return [4 /*yield*/, TechnicalModel.updateMany({}, { rates: exchangeRates })];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 3:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
//# sourceMappingURL=admin.mutation.js.map