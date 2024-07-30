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
var providers_1 = require("../providers");
var finance_query_1 = require("./finance.query");
exports.Mutation = {
    createWithdrawOrder: function (root, _a, _b) {
        var currency = _a.currency, amountInCurrency = _a.amountInCurrency, coinType = _a.coinType, coinAddress = _a.coinAddress, maxAvailableBalance = _a.maxAvailableBalance;
        var injector = _b.injector, user = _b.user, OutgoingTransactionModel = _b.OutgoingTransactionModel, HistoryMetaModel = _b.HistoryMetaModel, ReceivingAddressModel = _b.ReceivingAddressModel, SuggestedReceiversModel = _b.SuggestedReceiversModel;
        return __awaiter(this, void 0, void 0, function () {
            var userCoinBalance, _c, totalWithdrawAmountInCoin, amountInCoin, amountInUSD, totalWithdrawAmountInUsd, withdrawFeeInPercent, withdrawFeeCoin, withdrawFeeInCurrency, totalWithdrawAmountInCurrency, amountInCurrencyFromOrder, _d, minTransactionValue, maxTransactionValue, isValidAmount, code, validCoinAddress, outgoingOrderId, withdrawExpireTime, validDate, outTransaction, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 6, , 7]);
                        if (isNaN(amountInCurrency) || (amountInCurrency <= 0 && amountInCurrency !== null))
                            return [2 /*return*/, { error: utils_1.AmountMustBePositiveNumber, code: 400, success: false }];
                        userCoinBalance = user.balance[coinType];
                        return [4 /*yield*/, injector.get(providers_1.FinanceProvider).getWithdrawOrder(amountInCurrency, currency, coinType, coinAddress, userCoinBalance, maxAvailableBalance)];
                    case 1:
                        _c = _e.sent(), totalWithdrawAmountInCoin = _c.totalWithdrawAmountInCoin, amountInCoin = _c.amountInCoin, amountInUSD = _c.amountInUSD, totalWithdrawAmountInUsd = _c.totalWithdrawAmountInUsd, withdrawFeeInPercent = _c.withdrawFeeInPercent, withdrawFeeCoin = _c.withdrawFeeCoin, withdrawFeeInCurrency = _c.withdrawFeeInCurrency, totalWithdrawAmountInCurrency = _c.totalWithdrawAmountInCurrency, amountInCurrencyFromOrder = _c.amountInCurrency;
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).getMinAndMaxTransactionValue(coinType)];
                    case 2:
                        _d = _e.sent(), minTransactionValue = _d.minTransactionValue, maxTransactionValue = _d.maxTransactionValue;
                        isValidAmount = utils_1.isValidTransferAmount({
                            minTransactionValue: minTransactionValue,
                            maxTransactionValue: maxTransactionValue,
                            amountInCoin: amountInCoin,
                            totalAmountInCoin: totalWithdrawAmountInCoin,
                            userCoinBalance: userCoinBalance,
                        });
                        code = isValidAmount.code;
                        if (code !== 200)
                            return [2 /*return*/, isValidAmount];
                        return [4 /*yield*/, finance_query_1.Query.validateCoinAddress(root, { coinAddress: coinAddress, coinType: coinType, externalCall: false }, { ReceivingAddressModel: ReceivingAddressModel, user: user, SuggestedReceiversModel: SuggestedReceiversModel })];
                    case 3:
                        validCoinAddress = _e.sent();
                        if (!validCoinAddress.success)
                            return [2 /*return*/, { error: utils_1.AddressIsIncorrect, code: 404, success: false }];
                        outgoingOrderId = utils_1.getCustomId({ fixAlphabet: 'TB', length: 7 });
                        withdrawExpireTime = injector.get(core_1.DefaultEnvProvider).WITHDRAW_EXPIRE_TIME;
                        validDate = Date.now() + Number(withdrawExpireTime);
                        return [4 /*yield*/, OutgoingTransactionModel.create({
                                userId: user.uuid,
                                status: types_1.TransactionStatus.Pending,
                                method: types_1.OutgoingTransactionMethod.Withdraw,
                                coinType: coinType,
                                orderId: outgoingOrderId,
                                receiverAddress: coinAddress,
                                outgoingAmount: amountInCoin,
                                outgoingAmountWithFee: totalWithdrawAmountInCoin,
                                outgoingAmountUSD: amountInUSD,
                                outgoingAmountWithFeeUSD: totalWithdrawAmountInUsd,
                                outgoingTransactionFeeInPercent: withdrawFeeInPercent,
                                validDate: validDate
                            })];
                    case 4:
                        outTransaction = _e.sent();
                        return [4 /*yield*/, HistoryMetaModel.create({ transactionId: outTransaction._id, userId: user.uuid, transactionType: types_1.HistoryTransactionType.Out })];
                    case 5:
                        _e.sent();
                        return [2 /*return*/, {
                                code: 200,
                                error: '',
                                success: true,
                                data: {
                                    currency: currency,
                                    coinType: coinType,
                                    amountInCurrency: amountInCurrencyFromOrder,
                                    amountInCoin: amountInCoin,
                                    withdrawFeeCoin: withdrawFeeCoin,
                                    totalWithdrawAmountInCoin: utils_1.numberToFixed(totalWithdrawAmountInCoin),
                                    withdrawFeeInCurrency: withdrawFeeInCurrency,
                                    totalWithdrawAmountInCurrency: totalWithdrawAmountInCurrency,
                                    withdrawFeeInPercent: withdrawFeeInPercent,
                                    orderId: outgoingOrderId,
                                    validDate: validDate,
                                    withdrawExpireTime: Number(withdrawExpireTime) / 1000,
                                }
                            }];
                    case 6:
                        error_1 = _e.sent();
                        throw new apollo_server_core_1.ApolloError(error_1.message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
    acceptWithdrawOrder: function (root, _a, _b) {
        var orderId = _a.orderId;
        var injector = _b.injector, user = _b.user, UserModel = _b.UserModel, OutgoingTransactionModel = _b.OutgoingTransactionModel;
        return __awaiter(this, void 0, void 0, function () {
            var query, order, outgoingAmount, outgoingAmountWithFee, coinType, receiverAddress, userCoinBalance, _c, minTransactionValue, maxTransactionValue, idem, isValidAmount, code, transactionInfo, error_2;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 6, , 7]);
                        query = { orderId: orderId, userId: user.uuid, status: types_1.TransactionStatus.Pending, validDate: { $gte: Date.now() } };
                        return [4 /*yield*/, OutgoingTransactionModel.findOne(query)];
                    case 1:
                        order = _e.sent();
                        if (lodash_1.isEmpty(order))
                            return [2 /*return*/, { error: utils_1.OrderNotfound, code: 404, success: false }];
                        outgoingAmount = order.outgoingAmount, outgoingAmountWithFee = order.outgoingAmountWithFee, coinType = order.coinType, receiverAddress = order.receiverAddress;
                        userCoinBalance = user.balance[coinType];
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).getMinAndMaxTransactionValue(coinType)];
                    case 2:
                        _c = _e.sent(), minTransactionValue = _c.minTransactionValue, maxTransactionValue = _c.maxTransactionValue;
                        idem = utils_1.getCustomId({ length: 8 });
                        isValidAmount = utils_1.isValidTransferAmount({
                            minTransactionValue: minTransactionValue,
                            maxTransactionValue: maxTransactionValue,
                            amountInCoin: outgoingAmount,
                            totalAmountInCoin: outgoingAmountWithFee,
                            userCoinBalance: userCoinBalance,
                        });
                        code = isValidAmount.code;
                        if (code !== 200)
                            return [2 /*return*/, isValidAmount];
                        return [4 /*yield*/, injector.get(core_1.CoinbaseProvider).sendMoney(outgoingAmount.toString(), receiverAddress, idem, coinType)];
                    case 3:
                        transactionInfo = _e.sent();
                        return [4 /*yield*/, OutgoingTransactionModel.updateOne({ orderId: orderId }, { coinBaseTransactionId: transactionInfo.id, status: types_1.TransactionStatus.Sent })];
                    case 4:
                        _e.sent();
                        return [4 /*yield*/, UserModel.updateOne({ _id: user._id }, { $inc: (_d = {}, _d["balance." + coinType] = -outgoingAmountWithFee, _d) })];
                    case 5:
                        _e.sent();
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 6:
                        error_2 = _e.sent();
                        throw new apollo_server_core_1.ApolloError(error_2.message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
    createInternalWithdrawOrder: function (root, _a, _b) {
        var currency = _a.currency, amountInCurrency = _a.amountInCurrency, coinType = _a.coinType, coinAddress = _a.coinAddress, maxAvailableBalance = _a.maxAvailableBalance;
        var injector = _b.injector, user = _b.user, OutgoingTransactionModel = _b.OutgoingTransactionModel, HistoryMetaModel = _b.HistoryMetaModel, ReceivingAddressModel = _b.ReceivingAddressModel, UserModel = _b.UserModel;
        return __awaiter(this, void 0, void 0, function () {
            var userId, accountId, easyTransferResult, _c, amountInCoin, amountInCurrencyFromOrder, withdrawFeeCoin, totalWithdrawAmountInCoin, withdrawFeeInCurrency, totalWithdrawAmountInCurrency, withdrawFeeInPercent, withdrawExpireTime, orderId, validDate, _d, message;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, ReceivingAddressModel.findOne({ address: coinAddress })];
                    case 1:
                        userId = (_e.sent()).userId;
                        return [4 /*yield*/, UserModel.findOne({ uuid: userId })];
                    case 2:
                        accountId = (_e.sent()).accountId;
                        return [4 /*yield*/, exports.Mutation.createEasyTransferOrder(root, { currency: currency, amountInCurrency: amountInCurrency, coinType: coinType, receiverAccountId: accountId, user: user, maxAvailableBalance: maxAvailableBalance }, { injector: injector, user: user, UserModel: UserModel, OutgoingTransactionModel: OutgoingTransactionModel, HistoryMetaModel: HistoryMetaModel })];
                    case 3:
                        easyTransferResult = _e.sent();
                        if (easyTransferResult.code !== 200)
                            return [2 /*return*/, easyTransferResult];
                        _c = easyTransferResult.data, amountInCoin = _c.amountInCoin, amountInCurrencyFromOrder = _c.amountInCurrency, withdrawFeeCoin = _c.easyTransferFeeCoin, totalWithdrawAmountInCoin = _c.totalEasyTransferAmountInCoin, withdrawFeeInCurrency = _c.easyTransferFeeInCurrency, totalWithdrawAmountInCurrency = _c.totalEasyTransferAmountInCurrency, withdrawFeeInPercent = _c.easyTransferFeeInPercent, withdrawExpireTime = _c.easyTransferExpireTime, orderId = _c.orderId, validDate = _c.validDate;
                        return [2 /*return*/, {
                                code: 200,
                                error: '',
                                success: true,
                                data: {
                                    currency: currency,
                                    coinType: coinType,
                                    amountInCurrency: amountInCurrencyFromOrder,
                                    amountInCoin: amountInCoin,
                                    withdrawFeeCoin: withdrawFeeCoin,
                                    totalWithdrawAmountInCoin: totalWithdrawAmountInCoin,
                                    withdrawFeeInCurrency: withdrawFeeInCurrency,
                                    totalWithdrawAmountInCurrency: totalWithdrawAmountInCurrency,
                                    withdrawFeeInPercent: withdrawFeeInPercent,
                                    orderId: orderId,
                                    validDate: validDate,
                                    withdrawExpireTime: withdrawExpireTime,
                                }
                            }];
                    case 4:
                        _d = _e.sent();
                        message = _d.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    acceptInternalWithdrawOrder: function (root, _a, _b) {
        var orderId = _a.orderId;
        var injector = _b.injector, user = _b.user, UserModel = _b.UserModel, OutgoingTransactionModel = _b.OutgoingTransactionModel, IncomingTransactionModel = _b.IncomingTransactionModel, HistoryMetaModel = _b.HistoryMetaModel, botUrl = _b.botUrl;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                try {
                    // @ts-ignore
                    return [2 /*return*/, exports.Mutation.acceptEasyTransferOrder(root, { orderId: orderId }, { injector: injector, user: user, UserModel: UserModel, OutgoingTransactionModel: OutgoingTransactionModel, IncomingTransactionModel: IncomingTransactionModel, HistoryMetaModel: HistoryMetaModel, botUrl: botUrl })];
                }
                catch (error) {
                    throw new apollo_server_core_1.ApolloError(error.message);
                }
                return [2 /*return*/];
            });
        });
    },
    createEasyTransferOrder: function (root, _a, _b) {
        var currency = _a.currency, amountInCurrency = _a.amountInCurrency, coinType = _a.coinType, receiverAccountId = _a.receiverAccountId, maxAvailableBalance = _a.maxAvailableBalance;
        var injector = _b.injector, user = _b.user, UserModel = _b.UserModel, OutgoingTransactionModel = _b.OutgoingTransactionModel, HistoryMetaModel = _b.HistoryMetaModel;
        return __awaiter(this, void 0, void 0, function () {
            var userCoinBalance, _c, totalEasyTransferAmountInCoin, amountInCoin, amountInUSD, totalEasyTransferAmountInUsd, easyTransferFeeInPercent, easyTransferFeeCoin, easyTransferFeeInCurrency, totalEasyTransferAmountInCurrency, amountInCurrencyFromOrder, _d, minTransactionValue, maxTransactionValue, isValidAmount, code, receiver, outgoingOrderId, easyTransferExpireTime, validDate, outTransaction, _e, message;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 6, , 7]);
                        userCoinBalance = user.balance[coinType];
                        return [4 /*yield*/, injector.get(providers_1.FinanceProvider).getEasyTransferOrder(amountInCurrency, currency, coinType, userCoinBalance, maxAvailableBalance)];
                    case 1:
                        _c = _f.sent(), totalEasyTransferAmountInCoin = _c.totalEasyTransferAmountInCoin, amountInCoin = _c.amountInCoin, amountInUSD = _c.amountInUSD, totalEasyTransferAmountInUsd = _c.totalEasyTransferAmountInUsd, easyTransferFeeInPercent = _c.easyTransferFeeInPercent, easyTransferFeeCoin = _c.easyTransferFeeCoin, easyTransferFeeInCurrency = _c.easyTransferFeeInCurrency, totalEasyTransferAmountInCurrency = _c.totalEasyTransferAmountInCurrency, amountInCurrencyFromOrder = _c.amountInCurrency;
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).getMinAndMaxTransactionValue(coinType)];
                    case 2:
                        _d = _f.sent(), minTransactionValue = _d.minTransactionValue, maxTransactionValue = _d.maxTransactionValue;
                        isValidAmount = utils_1.isValidTransferAmount({
                            minTransactionValue: minTransactionValue,
                            maxTransactionValue: maxTransactionValue,
                            amountInCoin: amountInCoin,
                            totalAmountInCoin: totalEasyTransferAmountInCoin,
                            userCoinBalance: userCoinBalance,
                        });
                        code = isValidAmount.code;
                        if (code !== 200)
                            return [2 /*return*/, isValidAmount];
                        return [4 /*yield*/, UserModel.findOne({ accountId: receiverAccountId })];
                    case 3:
                        receiver = _f.sent();
                        if (!receiver)
                            return [2 /*return*/, { error: utils_1.ReceiverNotFound, code: 404, success: false }];
                        outgoingOrderId = utils_1.getCustomId({ fixAlphabet: 'TT', length: 7 });
                        easyTransferExpireTime = injector.get(core_1.DefaultEnvProvider).EASY_TRANSFER_EXPIRE_TIME;
                        validDate = Date.now() + Number(easyTransferExpireTime);
                        return [4 /*yield*/, OutgoingTransactionModel.create({
                                userId: user.uuid,
                                status: types_1.TransactionStatus.Pending,
                                method: types_1.OutgoingTransactionMethod.EasyTransfer,
                                coinType: coinType,
                                orderId: outgoingOrderId,
                                toAccount: receiverAccountId,
                                outgoingAmount: amountInCoin,
                                outgoingAmountWithFee: totalEasyTransferAmountInCoin,
                                outgoingAmountUSD: amountInUSD,
                                outgoingAmountWithFeeUSD: totalEasyTransferAmountInUsd,
                                outgoingTransactionFeeInPercent: easyTransferFeeInPercent,
                                validDate: validDate
                            })];
                    case 4:
                        outTransaction = _f.sent();
                        return [4 /*yield*/, HistoryMetaModel.create({ transactionId: outTransaction._id, userId: user.uuid, transactionType: types_1.HistoryTransactionType.Out })];
                    case 5:
                        _f.sent();
                        return [2 /*return*/, {
                                code: 200,
                                error: '',
                                success: true,
                                data: {
                                    currency: currency,
                                    coinType: coinType,
                                    amountInCurrency: amountInCurrencyFromOrder,
                                    amountInCoin: amountInCoin,
                                    easyTransferFeeCoin: easyTransferFeeCoin,
                                    totalEasyTransferAmountInCoin: utils_1.numberToFixed(totalEasyTransferAmountInCoin),
                                    easyTransferFeeInCurrency: easyTransferFeeInCurrency,
                                    totalEasyTransferAmountInCurrency: totalEasyTransferAmountInCurrency,
                                    easyTransferFeeInPercent: easyTransferFeeInPercent,
                                    orderId: outgoingOrderId,
                                    validDate: validDate,
                                    easyTransferExpireTime: Number(easyTransferExpireTime) / 1000,
                                }
                            }];
                    case 6:
                        _e = _f.sent();
                        message = _e.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
    acceptEasyTransferOrder: function (root, _a, _b) {
        var orderId = _a.orderId;
        var injector = _b.injector, user = _b.user, UserModel = _b.UserModel, OutgoingTransactionModel = _b.OutgoingTransactionModel, IncomingTransactionModel = _b.IncomingTransactionModel, HistoryMetaModel = _b.HistoryMetaModel, botUrl = _b.botUrl;
        return __awaiter(this, void 0, void 0, function () {
            var query, order, outgoingAmount, outgoingAmountWithFee, coinType, toAccount, outgoingAmountUSD, userCoinBalance, _c, minTransactionValue, maxTransactionValue, isValidAmount, code, receiver, incomingOrderId, inTransaction, error_3;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 9, , 10]);
                        query = { orderId: orderId, userId: user.uuid, status: types_1.TransactionStatus.Pending, validDate: { $gte: Date.now() } };
                        return [4 /*yield*/, OutgoingTransactionModel.findOne(query)];
                    case 1:
                        order = _f.sent();
                        if (lodash_1.isEmpty(order))
                            return [2 /*return*/, { error: utils_1.OrderNotfound, code: 404, success: false }];
                        outgoingAmount = order.outgoingAmount, outgoingAmountWithFee = order.outgoingAmountWithFee, coinType = order.coinType, toAccount = order.toAccount, outgoingAmountUSD = order.outgoingAmountUSD;
                        userCoinBalance = user.balance[coinType];
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).getMinAndMaxTransactionValue(coinType)];
                    case 2:
                        _c = _f.sent(), minTransactionValue = _c.minTransactionValue, maxTransactionValue = _c.maxTransactionValue;
                        isValidAmount = utils_1.isValidTransferAmount({
                            minTransactionValue: minTransactionValue,
                            maxTransactionValue: maxTransactionValue,
                            amountInCoin: outgoingAmount,
                            totalAmountInCoin: outgoingAmountWithFee,
                            userCoinBalance: userCoinBalance,
                        });
                        code = isValidAmount.code;
                        if (code !== 200)
                            return [2 /*return*/, isValidAmount];
                        return [4 /*yield*/, UserModel.updateOne({ _id: user._id }, { $inc: (_d = {}, _d["balance." + coinType] = -outgoingAmountWithFee, _d) })];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, UserModel.findOneAndUpdate({ accountId: toAccount }, { $inc: (_e = {}, _e["balance." + coinType] = outgoingAmount, _e) }, { new: true })];
                    case 4:
                        receiver = _f.sent();
                        return [4 /*yield*/, OutgoingTransactionModel.updateOne({ orderId: orderId }, { status: types_1.TransactionStatus.Completed })];
                    case 5:
                        _f.sent();
                        incomingOrderId = utils_1.getCustomId({ fixAlphabet: 'TT', length: 7 });
                        return [4 /*yield*/, IncomingTransactionModel.create({
                                userId: receiver.uuid,
                                amount: outgoingAmount,
                                amountUSD: outgoingAmountUSD,
                                coinType: coinType,
                                method: types_1.IncomingTransactionMethod.EasyTransfer,
                                fromAccount: user.accountId,
                                status: types_1.TransactionStatus.Completed,
                                orderId: incomingOrderId,
                                txId: utils_1.getCustomId({ fixAlphabet: 'FAKE', length: 7 })
                            })];
                    case 6:
                        inTransaction = _f.sent();
                        return [4 /*yield*/, HistoryMetaModel.create({ transactionId: inTransaction._id, userId: receiver.uuid, transactionType: types_1.HistoryTransactionType.In })];
                    case 7:
                        _f.sent();
                        return [4 /*yield*/, injector.get(core_1.NamespaceEntityProvider).sendMessage('POST', {
                                orderId: incomingOrderId,
                                transactionDirection: types_1.NetworkRulesEnum.In,
                                transactionType: types_1.IncomingTransactionMethod.EasyTransfer,
                                userAccountId: user.accountId,
                                userNickName: user.nickName,
                                telegramId: receiver.telegramId,
                                incomingAmount: outgoingAmount,
                                incomingAmountUSD: outgoingAmountUSD,
                                locale: receiver.language,
                                coin: coinType
                            }, botUrl + "/incomingTransaction")];
                    case 8:
                        _f.sent();
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 9:
                        error_3 = _f.sent();
                        throw new apollo_server_core_1.ApolloError(error_3.message);
                    case 10: return [2 /*return*/];
                }
            });
        });
    },
    receiveCoins: function (root, _a, _b) {
        var address = _a.address, total = _a.total, transactionId = _a.transactionId, hash = _a.hash;
        var UserModel = _b.UserModel, ReceivingAddressModel = _b.ReceivingAddressModel, HistoryMetaModel = _b.HistoryMetaModel, IncomingTransactionModel = _b.IncomingTransactionModel, injector = _b.injector, botUrl = _b.botUrl;
        return __awaiter(this, void 0, void 0, function () {
            var addressInfo, userId, amount, currency, uniqueTransactionId, amountUSD, incomingOrderId, inTransaction, _c, telegramId, nickName, language, transaction_url, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, ReceivingAddressModel.findOne({ address: address, status: types_1.ReceivingAddressStatus.Active })];
                    case 1:
                        addressInfo = _d.sent();
                        if (lodash_1.isEmpty(addressInfo))
                            return [2 /*return*/, { success: false, code: 404, error: utils_1.AddressNotExists }];
                        userId = addressInfo.userId;
                        amount = total.amount, currency = total.currency;
                        return [4 /*yield*/, IncomingTransactionModel.findOne({ txId: transactionId })];
                    case 2:
                        uniqueTransactionId = _d.sent();
                        if (!lodash_1.isEmpty(uniqueTransactionId))
                            return [2 /*return*/, { success: false, code: 404, error: utils_1.AddressAlreadyExists }];
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(Number(amount), currency, types_1.CurrencyType.Usd)];
                    case 3:
                        amountUSD = _d.sent();
                        incomingOrderId = utils_1.getCustomId({ fixAlphabet: 'IN', length: 7 });
                        return [4 /*yield*/, IncomingTransactionModel.create({
                                userId: userId,
                                address: address,
                                txId: transactionId,
                                amount: amount,
                                hash: hash,
                                coinType: currency,
                                status: types_1.TransactionStatus.Pending,
                                orderId: incomingOrderId,
                                amountUSD: amountUSD,
                            })];
                    case 4:
                        inTransaction = _d.sent();
                        return [4 /*yield*/, ReceivingAddressModel.updateOne({ address: address }, { status: types_1.ReceivingAddressStatus.Expired, $push: { addressHistory: hash } })];
                    case 5:
                        _d.sent();
                        return [4 /*yield*/, UserModel.findOne({ uuid: userId })];
                    case 6:
                        _c = _d.sent(), telegramId = _c.telegramId, nickName = _c.nickName, language = _c.language;
                        return [4 /*yield*/, HistoryMetaModel.create({ transactionId: inTransaction._id, userId: userId, transactionType: types_1.HistoryTransactionType.In })];
                    case 7:
                        _d.sent();
                        transaction_url = injector.get(core_1.DefaultEnvProvider).TRANSACTION_URL;
                        return [4 /*yield*/, injector.get(core_1.NamespaceEntityProvider).sendMessage('POST', {
                                orderId: incomingOrderId,
                                transactionDirection: types_1.NetworkRulesEnum.In,
                                transactionType: types_1.IncomingTransactionMethod.Payment,
                                userAccountId: '',
                                userNickName: '',
                                telegramId: telegramId,
                                incomingAmount: amount,
                                locale: language,
                                incomingAmountUSD: amountUSD,
                                coin: currency,
                                transactionURL: transaction_url + "/" + currency + "/" + hash
                            }, botUrl + "/incomingPendingTransaction")];
                    case 8:
                        _d.sent();
                        return [2 /*return*/, { success: true, code: 200, error: '' }];
                    case 9:
                        error_4 = _d.sent();
                        throw new apollo_server_core_1.ApolloError(error_4.message);
                    case 10: return [2 /*return*/];
                }
            });
        });
    },
    cancelEasyTransfer: function (root, _a, _b) {
        var orderId = _a.orderId;
        var OutgoingTransactionModel = _b.OutgoingTransactionModel;
        return __awaiter(this, void 0, void 0, function () {
            var outgoingTransaction, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, OutgoingTransactionModel.findOne({ orderId: orderId, method: types_1.OutgoingTransactionMethod.EasyTransfer, status: types_1.TransactionStatus.Pending })];
                    case 1:
                        outgoingTransaction = _c.sent();
                        if (lodash_1.isEmpty(outgoingTransaction))
                            return [2 /*return*/, { error: utils_1.OutgoingTransactionNotFound, code: 404, success: false }];
                        return [4 /*yield*/, OutgoingTransactionModel.updateOne({ orderId: orderId }, { status: types_1.TransactionStatus.Canceled })];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 3:
                        error_5 = _c.sent();
                        throw new apollo_server_core_1.ApolloError(error_5.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    cancelWithdraw: function (root, _a, _b) {
        var orderId = _a.orderId;
        var OutgoingTransactionModel = _b.OutgoingTransactionModel;
        return __awaiter(this, void 0, void 0, function () {
            var outgoingTransaction, _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, OutgoingTransactionModel.findOne({ orderId: orderId, method: types_1.OutgoingTransactionMethod.Withdraw, status: types_1.TransactionStatus.Pending })];
                    case 1:
                        outgoingTransaction = _d.sent();
                        if (lodash_1.isEmpty(outgoingTransaction))
                            return [2 /*return*/, { error: utils_1.TransactionNotFound, code: 404, success: false }];
                        return [4 /*yield*/, OutgoingTransactionModel.updateOne({ orderId: orderId }, { status: types_1.TransactionStatus.Canceled })];
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
};
//# sourceMappingURL=finance.mutation.js.map