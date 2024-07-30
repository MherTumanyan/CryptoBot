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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeCurrencyRateProvider = void 0;
var node_cache_1 = __importDefault(require("node-cache"));
var lodash_1 = require("lodash");
var di_1 = require("@graphql-modules/di");
var core_1 = require("@spot_wallet/core");
var utils_1 = require("@spot_wallet/utils");
var types_1 = require("@spot_wallet/types");
var base_provider_1 = require("./base.provider");
var _1 = require(".");
var coinbase_provider_1 = require("./coinbase.provider");
var technical_provider_1 = require("./technical.provider");
var ExchangeCurrencyRateProvider = /** @class */ (function (_super) {
    __extends(ExchangeCurrencyRateProvider, _super);
    function ExchangeCurrencyRateProvider(nsp, envProvider, coinBaseProvider, techincalProvider) {
        var _this = _super.call(this, 'ExchangeCurrencyRateProvider') || this;
        _this.nsp = nsp;
        _this.envProvider = envProvider;
        _this.coinBaseProvider = coinBaseProvider;
        _this.techincalProvider = techincalProvider;
        return _this;
    }
    ExchangeCurrencyRateProvider.prototype.initializer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nsp.onInit()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.coinBaseProvider.onInit()];
                    case 2:
                        _a.sent();
                        this.envProvider.onInit();
                        return [4 /*yield*/, this.techincalProvider.onInit()];
                    case 3:
                        _a.sent();
                        this.TechnicalModel = this.nsp.getEntityModel(core_1.EntityEnum.TECHNICAL);
                        this.cache = new node_cache_1.default();
                        return [4 /*yield*/, this.setCurrencyExchangeRates(utils_1.currencies)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExchangeCurrencyRateProvider.prototype.setCurrencyExchangeRate = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var rate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.coinBaseProvider.getExchangeRate(from, to)];
                    case 1:
                        rate = _a.sent();
                        this.cache.set(from + "To" + to + "ExchangeRate", Number(rate));
                        return [2 /*return*/];
                }
            });
        });
    };
    ExchangeCurrencyRateProvider.prototype.getExchangeRateFromCash = function (from, to) {
        return this.cache.get(from + "To" + to + "ExchangeRate");
    };
    ExchangeCurrencyRateProvider.prototype.getExchangeRateLive = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.coinBaseProvider.getExchangeRate(from, to)];
            });
        });
    };
    ExchangeCurrencyRateProvider.prototype.getExchangeRateFromDB = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var technicalDetails, rates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.TechnicalModel.findOne()];
                    case 1:
                        technicalDetails = _a.sent();
                        rates = technicalDetails.rates;
                        return [2 /*return*/, rates[from + "To" + to + "ExchangeRate"]];
                }
            });
        });
    };
    ExchangeCurrencyRateProvider.prototype.convertCurrency = function (amount, from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var rate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getExchangeRate(from, to)];
                    case 1:
                        rate = _a.sent();
                        return [2 /*return*/, amount * rate];
                }
            });
        });
    };
    ExchangeCurrencyRateProvider.prototype.getMinAndMaxTransactionValue = function (coinType) {
        return __awaiter(this, void 0, void 0, function () {
            var technicalDetails, minTransactionUSD, maxTransactionUSD, rate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.TechnicalModel.findOne()];
                    case 1:
                        technicalDetails = _a.sent();
                        minTransactionUSD = technicalDetails.minTransactionUSD, maxTransactionUSD = technicalDetails.maxTransactionUSD;
                        return [4 /*yield*/, this.getExchangeRate(types_1.CurrencyType.Usd, coinType)];
                    case 2:
                        rate = _a.sent();
                        return [2 /*return*/, {
                                minTransactionValue: minTransactionUSD * rate,
                                maxTransactionValue: maxTransactionUSD * rate,
                            }];
                }
            });
        });
    };
    ExchangeCurrencyRateProvider.prototype.getExchangeRate = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var rateFromCash, liveRate, rateFromDb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rateFromCash = this.getExchangeRateFromCash(from, to);
                        if (rateFromCash)
                            return [2 /*return*/, rateFromCash];
                        return [4 /*yield*/, this.getExchangeRateLive(from, to)];
                    case 1:
                        liveRate = _a.sent();
                        if (liveRate)
                            return [2 /*return*/, liveRate];
                        return [4 /*yield*/, this.getExchangeRateFromDB(from, to)];
                    case 2:
                        rateFromDb = _a.sent();
                        if (rateFromDb)
                            return [2 /*return*/, rateFromDb];
                        return [2 /*return*/];
                }
            });
        });
    };
    ExchangeCurrencyRateProvider.prototype.setCurrencyExchangeRates = function (currencies) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(lodash_1.map(currencies, function (from) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Promise.all(lodash_1.map(currencies, function (to) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(from !== to)) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, this.setCurrencyExchangeRate(from, to)];
                                                    case 1:
                                                        _a.sent();
                                                        _a.label = 2;
                                                    case 2: return [2 /*return*/];
                                                }
                                            });
                                        }); }))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExchangeCurrencyRateProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Application
        }),
        __metadata("design:paramtypes", [_1.NamespaceEntityProvider, _1.DefaultEnvProvider, coinbase_provider_1.CoinbaseProvider, technical_provider_1.TechnicalProvider])
    ], ExchangeCurrencyRateProvider);
    return ExchangeCurrencyRateProvider;
}(base_provider_1.AsyncInitProvider));
exports.ExchangeCurrencyRateProvider = ExchangeCurrencyRateProvider;
//# sourceMappingURL=exchangeCurrencyRate.provider.js.map