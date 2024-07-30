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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinbaseProvider = void 0;
var di_1 = require("@graphql-modules/di");
var coinbase_1 = require("coinbase");
var coinbase_pro_node_1 = require("coinbase-pro-node");
var lodash_1 = require("lodash");
var _1 = require(".");
var utils_1 = require("@spot_wallet/utils");
var types_1 = require("@spot_wallet/types");
var base_provider_1 = require("./base.provider");
var CoinbaseProvider = /** @class */ (function (_super) {
    __extends(CoinbaseProvider, _super);
    function CoinbaseProvider(nsp, envProvider) {
        var _this = _super.call(this, 'CoinbaseProvider') || this;
        _this.nsp = nsp;
        _this.envProvider = envProvider;
        return _this;
    }
    CoinbaseProvider.prototype.initializer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.nsp.onInit()];
                    case 1:
                        _b.sent();
                        this.envProvider.onInit();
                        this.CoinbaseClient = new coinbase_1.Client({
                            apiKey: this.envProvider.COINBASE_API_KEY,
                            apiSecret: this.envProvider.COINBASE_API_SECRET,
                            // @ts-ignore
                            strictSSL: false,
                        });
                        this.CoinbaseProClient = new coinbase_pro_node_1.CoinbasePro({
                            apiKey: this.envProvider.COINBASE_PRO_KEY,
                            apiSecret: this.envProvider.COINBASE_PRO_SECRET,
                            passphrase: this.envProvider.COINBASE_PRO_PASSPHRASE,
                            useSandbox: false
                        });
                        _a = this;
                        return [4 /*yield*/, this.getAccountIds()];
                    case 2:
                        _a.AccountIds = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CoinbaseProvider.prototype.createWalletAddress = function (coinType) {
        return __awaiter(this, void 0, void 0, function () {
            var accountId;
            var _this = this;
            return __generator(this, function (_a) {
                accountId = this.AccountIds[coinType];
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return _this.CoinbaseClient.getAccount(accountId, function (error, account) {
                            if (lodash_1.isEmpty(account))
                                reject({ code: 404, error: true, message: utils_1.AccountNotFound });
                            if (error)
                                return reject(error);
                            account.createAddress({}, function (error, addressInfo) {
                                if (error)
                                    return reject(error.message);
                                resolve(addressInfo.address);
                            });
                        });
                    })];
            });
        });
    };
    CoinbaseProvider.prototype.getExchangeRate = function (from, to, toFixed) {
        if (toFixed === void 0) { toFixed = 6; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.CoinbaseClient.getExchangeRates({ 'currency': from }, function (error, rates) {
                            if (error)
                                return reject(error.message);
                            return rates.data.rates[to] ?
                                resolve(utils_1.numberToFixed(Number(rates.data.rates[to]), toFixed)) :
                                reject({ code: 404, error: true, message: utils_1.CurrencyNotFound });
                        });
                    })];
            });
        });
    };
    CoinbaseProvider.prototype.sendMoney = function (amount, address, idem, coinType) {
        return __awaiter(this, void 0, void 0, function () {
            var accountId;
            var _this = this;
            return __generator(this, function (_a) {
                accountId = this.AccountIds[coinType];
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return _this.CoinbaseClient.getAccount(accountId, function (error, account) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (error)
                                    return [2 /*return*/, reject(error.message)];
                                // @ts-ignore
                                account.sendMoney({
                                    to: address,
                                    amount: amount,
                                    currency: coinType,
                                    idem: idem
                                }, function (error, tx) {
                                    if (error)
                                        return reject(error.message);
                                    resolve(tx);
                                });
                                return [2 /*return*/];
                            });
                        }); });
                    })];
            });
        });
    };
    CoinbaseProvider.prototype.getTransaction = function (coinType, transactionId) {
        return __awaiter(this, void 0, void 0, function () {
            var accountId;
            var _this = this;
            return __generator(this, function (_a) {
                accountId = this.AccountIds[coinType];
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return _this.CoinbaseClient.getAccount(accountId, function (error, account) {
                            if (lodash_1.isEmpty(account))
                                reject({ code: 404, error: true, message: utils_1.AccountNotFound });
                            if (error)
                                return reject(error);
                            account.getTransaction(transactionId, function (error, tx) {
                                if (error)
                                    return reject(error);
                                resolve(tx);
                            });
                        });
                    })];
            });
        });
    };
    CoinbaseProvider.prototype.getNetworkFees = function (currency, address) {
        return __awaiter(this, void 0, void 0, function () {
            var fee, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.CoinbaseProClient.rest.withdraw.getFeeEstimate(currency, address)];
                    case 1:
                        fee = (_a.sent()).fee;
                        if (!fee)
                            return [2 /*return*/, { error: '', code: 404, success: false }];
                        return [2 /*return*/, { error: '', code: 200, success: true, fee: Number(fee) }];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        return [2 /*return*/, { error: error_1.message, code: 500, success: false }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CoinbaseProvider.prototype.getAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return _this.CoinbaseClient.getAccounts({}, function (error, accounts) {
                            if (lodash_1.isEmpty(accounts))
                                reject({ code: 404, error: true, message: utils_1.AccounstNotFound });
                            if (error)
                                return reject(error.message);
                            resolve(accounts);
                        });
                    })];
            });
        });
    };
    CoinbaseProvider.prototype.getAccountIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accounts, coins, accountIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAccounts()];
                    case 1:
                        accounts = _a.sent();
                        coins = Object.values(types_1.CoinType);
                        accountIds = {};
                        lodash_1.map(accounts, function (account) {
                            var id = account.id;
                            var currency = account.currency;
                            if (coins.includes(currency))
                                accountIds[currency] = id;
                        });
                        return [2 /*return*/, accountIds];
                }
            });
        });
    };
    CoinbaseProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Application,
        }),
        __metadata("design:paramtypes", [_1.NamespaceEntityProvider, _1.DefaultEnvProvider])
    ], CoinbaseProvider);
    return CoinbaseProvider;
}(base_provider_1.AsyncInitProvider));
exports.CoinbaseProvider = CoinbaseProvider;
//# sourceMappingURL=coinbase.provider.js.map