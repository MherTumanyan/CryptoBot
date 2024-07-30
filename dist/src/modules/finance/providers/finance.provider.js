"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceProvider = void 0;
var di_1 = require("@graphql-modules/di");
var lodash_1 = require("lodash");
var core_1 = require("@spot_wallet/core");
var utils_1 = require("@spot_wallet/utils");
var apollo_server_core_1 = require("apollo-server-core");
var FinanceProvider = /** @class */ (function (_super) {
    __extends(FinanceProvider, _super);
    function FinanceProvider(nsp, envProvider, coinbaseProvider, exchangeCurrencyRateProvider) {
        var _this = _super.call(this, 'FinanceProvider') || this;
        _this.nsp = nsp;
        _this.envProvider = envProvider;
        _this.coinbaseProvider = coinbaseProvider;
        _this.exchangeCurrencyRateProvider = exchangeCurrencyRateProvider;
        return _this;
    }
    FinanceProvider.prototype.initializer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('FinanceProvider onInit - STARTED');
                        return [4 /*yield*/, this.nsp.onInit()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.exchangeCurrencyRateProvider.onInit()];
                    case 2:
                        _a.sent();
                        this.envProvider.onInit();
                        return [4 /*yield*/, this.exchangeCurrencyRateProvider.onInit()];
                    case 3:
                        _a.sent();
                        console.log('FinanceProvider onInit - END');
                        return [2 /*return*/];
                }
            });
        });
    };
    FinanceProvider.prototype.getWithdrawFeeByCoin = function (coinAddress, coinType, amountInCoin) {
        return __awaiter(this, void 0, void 0, function () {
            var networkFee, TechnicalModel, technicalDetails, fixWithdrawFee, withdrawFeeCoin, fixWithdrawFeeInCoin, withdrawFeeCoinUSD, _a, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.coinbaseProvider.getNetworkFees(coinType, coinAddress)];
                    case 1:
                        networkFee = (_b.sent()).fee;
                        TechnicalModel = this.nsp.getEntityModel(core_1.EntityEnum.TECHNICAL);
                        return [4 /*yield*/, TechnicalModel.findOne()];
                    case 2:
                        technicalDetails = _b.sent();
                        fixWithdrawFee = technicalDetails.fees.fixWithdrawFee;
                        withdrawFeeCoin = void 0;
                        if (!fixWithdrawFee.fee) return [3 /*break*/, 3];
                        withdrawFeeCoin = networkFee + (fixWithdrawFee.fee * amountInCoin);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(fixWithdrawFee.feeUSD, core_1.CurrencyType.Usd, coinType)];
                    case 4:
                        fixWithdrawFeeInCoin = _b.sent();
                        withdrawFeeCoin = networkFee + fixWithdrawFeeInCoin;
                        _b.label = 5;
                    case 5: return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(withdrawFeeCoin, coinType, core_1.CurrencyType.Usd)];
                    case 6:
                        withdrawFeeCoinUSD = _b.sent();
                        return [2 /*return*/, {
                                withdrawFeeInitialPercent: fixWithdrawFee.fee * 100,
                                withdrawFeeInitialUSD: fixWithdrawFee.feeUSD,
                                withdrawFeeCoinUSD: withdrawFeeCoinUSD,
                                withdrawFeeCoin: withdrawFeeCoin,
                            }];
                    case 7:
                        _a = _b.sent();
                        message = _a.message;
                        throw new Error(message);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FinanceProvider.prototype.isInternalAddress = function (address, coinType) {
        return __awaiter(this, void 0, void 0, function () {
            var ReceivingAddressModel, isAddressInternal, _a, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        ReceivingAddressModel = this.nsp.getEntityModel(core_1.EntityEnum.RECEIVING_ADDRESS);
                        return [4 /*yield*/, ReceivingAddressModel.findOne({ address: address, coinType: coinType })];
                    case 1:
                        isAddressInternal = _b.sent();
                        return [2 /*return*/, !!isAddressInternal];
                    case 2:
                        _a = _b.sent();
                        message = _a.message;
                        throw new Error(message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO fix return type
    FinanceProvider.prototype.getEasyTransferFeeByCoin = function (outgoingAmount, coinType) {
        return __awaiter(this, void 0, void 0, function () {
            var TechnicalModel, technicalDetails, easyTransferFees, sortedFees, easyTransferFeePercent, easyTransferFeeUSD, sortedFees_1, sortedFees_1_1, el, amountInCoin, e_1_1, easyTransferFeeCoin, easyTransferFeeCoinUSD, _a, message;
            var e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 14, , 15]);
                        TechnicalModel = this.nsp.getEntityModel(core_1.EntityEnum.TECHNICAL);
                        return [4 /*yield*/, TechnicalModel.findOne()];
                    case 1:
                        technicalDetails = _c.sent();
                        easyTransferFees = technicalDetails.fees.easyTransferFees;
                        sortedFees = lodash_1.sortBy(easyTransferFees, ['amountUSD']);
                        easyTransferFeePercent = sortedFees[0].fee;
                        easyTransferFeeUSD = sortedFees[0].feeUSD;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 7, 8, 9]);
                        sortedFees_1 = __values(sortedFees), sortedFees_1_1 = sortedFees_1.next();
                        _c.label = 3;
                    case 3:
                        if (!!sortedFees_1_1.done) return [3 /*break*/, 6];
                        el = sortedFees_1_1.value;
                        if (!el.amountUSD)
                            return [3 /*break*/, 5];
                        return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(el.amountUSD, core_1.CurrencyType.Usd, coinType)];
                    case 4:
                        amountInCoin = _c.sent();
                        if (amountInCoin <= outgoingAmount) {
                            easyTransferFeePercent = el.fee;
                            easyTransferFeeUSD = el.feeUSD;
                        }
                        _c.label = 5;
                    case 5:
                        sortedFees_1_1 = sortedFees_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (sortedFees_1_1 && !sortedFees_1_1.done && (_b = sortedFees_1.return)) _b.call(sortedFees_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        easyTransferFeeCoin = void 0;
                        if (!!!easyTransferFeePercent) return [3 /*break*/, 10];
                        easyTransferFeeCoin = outgoingAmount * easyTransferFeePercent;
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(easyTransferFeeUSD, core_1.CurrencyType.Usd, coinType)];
                    case 11:
                        easyTransferFeeCoin = _c.sent();
                        _c.label = 12;
                    case 12: return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(easyTransferFeeCoin, coinType, core_1.CurrencyType.Usd)];
                    case 13:
                        easyTransferFeeCoinUSD = _c.sent();
                        return [2 /*return*/, {
                                easyTransferFeePercent: easyTransferFeePercent * 100,
                                easyTransferFeeUSD: easyTransferFeeUSD,
                                easyTransferFeeCoinUSD: easyTransferFeeCoinUSD,
                                easyTransferFeeCoin: easyTransferFeeCoin,
                            }];
                    case 14:
                        _a = _c.sent();
                        message = _a.message;
                        throw new Error(message);
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    FinanceProvider.prototype.getEasyTransferOrder = function (amountInCurrency, currency, coinType, userCoinBalance, maxAvailableBalance) {
        if (maxAvailableBalance === void 0) { maxAvailableBalance = false; }
        return __awaiter(this, void 0, void 0, function () {
            var amountInCoin, _a, easyTransferFeePercent, easyTransferFeeUSD, easyTransferFeeCoin, easyTransferFeeCoinUSD, amountInUSD, easyTransferFeeInPercent, easyTransferFeeInCurrency, totalEasyTransferAmountInCoin, totalEasyTransferAmountInCurrency, totalEasyTransferAmountInUsd, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        amountInCoin = void 0;
                        if (!maxAvailableBalance) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getEasyTransferMaxAvailableBalance(userCoinBalance, coinType)];
                    case 1:
                        amountInCoin = _b.sent();
                        return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(amountInCoin, coinType, core_1.CurrencyType.Usd)];
                    case 2:
                        amountInCurrency = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(amountInCurrency, currency, coinType)];
                    case 4:
                        amountInCoin = _b.sent();
                        _b.label = 5;
                    case 5: return [4 /*yield*/, this.getEasyTransferFeeByCoin(amountInCoin, coinType)];
                    case 6:
                        _a = _b.sent(), easyTransferFeePercent = _a.easyTransferFeePercent, easyTransferFeeUSD = _a.easyTransferFeeUSD, easyTransferFeeCoin = _a.easyTransferFeeCoin, easyTransferFeeCoinUSD = _a.easyTransferFeeCoinUSD;
                        amountInUSD = void 0;
                        if (!(currency === core_1.CurrencyType.Usd)) return [3 /*break*/, 7];
                        amountInUSD = amountInCurrency;
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(amountInCoin, coinType, core_1.CurrencyType.Usd)];
                    case 8:
                        amountInUSD = _b.sent();
                        _b.label = 9;
                    case 9:
                        easyTransferFeeInPercent = easyTransferFeePercent || (easyTransferFeeUSD * 100) / +amountInUSD;
                        return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(easyTransferFeeCoin, coinType, currency)];
                    case 10:
                        easyTransferFeeInCurrency = _b.sent();
                        totalEasyTransferAmountInCoin = amountInCoin + easyTransferFeeCoin;
                        totalEasyTransferAmountInCurrency = amountInCurrency + easyTransferFeeInCurrency;
                        totalEasyTransferAmountInUsd = amountInUSD + easyTransferFeeCoinUSD;
                        return [2 /*return*/, {
                                amountInCoin: utils_1.numberToFixed(amountInCoin),
                                amountInUSD: utils_1.numberToFixed(amountInUSD, 1),
                                amountInCurrency: utils_1.numberToFixed(amountInCurrency, 1),
                                easyTransferFeeInitialPercent: easyTransferFeePercent,
                                easyTransferFeeInitialUSD: easyTransferFeeUSD,
                                easyTransferFeeInPercent: utils_1.numberToFixed(easyTransferFeeInPercent, 1),
                                easyTransferFeeCoin: utils_1.numberToFixed(easyTransferFeeCoin),
                                easyTransferFeeInCurrency: utils_1.numberToFixed(easyTransferFeeInCurrency, 1),
                                totalEasyTransferAmountInCoin: totalEasyTransferAmountInCoin,
                                totalEasyTransferAmountInCurrency: utils_1.numberToFixed(totalEasyTransferAmountInCurrency, 1),
                                totalEasyTransferAmountInUsd: utils_1.numberToFixed(totalEasyTransferAmountInUsd, 1),
                            }];
                    case 11:
                        error_1 = _b.sent();
                        throw new apollo_server_core_1.ApolloError(error_1.message);
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    FinanceProvider.prototype.getWithdrawOrder = function (amountInCurrency, currency, coinType, coinAddress, userCoinBalance, maxAvailableBalance) {
        if (maxAvailableBalance === void 0) { maxAvailableBalance = false; }
        return __awaiter(this, void 0, void 0, function () {
            var amountInCoin, amountInUSD, _a, withdrawFeeCoin, withdrawFeeCoinUSD, withdrawFeeInitialPercent, withdrawFeeInPercent, withdrawFeeInCurrency, totalWithdrawAmountInCoin, totalWithdrawAmountInCurrency, totalWithdrawAmountInUsd, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        amountInCoin = void 0;
                        if (!maxAvailableBalance) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getWithdrawMaxAvailableBalance(userCoinBalance, coinType, coinAddress)];
                    case 1:
                        amountInCoin = _b.sent();
                        return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(amountInCoin, coinType, core_1.CurrencyType.Usd)];
                    case 2:
                        amountInCurrency = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(amountInCurrency, currency, coinType)];
                    case 4:
                        amountInCoin = _b.sent();
                        _b.label = 5;
                    case 5:
                        amountInUSD = void 0;
                        if (!(currency === core_1.CurrencyType.Usd)) return [3 /*break*/, 6];
                        amountInUSD = amountInCurrency;
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(amountInCoin, coinType, core_1.CurrencyType.Usd)];
                    case 7:
                        amountInUSD = _b.sent();
                        _b.label = 8;
                    case 8: return [4 /*yield*/, this.getWithdrawFeeByCoin(coinAddress, coinType, amountInCoin)];
                    case 9:
                        _a = _b.sent(), withdrawFeeCoin = _a.withdrawFeeCoin, withdrawFeeCoinUSD = _a.withdrawFeeCoinUSD, withdrawFeeInitialPercent = _a.withdrawFeeInitialPercent;
                        withdrawFeeInPercent = (withdrawFeeCoinUSD * 100) / amountInUSD;
                        return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(withdrawFeeCoin, coinType, currency)];
                    case 10:
                        withdrawFeeInCurrency = _b.sent();
                        totalWithdrawAmountInCoin = amountInCoin + withdrawFeeCoin;
                        totalWithdrawAmountInCurrency = amountInCurrency + withdrawFeeInCurrency;
                        totalWithdrawAmountInUsd = amountInUSD + withdrawFeeCoinUSD;
                        return [2 /*return*/, {
                                amountInCoin: utils_1.numberToFixed(amountInCoin),
                                amountInUSD: utils_1.numberToFixed(amountInUSD, 1),
                                amountInCurrency: utils_1.numberToFixed(amountInCurrency),
                                withdrawFeeInitialPercent: withdrawFeeInitialPercent,
                                withdrawFeeInitialUSD: withdrawFeeCoinUSD,
                                withdrawFeeInPercent: utils_1.numberToFixed(withdrawFeeInPercent, 3),
                                withdrawFeeCoin: utils_1.numberToFixed(withdrawFeeCoin),
                                withdrawFeeInCurrency: utils_1.numberToFixed(withdrawFeeInCurrency, 1),
                                totalWithdrawAmountInCoin: totalWithdrawAmountInCoin,
                                totalWithdrawAmountInCurrency: utils_1.numberToFixed(totalWithdrawAmountInCurrency, 1),
                                totalWithdrawAmountInUsd: utils_1.numberToFixed(totalWithdrawAmountInUsd, 1),
                            }];
                    case 11:
                        error_2 = _b.sent();
                        throw new apollo_server_core_1.ApolloError(error_2.message);
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    FinanceProvider.prototype.getEasyTransferMaxAvailableBalance = function (userCoinBalance, coinType) {
        return __awaiter(this, void 0, void 0, function () {
            var TechnicalModel, technicalDetails, easyTransferFees, sortedFees, amountInUSD, availableBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        TechnicalModel = this.nsp.getEntityModel(core_1.EntityEnum.TECHNICAL);
                        return [4 /*yield*/, TechnicalModel.findOne()];
                    case 1:
                        technicalDetails = _a.sent();
                        easyTransferFees = technicalDetails.fees.easyTransferFees;
                        sortedFees = lodash_1.sortBy(easyTransferFees, ['amountUSD']);
                        return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(userCoinBalance, coinType, core_1.CurrencyType.Usd)];
                    case 2:
                        amountInUSD = _a.sent();
                        return [4 /*yield*/, this.getEasyTransferEstimatedAvailableBalance(sortedFees, amountInUSD, userCoinBalance, coinType)];
                    case 3:
                        availableBalance = _a.sent();
                        return [2 /*return*/, availableBalance];
                }
            });
        });
    };
    FinanceProvider.prototype.getEasyTransferEstimatedAvailableBalance = function (sortedFees, totalBalance, userCoinBalance, coinType, estimatedAvailableBalance) {
        if (estimatedAvailableBalance === void 0) { estimatedAvailableBalance = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, min, max, fee, easyTransferFeeInCoin;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getEasyTransferFeeRange(sortedFees, estimatedAvailableBalance || totalBalance), min = _a.min, max = _a.max, fee = _a.fee;
                        estimatedAvailableBalance = totalBalance - fee;
                        if (!(estimatedAvailableBalance > min && estimatedAvailableBalance <= max && estimatedAvailableBalance <= totalBalance)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(fee, core_1.CurrencyType.Usd, coinType)];
                    case 1:
                        easyTransferFeeInCoin = _b.sent();
                        return [2 /*return*/, userCoinBalance - easyTransferFeeInCoin];
                    case 2: return [4 /*yield*/, this.getEasyTransferEstimatedAvailableBalance(sortedFees, totalBalance, userCoinBalance, coinType, estimatedAvailableBalance)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FinanceProvider.prototype.getEasyTransferFeeRange = function (sortedFees, totalBalance) {
        var newFees = lodash_1.map(sortedFees, function (sortedFee, index) {
            var _a;
            var fee = sortedFee.fee;
            if (!fee && (sortedFee === null || sortedFee === void 0 ? void 0 : sortedFee.feeUSD))
                fee = sortedFee.feeUSD;
            else
                fee = totalBalance * fee;
            return { min: sortedFee.amountUSD, max: ((_a = sortedFees[index + 1]) === null || _a === void 0 ? void 0 : _a.amountUSD) || Infinity, fee: fee };
        });
        return lodash_1.find(newFees, function (fee) { return totalBalance > fee.min && totalBalance <= fee.max; });
    };
    FinanceProvider.prototype.getWithdrawMaxAvailableBalance = function (userCoinBalance, coinType, coinAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var TechnicalModel, networkFee, technicalDetails, fixWithdrawFee, withdrawFeeCoin, fixWithdrawFeeInCoin, availableBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        TechnicalModel = this.nsp.getEntityModel(core_1.EntityEnum.TECHNICAL);
                        return [4 /*yield*/, this.coinbaseProvider.getNetworkFees(coinType, coinAddress)];
                    case 1:
                        networkFee = (_a.sent()).fee;
                        return [4 /*yield*/, TechnicalModel.findOne()];
                    case 2:
                        technicalDetails = _a.sent();
                        fixWithdrawFee = technicalDetails.fees.fixWithdrawFee;
                        if (!fixWithdrawFee.fee) return [3 /*break*/, 3];
                        withdrawFeeCoin = networkFee + (fixWithdrawFee.fee * userCoinBalance);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.exchangeCurrencyRateProvider.convertCurrency(fixWithdrawFee.feeUSD, core_1.CurrencyType.Usd, coinType)];
                    case 4:
                        fixWithdrawFeeInCoin = _a.sent();
                        withdrawFeeCoin = networkFee + fixWithdrawFeeInCoin;
                        _a.label = 5;
                    case 5:
                        availableBalance = userCoinBalance - withdrawFeeCoin;
                        return [2 /*return*/, availableBalance];
                }
            });
        });
    };
    FinanceProvider.prototype.setExternalReceivers = function (coinAddress, coinType, ownerId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var TechnicalModel, SuggestedReceiversModel, suggestedReceiversCount, suggestedReceivers, externalByCoin, _b, message;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 7, , 8]);
                        TechnicalModel = this.nsp.getEntityModel(core_1.EntityEnum.TECHNICAL);
                        SuggestedReceiversModel = this.nsp.getEntityModel(core_1.EntityEnum.SUGGESTED_RECEIVERS);
                        return [4 /*yield*/, TechnicalModel.findOne({})];
                    case 1:
                        suggestedReceiversCount = (_e.sent()).suggestedReceiversCount;
                        return [4 /*yield*/, SuggestedReceiversModel.findOne({ ownerId: ownerId })];
                    case 2:
                        suggestedReceivers = (_a = (_e.sent())) === null || _a === void 0 ? void 0 : _a.toObject();
                        if (!!lodash_1.isEmpty(suggestedReceivers)) return [3 /*break*/, 4];
                        externalByCoin = suggestedReceivers.external[coinType].filter(function (receiver) { return receiver !== coinAddress; });
                        externalByCoin.unshift(coinAddress);
                        if (externalByCoin.length > suggestedReceiversCount)
                            externalByCoin.pop();
                        return [4 /*yield*/, SuggestedReceiversModel.updateOne({ ownerId: ownerId }, (_c = {}, _c["external." + coinType] = externalByCoin, _c))];
                    case 3:
                        _e.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, SuggestedReceiversModel.create({ ownerId: ownerId, external: (_d = {}, _d[coinType] = [coinAddress], _d) })];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        _b = _e.sent();
                        message = _b.message;
                        throw new Error(message);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FinanceProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Application
        }),
        __metadata("design:paramtypes", [core_1.NamespaceEntityProvider,
            core_1.DefaultEnvProvider,
            core_1.CoinbaseProvider,
            core_1.ExchangeCurrencyRateProvider])
    ], FinanceProvider);
    return FinanceProvider;
}(core_1.AsyncInitProvider));
exports.FinanceProvider = FinanceProvider;
//# sourceMappingURL=finance.provider.js.map