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
exports.TechnicalProvider = void 0;
var lodash_1 = require("lodash");
var di_1 = require("@graphql-modules/di");
var utils_1 = require("@spot_wallet/utils");
var base_provider_1 = require("./base.provider");
var _1 = require(".");
var coinbase_provider_1 = require("./coinbase.provider");
var types_1 = require("../types");
var TechnicalProvider = /** @class */ (function (_super) {
    __extends(TechnicalProvider, _super);
    function TechnicalProvider(nsp, envProvider, coinBaseProvider) {
        var _this = _super.call(this, 'TechnicalProvider') || this;
        _this.nsp = nsp;
        _this.envProvider = envProvider;
        _this.coinBaseProvider = coinBaseProvider;
        _this.exchangeRates = {};
        return _this;
    }
    TechnicalProvider.prototype.initializer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var TechnicalModel, existingTechnicalDetails, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.nsp.onInit()];
                    case 1:
                        _b.sent();
                        this.envProvider.onInit();
                        return [4 /*yield*/, this.coinBaseProvider.onInit()];
                    case 2:
                        _b.sent();
                        TechnicalModel = this.nsp.getEntityModel(types_1.EntityEnum.TECHNICAL);
                        return [4 /*yield*/, TechnicalModel.findOne({})];
                    case 3:
                        existingTechnicalDetails = _b.sent();
                        if (!!existingTechnicalDetails) return [3 /*break*/, 6];
                        _a = this;
                        return [4 /*yield*/, this.setCurrencyExchangeRates(utils_1.currencies)];
                    case 4:
                        _a.exchangeRates = _b.sent();
                        return [4 /*yield*/, this.createTechnicalDetails()];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TechnicalProvider.prototype.createTechnicalDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var TechnicalModel, _a, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        TechnicalModel = this.nsp.getEntityModel(types_1.EntityEnum.TECHNICAL);
                        return [4 /*yield*/, TechnicalModel.create({
                                minTransactionUSD: 10,
                                maxTransactionUSD: 1000,
                                rates: this.exchangeRates,
                                fees: {
                                    fixWithdrawFee: {
                                        id: utils_1.getCustomId({ length: 4 }),
                                        amountUSD: 0,
                                        fee: 0,
                                        feeUSD: 4 // $
                                    },
                                    withdrawFees: [
                                        {
                                            id: utils_1.getCustomId({ length: 4 }),
                                            amountUSD: 0,
                                            fee: 0,
                                            feeUSD: 4 // $
                                        },
                                        {
                                            id: utils_1.getCustomId({ length: 4 }),
                                            amountUSD: 200,
                                            fee: 0,
                                            feeUSD: 2 // $
                                        }
                                    ],
                                    easyTransferFees: [
                                        {
                                            id: utils_1.getCustomId({ length: 4 }),
                                            amountUSD: 0,
                                            fee: 0,
                                            feeUSD: 2 // $
                                        },
                                        {
                                            id: utils_1.getCustomId({ length: 4 }),
                                            amountUSD: 200,
                                            fee: 0,
                                            feeUSD: 2 // $
                                        }
                                    ],
                                },
                                schedulerRecurrenceTimes: {
                                    everyOneMinute: '*/1 * * * *'
                                },
                                suggestedReceiversCount: 5
                            })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        message = _a.message;
                        console.log(message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TechnicalProvider.prototype.setCurrencyExchangeRates = function (currencies) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeRates;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exchangeRates = {};
                        return [4 /*yield*/, Promise.all(lodash_1.map(currencies, function (from) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.all(lodash_1.map(currencies, function (to) { return __awaiter(_this, void 0, void 0, function () {
                                                var exchangeRate;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!(from !== to)) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, this.setCurrencyExchangeRate(from, to)];
                                                        case 1:
                                                            exchangeRate = _a.sent();
                                                            exchangeRates = __assign(__assign({}, exchangeRates), exchangeRate);
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
                        return [2 /*return*/, exchangeRates];
                }
            });
        });
    };
    TechnicalProvider.prototype.setCurrencyExchangeRate = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var rate;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.coinBaseProvider.getExchangeRate(from, to)];
                    case 1:
                        rate = _b.sent();
                        return [2 /*return*/, (_a = {}, _a[from + "To" + to + "ExchangeRate"] = Number(rate), _a)];
                }
            });
        });
    };
    TechnicalProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Application
        }),
        __metadata("design:paramtypes", [_1.NamespaceEntityProvider, _1.DefaultEnvProvider, coinbase_provider_1.CoinbaseProvider])
    ], TechnicalProvider);
    return TechnicalProvider;
}(base_provider_1.AsyncInitProvider));
exports.TechnicalProvider = TechnicalProvider;
//# sourceMappingURL=technical.provider.js.map