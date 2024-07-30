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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
var apollo_server_core_1 = require("apollo-server-core");
var lodash_1 = require("lodash");
var core_1 = require("@spot_wallet/core");
var types_1 = require("@spot_wallet/types");
var utils_1 = require("../utils");
var utils_2 = require("@spot_wallet/utils");
var providers_1 = require("../providers");
exports.Query = {
    getUserInfo: function (root, _a, _b) {
        var user = _b.user, injector = _b.injector;
        return __awaiter(this, void 0, void 0, function () {
            var _c, USDT, BTC, ETH, DASH, balance, balanceUSD;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(user.balance.USDT, types_1.CoinType.Usdt, types_1.CurrencyType.Usd),
                            injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(user.balance.BTC, types_1.CoinType.Btc, types_1.CurrencyType.Usd),
                            injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(user.balance.ETH, types_1.CoinType.Eth, types_1.CurrencyType.Usd),
                            injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(user.balance.DASH, types_1.CoinType.Dash, types_1.CurrencyType.Usd)
                        ])];
                    case 1:
                        _c = __read.apply(void 0, [_d.sent(), 4]), USDT = _c[0], BTC = _c[1], ETH = _c[2], DASH = _c[3];
                        balance = {
                            BTC: utils_2.numberToFixed(user.balance.BTC),
                            USDT: utils_2.numberToFixed(user.balance.USDT, 0),
                            ETH: utils_2.numberToFixed(user.balance.ETH),
                            DASH: utils_2.numberToFixed(user.balance.DASH)
                        };
                        balanceUSD = {
                            USDT: utils_2.numberToFixed(USDT, 0),
                            BTC: utils_2.numberToFixed(BTC, 0),
                            ETH: utils_2.numberToFixed(ETH, 0),
                            DASH: utils_2.numberToFixed(DASH, 0)
                        };
                        console.log();
                        balanceUSD.totalUSD = lodash_1.sum(Object.values(balanceUSD));
                        return [2 /*return*/, __assign(__assign({}, user), { balance: balance,
                                balanceUSD: balanceUSD })];
                }
            });
        });
    },
    getUnconfirmedBalance: function (root, _a, _b) {
        var user = _b.user, IncomingTransactionModel = _b.IncomingTransactionModel, injector = _b.injector;
        return __awaiter(this, void 0, void 0, function () {
            var pendingTransactions, unconfirmedBalance, _c, USDT, BTC, ETH, DASH;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, IncomingTransactionModel.find({ userId: user.uuid, status: types_1.TransactionStatus.Pending, method: types_1.IncomingTransactionMethod.Payment })];
                    case 1:
                        pendingTransactions = _d.sent();
                        unconfirmedBalance = {
                            USDT: utils_2.numberToFixed(utils_1.getTransactionAmountByCoinType(pendingTransactions, types_1.CoinType.Usdt)),
                            BTC: utils_2.numberToFixed(utils_1.getTransactionAmountByCoinType(pendingTransactions, types_1.CoinType.Btc)),
                            ETH: utils_2.numberToFixed(utils_1.getTransactionAmountByCoinType(pendingTransactions, types_1.CoinType.Eth)),
                            DASH: utils_2.numberToFixed(utils_1.getTransactionAmountByCoinType(pendingTransactions, types_1.CoinType.Dash))
                        };
                        return [4 /*yield*/, Promise.all([
                                injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(unconfirmedBalance.USDT, types_1.CoinType.Usdt, types_1.CurrencyType.Usd),
                                injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(unconfirmedBalance.BTC, types_1.CoinType.Btc, types_1.CurrencyType.Usd),
                                injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(unconfirmedBalance.ETH, types_1.CoinType.Eth, types_1.CurrencyType.Usd),
                                injector.get(core_1.ExchangeCurrencyRateProvider).convertCurrency(unconfirmedBalance.DASH, types_1.CoinType.Dash, types_1.CurrencyType.Usd)
                            ])];
                    case 2:
                        _c = __read.apply(void 0, [_d.sent(), 4]), USDT = _c[0], BTC = _c[1], ETH = _c[2], DASH = _c[3];
                        return [2 /*return*/, {
                                unconfirmedBalance: unconfirmedBalance,
                                unconfirmedBalanceUSD: {
                                    USDT: utils_2.numberToFixed(USDT, 0),
                                    BTC: utils_2.numberToFixed(BTC, 0),
                                    ETH: utils_2.numberToFixed(ETH, 0),
                                    DASH: utils_2.numberToFixed(DASH, 0)
                                }
                            }];
                }
            });
        });
    },
    getAccount: function (root, _a, _b) {
        var accountId = _a.accountId, _c = _a.externalCall, externalCall = _c === void 0 ? true : _c;
        var UserModel = _b.UserModel, user = _b.user, injector = _b.injector;
        return __awaiter(this, void 0, void 0, function () {
            var account, _d, message;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, UserModel.findOne({ $and: [{ accountId: accountId }, { accountId: { $ne: user.accountId } }] })];
                    case 1:
                        account = _e.sent();
                        if (!account)
                            return [2 /*return*/, { accountId: null, name: '' }];
                        return [4 /*yield*/, injector.get(providers_1.AccountProvider).setInternalReceivers(accountId, user.uuid)];
                    case 2:
                        _e.sent();
                        return [2 /*return*/, { accountId: accountId, name: account.nickName }];
                    case 3:
                        _d = _e.sent();
                        message = _d.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    getWhiteLists: function (root, _a, _b) {
        var WhitelistModel = _b.WhitelistModel;
        return __awaiter(void 0, void 0, void 0, function () {
            var whiteList, message;
            return __generator(this, function (_c) {
                try {
                    whiteList = WhitelistModel.findOne({});
                    return [2 /*return*/, whiteList ? whiteList : null];
                }
                catch (_d) {
                    message = _d.message;
                    throw new apollo_server_core_1.ApolloError(message);
                }
                return [2 /*return*/];
            });
        });
    },
    getRecentReceivers: function (root, _a, _b) {
        var user = _b.user, SuggestedReceiversModel = _b.SuggestedReceiversModel;
        try {
            return SuggestedReceiversModel.findOne({ ownerId: user.uuid });
        }
        catch (_c) {
            var message = _c.message;
            throw new apollo_server_core_1.ApolloError(message);
        }
    }
};
//# sourceMappingURL=account.query.js.map