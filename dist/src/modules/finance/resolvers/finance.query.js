"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
var nanoid_1 = require("nanoid");
var multicoin_address_validator_1 = __importDefault(require("multicoin-address-validator"));
var lodash_1 = require("lodash");
var types_1 = require("@spot_wallet/types");
var core_1 = require("@spot_wallet/core");
var apollo_server_core_1 = require("apollo-server-core");
var utils_1 = require("@spot_wallet/utils");
var providers_1 = require("../providers");
// TODO fix queries
exports.Query = {
    getUsdAmount: function (root, _a, _b) {
        var btcAmount = _a.btcAmount, _c = _a.toFixed, toFixed = _c === void 0 ? 1 : _c;
        var injector = _b.injector;
        return __awaiter(this, void 0, void 0, function () {
            var exchangeRates, message;
            return __generator(this, function (_d) {
                try {
                    exchangeRates = { USD: 0 };
                    return [2 /*return*/, {
                            value: utils_1.numberToFixed(btcAmount * exchangeRates.USD, toFixed)
                        }];
                }
                catch (_e) {
                    message = _e.message;
                    throw new apollo_server_core_1.ApolloError(message);
                }
                return [2 /*return*/];
            });
        });
    },
    getOrderId: function (_a, _b) {
        return __awaiter(this, void 0, void 0, function () {
            var letters, numbers, message;
            return __generator(this, function (_c) {
                try {
                    letters = nanoid_1.customAlphabet('AXFHMNZK', 2);
                    numbers = nanoid_1.customAlphabet('123456789', 6);
                    return [2 /*return*/, {
                            id: letters().concat(numbers())
                        }];
                }
                catch (_d) {
                    message = _d.message;
                    throw new apollo_server_core_1.ApolloError(message);
                }
                return [2 /*return*/];
            });
        });
    },
    getIncomingTransactions: function (root, _a, _b) {
        var IncomingTransactionModel = _b.IncomingTransactionModel, user = _b.user;
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_c) {
                try {
                    return [2 /*return*/, IncomingTransactionModel.find({ userId: user.uuid })
                            .sort({ createdAt: -1 })
                            .limit(10)];
                }
                catch (_d) {
                    message = _d.message;
                    throw new apollo_server_core_1.ApolloError(message);
                }
                return [2 /*return*/];
            });
        });
    },
    getOutgoingTransactions: function (root, _a, _b) {
        var OutgoingTransactionModel = _b.OutgoingTransactionModel, user = _b.user;
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_c) {
                try {
                    return [2 /*return*/, OutgoingTransactionModel.find({ userId: user.uuid })
                            .sort({ createdAt: -1 })
                            .limit(10)];
                }
                catch (_d) {
                    message = _d.message;
                    throw new apollo_server_core_1.ApolloError(message);
                }
                return [2 /*return*/];
            });
        });
    },
    validateCoinAddress: function (root, _a, _b) {
        var coinAddress = _a.coinAddress, coinType = _a.coinType, _c = _a.externalCall, externalCall = _c === void 0 ? true : _c;
        var ReceivingAddressModel = _b.ReceivingAddressModel, user = _b.user, injector = _b.injector;
        return __awaiter(this, void 0, void 0, function () {
            var uuid, userAddress, valid;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        uuid = user.uuid;
                        return [4 /*yield*/, ReceivingAddressModel.findOne({ userId: uuid, address: coinAddress })];
                    case 1:
                        userAddress = _d.sent();
                        if (!lodash_1.isEmpty(userAddress))
                            return [2 /*return*/, { error: '', code: 409, success: false }];
                        valid = multicoin_address_validator_1.default.validate(coinAddress, coinType);
                        if (!valid)
                            return [2 /*return*/, { error: '', code: 400, success: valid }];
                        if (!externalCall) return [3 /*break*/, 3];
                        return [4 /*yield*/, injector.get(providers_1.FinanceProvider).setExternalReceivers(coinAddress, coinType, user.uuid)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3: return [2 /*return*/, { error: '', code: 200, success: valid }];
                }
            });
        });
    },
    getWithdrawTransactionFee: function (root, _a, _b) {
        var injector = _b.injector, TechnicalModel = _b.TechnicalModel;
        return __awaiter(this, void 0, void 0, function () {
            var technicalDetails, withdrawFees, minTransactionUSD, sortedFees, newWithdrawFees;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, TechnicalModel.findOne()];
                    case 1:
                        technicalDetails = _c.sent();
                        withdrawFees = technicalDetails.fees.withdrawFees, minTransactionUSD = technicalDetails.minTransactionUSD;
                        sortedFees = lodash_1.sortBy(withdrawFees, ['amountUSD']);
                        newWithdrawFees = lodash_1.map(sortedFees, function (withdrawFee) {
                            var fee = withdrawFee.fee, feeUSD = withdrawFee.feeUSD, amountUSD = withdrawFee.amountUSD;
                            var feeInPercent = utils_1.numberToFixed(fee * 100, 1);
                            return {
                                from: !amountUSD ? minTransactionUSD.toFixed(1) : amountUSD.toFixed(1),
                                feeInPercent: feeInPercent,
                                feeInUSD: feeUSD
                            };
                        });
                        return [2 /*return*/, newWithdrawFees.map(function (fee, index) {
                                var _a, _b;
                                return (__assign(__assign({}, fee), { to: ((_a = newWithdrawFees[index + 1]) === null || _a === void 0 ? void 0 : _a.from) ? (+((_b = newWithdrawFees[index + 1]) === null || _b === void 0 ? void 0 : _b.from) - 1).toString() : '♾' }));
                            })];
                }
            });
        });
    },
    getEasyTransferFee: function (root, _a, _b) {
        var injector = _b.injector, TechnicalModel = _b.TechnicalModel;
        return __awaiter(this, void 0, void 0, function () {
            var technicalDetails, easyTransferFees, minTransactionUSD_1, sortedFees, newEasyTransferFees_1, errr_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, TechnicalModel.findOne()];
                    case 1:
                        technicalDetails = _c.sent();
                        easyTransferFees = technicalDetails.fees.easyTransferFees, minTransactionUSD_1 = technicalDetails.minTransactionUSD;
                        sortedFees = lodash_1.sortBy(easyTransferFees, ['amountUSD']);
                        newEasyTransferFees_1 = lodash_1.map(sortedFees, function (easyTransferFee) {
                            var fee = easyTransferFee.fee, feeUSD = easyTransferFee.feeUSD, amountUSD = easyTransferFee.amountUSD;
                            var feeInPercent = utils_1.numberToFixed(fee * 100, 1);
                            return {
                                from: !amountUSD ? minTransactionUSD_1.toString() : amountUSD.toFixed(1),
                                feeInPercent: feeInPercent,
                                feeInUSD: feeUSD
                            };
                        });
                        return [2 /*return*/, newEasyTransferFees_1.map(function (fee, index) {
                                var _a, _b;
                                return (__assign(__assign({}, fee), { to: ((_a = newEasyTransferFees_1[index + 1]) === null || _a === void 0 ? void 0 : _a.from) ? (+((_b = newEasyTransferFees_1[index + 1]) === null || _b === void 0 ? void 0 : _b.from) - 1).toString() : '♾' }));
                            })];
                    case 2:
                        errr_1 = _c.sent();
                        console.log(errr_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    validateTransferAmount: function (root, _a, _b) {
        var amountInCoin = _a.amountInCoin, totalAmountInCoin = _a.totalAmountInCoin, coin = _a.coin;
        var user = _b.user, injector = _b.injector;
        return __awaiter(this, void 0, void 0, function () {
            var userCoinBalance, _c, minTransactionValue, maxTransactionValue, isValidAmount, _d, message;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        userCoinBalance = user.balance[coin];
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).getMinAndMaxTransactionValue(coin)];
                    case 1:
                        _c = _e.sent(), minTransactionValue = _c.minTransactionValue, maxTransactionValue = _c.maxTransactionValue;
                        isValidAmount = utils_1.isValidTransferAmount({
                            minTransactionValue: minTransactionValue,
                            maxTransactionValue: maxTransactionValue,
                            amountInCoin: amountInCoin,
                            totalAmountInCoin: totalAmountInCoin,
                            userCoinBalance: userCoinBalance,
                        });
                        return [2 /*return*/, { valid: isValidAmount }];
                    case 2:
                        _d = _e.sent();
                        message = _d.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    validatePhoneNumber: function (root, _a, _b) {
        var phoneNumber = _a.phoneNumber;
        var UserModel = _b.UserModel;
        return __awaiter(this, void 0, void 0, function () {
            var checkRegexp, phoneNumberWithoutSymbols, existedNumber, _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        checkRegexp = /^374\d{8}$/gm;
                        phoneNumberWithoutSymbols = phoneNumber.replace(/[\W]/gm, '');
                        if (!checkRegexp.test(phoneNumberWithoutSymbols)) {
                            return [2 /*return*/, {
                                    error: '',
                                    code: 400,
                                    success: false
                                }];
                        }
                        return [4 /*yield*/, UserModel.findOne({ phoneNumber: phoneNumberWithoutSymbols })];
                    case 1:
                        existedNumber = _d.sent();
                        if (existedNumber) {
                            return [2 /*return*/, {
                                    error: '',
                                    code: 409,
                                    success: false
                                }];
                        }
                        return [2 /*return*/, {
                                error: '',
                                code: 200,
                                success: true,
                                phoneNumber: phoneNumberWithoutSymbols
                            }];
                    case 2:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    validateDigits: function (root, _a, _b) {
        var phoneNumber = _a.phoneNumber;
        return __awaiter(this, void 0, void 0, function () {
            var checkRegexp, phoneNumberWithoutSymbols, message;
            return __generator(this, function (_c) {
                try {
                    checkRegexp = /^\d{1,20}$/gm;
                    phoneNumberWithoutSymbols = phoneNumber.replace(/[\W]/gm, '');
                    if (!checkRegexp.test(phoneNumberWithoutSymbols)) {
                        return [2 /*return*/, {
                                error: '',
                                code: 400,
                                success: false
                            }];
                    }
                    return [2 /*return*/, {
                            error: '',
                            code: 200,
                            success: true,
                            phoneNumber: phoneNumberWithoutSymbols
                        }];
                }
                catch (_d) {
                    message = _d.message;
                    throw new apollo_server_core_1.ApolloError(message);
                }
                return [2 /*return*/];
            });
        });
    },
    validateName: function (root, _a, _b) {
        var name = _a.name;
        var UserModel = _b.UserModel;
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, checkRegexp, _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel.findOne({ nickName: new RegExp("^" + name + "$", 'i') })];
                    case 1:
                        existingUser = _d.sent();
                        if (existingUser)
                            return [2 /*return*/, { error: '', code: 409, success: false }];
                        checkRegexp = /[^A-Za-z0-9]+/gm;
                        if ((name === null || name === void 0 ? void 0 : name.length) < 3 || (name === null || name === void 0 ? void 0 : name.length) > 30 || checkRegexp.test(name))
                            return [2 /*return*/, {
                                    error: '',
                                    code: 400,
                                    success: false
                                }];
                        return [2 /*return*/, {
                                error: '',
                                code: 200,
                                success: true
                            }];
                    case 2:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    getMinAndMaxTransactionValue: function (root, _a, _b) {
        var coinType = _a.coinType, currency = _a.currency;
        var injector = _b.injector, TechnicalModel = _b.TechnicalModel;
        return __awaiter(this, void 0, void 0, function () {
            var technicalDetails, minTransactionUSD, maxTransactionUSD, minTransactionValueInCoin, maxTransactionValueInCoin, minTransactionValueInCurrency, maxTransactionValueInCurrency, minTransactionValue, maxTransactionValue, _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 7, , 8]);
                        if (!coinType && !currency)
                            throw new apollo_server_core_1.ApolloError(utils_1.CurrencyOrCoinTypeShouldExistError);
                        return [4 /*yield*/, TechnicalModel.findOne()];
                    case 1:
                        technicalDetails = _d.sent();
                        minTransactionUSD = technicalDetails.minTransactionUSD, maxTransactionUSD = technicalDetails.maxTransactionUSD;
                        minTransactionValueInCoin = void 0;
                        maxTransactionValueInCoin = void 0;
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(minTransactionUSD, types_1.CurrencyType.Usd, currency)];
                    case 2:
                        minTransactionValueInCurrency = _d.sent();
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(maxTransactionUSD, types_1.CurrencyType.Usd, currency)];
                    case 3:
                        maxTransactionValueInCurrency = _d.sent();
                        minTransactionValue = currency === types_1.CurrencyType.Usd ? minTransactionUSD : minTransactionValueInCurrency;
                        maxTransactionValue = currency === types_1.CurrencyType.Usd ? maxTransactionUSD : maxTransactionValueInCurrency;
                        if (!coinType) return [3 /*break*/, 6];
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(minTransactionUSD, types_1.CurrencyType.Usd, coinType)];
                    case 4:
                        minTransactionValueInCoin = _d.sent();
                        return [4 /*yield*/, injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(maxTransactionUSD, types_1.CurrencyType.Usd, coinType)];
                    case 5:
                        maxTransactionValueInCoin = _d.sent();
                        _d.label = 6;
                    case 6: return [2 /*return*/, __assign(__assign({ minTransactionValue: minTransactionValue,
                            maxTransactionValue: maxTransactionValue }, (coinType && { minTransactionValueInCoin: minTransactionValueInCoin })), (coinType && { maxTransactionValueInCoin: maxTransactionValueInCoin }))];
                    case 7:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 8: return [2 /*return*/];
                }
            });
        });
    },
    getHistory: function (root, _a, _b) {
        var skip = _a.skip, limit = _a.limit;
        var OutgoingTransactionModel = _b.OutgoingTransactionModel, IncomingTransactionModel = _b.IncomingTransactionModel, HistoryMetaModel = _b.HistoryMetaModel, UserModel = _b.UserModel, user = _b.user;
        return __awaiter(this, void 0, void 0, function () {
            var history_1, historyMeta, outQuery, inQuery, outgoingTransactions, incomingTransactions, _c, message;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        history_1 = [];
                        return [4 /*yield*/, HistoryMetaModel.find({ userId: user.uuid, transactionStatus: { $nin: [types_1.TransactionStatus.Canceled, types_1.TransactionStatus.SystemCanceled] } })
                                .sort({ createdAt: -1 })
                                .skip(skip)
                                .limit(limit)];
                    case 1:
                        historyMeta = _d.sent();
                        outQuery = { _id: { $in: lodash_1.map(lodash_1.groupBy(historyMeta, 'transactionType')[types_1.HistoryTransactionType.Out], 'transactionId') } };
                        inQuery = { _id: { $in: lodash_1.map(lodash_1.groupBy(historyMeta, 'transactionType')[types_1.HistoryTransactionType.In], 'transactionId') } };
                        return [4 /*yield*/, OutgoingTransactionModel.find(outQuery)];
                    case 2:
                        outgoingTransactions = _d.sent();
                        return [4 /*yield*/, IncomingTransactionModel.find(inQuery)];
                    case 3:
                        incomingTransactions = _d.sent();
                        return [4 /*yield*/, Promise.all(lodash_1.map(outgoingTransactions, function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, createdAt, orderId, transactionType, method, outgoingAmount, outgoingAmountWithFee, outgoingAmountUSD, outgoingAmountWithFeeUSD, receiverAddress, toAccount, outgoingTransactionFeeInPercent, coinType, receiverAccount, _b, receiverInfo;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _a = transaction.toObject(), createdAt = _a.createdAt, orderId = _a.orderId, transactionType = _a.transactionType, method = _a.method, outgoingAmount = _a.outgoingAmount, outgoingAmountWithFee = _a.outgoingAmountWithFee, outgoingAmountUSD = _a.outgoingAmountUSD, outgoingAmountWithFeeUSD = _a.outgoingAmountWithFeeUSD, receiverAddress = _a.receiverAddress, toAccount = _a.toAccount, outgoingTransactionFeeInPercent = _a.outgoingTransactionFeeInPercent, coinType = _a.coinType;
                                            if (!toAccount) return [3 /*break*/, 2];
                                            return [4 /*yield*/, UserModel.findOne({ accountId: toAccount })];
                                        case 1:
                                            _b = _c.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            _b = null;
                                            _c.label = 3;
                                        case 3:
                                            receiverAccount = _b;
                                            receiverInfo = receiverAccount
                                                ? { nickName: receiverAccount.nickName, address: receiverAccount.accountId }
                                                : { nickName: '', address: receiverAddress };
                                            history_1.push({
                                                createdAt: createdAt,
                                                orderId: orderId,
                                                transactionType: transactionType,
                                                method: method,
                                                amount: outgoingAmount,
                                                amountUSD: outgoingAmountUSD,
                                                feeUSD: utils_1.numberToFixed(outgoingAmountWithFeeUSD - outgoingAmountUSD, 1),
                                                feeCoin: utils_1.numberToFixed(outgoingAmountWithFee) - outgoingAmount,
                                                sender: {
                                                    nickName: user.nickName,
                                                    address: user.accountId
                                                },
                                                receiver: receiverInfo,
                                                status: transaction.status,
                                                coinType: coinType,
                                                outgoingTransactionFeeInPercent: outgoingTransactionFeeInPercent
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, Promise.all(lodash_1.map(incomingTransactions, function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, createdAt, orderId, transactionType, method, amount, amountUSD, address, fromAccount, coinType, fromUser, _b, senderInfo;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _a = transaction.toObject(), createdAt = _a.createdAt, orderId = _a.orderId, transactionType = _a.transactionType, method = _a.method, amount = _a.amount, amountUSD = _a.amountUSD, address = _a.address, fromAccount = _a.fromAccount, coinType = _a.coinType;
                                            if (!fromAccount) return [3 /*break*/, 2];
                                            return [4 /*yield*/, UserModel.findOne({ accountId: fromAccount })];
                                        case 1:
                                            _b = _c.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            _b = null;
                                            _c.label = 3;
                                        case 3:
                                            fromUser = _b;
                                            senderInfo = fromUser ? { nickName: fromUser.nickName, address: fromUser.accountId } : { nickName: '', address: '' };
                                            history_1.push({
                                                createdAt: createdAt,
                                                orderId: orderId,
                                                transactionType: transactionType,
                                                method: method,
                                                amount: amount,
                                                coinType: coinType,
                                                amountUSD: amountUSD,
                                                sender: senderInfo,
                                                receiver: {
                                                    nickName: user.nickName,
                                                    address: user.accountId
                                                },
                                                status: transaction.status
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 5:
                        _d.sent();
                        return [2 /*return*/, lodash_1.orderBy(history_1, ['createdAt'], ['desc'])];
                    case 6:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
    getNewReceivingAddress: function (root, _a, _b) {
        var coinType = _a.coinType;
        var ReceivingAddressModel = _b.ReceivingAddressModel, user = _b.user, injector = _b.injector;
        return __awaiter(this, void 0, void 0, function () {
            var uuid, coinAddress, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        uuid = user.uuid;
                        return [4 /*yield*/, injector.get(core_1.CoinbaseProvider).createWalletAddress(coinType)];
                    case 1:
                        coinAddress = _c.sent();
                        return [4 /*yield*/, ReceivingAddressModel.create({
                                userId: uuid,
                                address: coinAddress,
                                coinType: coinType,
                            })];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, coinAddress];
                    case 3:
                        error_1 = _c.sent();
                        throw new apollo_server_core_1.ApolloError(error_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    isAddressInternal: function (root, _a, _b) {
        var address = _a.address, coinType = _a.coinType;
        var injector = _b.injector;
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_c) {
                try {
                    return [2 /*return*/, injector.get(providers_1.FinanceProvider).isInternalAddress(address, coinType)];
                }
                catch (_d) {
                    message = _d.message;
                    throw new apollo_server_core_1.ApolloError(message);
                }
                return [2 /*return*/];
            });
        });
    },
};
//# sourceMappingURL=finance.query.js.map