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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongodb_memory_server_1 = require("mongodb-memory-server");
var core_1 = require("@spot_wallet/core");
var helper_1 = require("./helper");
var twilio_provider_1 = require("@spot_wallet/core/providers/twilio.provider");
var providers_1 = require("@spot_wallet/finance/providers");
var providers_2 = require("@spot_wallet/account/providers");
var mongoServer;
var opts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectInterval: 1000,
    poolSize: 10,
    bufferMaxEntries: 0,
    reconnectTries: 5000,
    useUnifiedTopology: true,
};
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var mongoUri;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jest.setTimeout(30000);
                mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
                return [4 /*yield*/, mongoServer.getUri()];
            case 1:
                mongoUri = _a.sent();
                return [4 /*yield*/, mongoose_1.default.connect(mongoUri, opts, function (err) {
                        if (err)
                            console.error(err);
                        console.log('connect');
                    })];
            case 2:
                _a.sent();
                helper_1.injector.provide({
                    provide: core_1.ExchangeCurrencyRateProvider,
                    overwrite: true,
                    // @ts-ignore
                    useValue: {
                        convertCurrency: function () { return Promise.resolve(456); },
                        getMinAndMaxTransactionValue: function () {
                            return Promise.resolve({
                                minTransactionValue: 56555,
                                maxTransactionValue: 5335,
                            });
                        },
                        setCurrencyExchangeRates: function () { return Promise.resolve(); }
                    }
                });
                helper_1.injector.provide({
                    provide: core_1.NamespaceEntityProvider,
                    overwrite: true,
                    // @ts-ignore
                    useValue: {
                        sendMessage: function () { return Promise.resolve(true); },
                    }
                });
                helper_1.injector.provide({
                    provide: providers_2.AccountProvider,
                    overwrite: true,
                    // @ts-ignore
                    useValue: {
                        setInternalReceivers: function () { return Promise.resolve(); },
                    }
                });
                helper_1.injector.provide({
                    provide: twilio_provider_1.TwilioProvider,
                    overwrite: true,
                    // @ts-ignore
                    useValue: {
                        verificationSms: function () { return Promise.resolve('54589662'); }
                    }
                });
                helper_1.injector.provide({
                    provide: core_1.TechnicalProvider,
                    overwrite: true,
                    // @ts-ignore
                    useValue: {
                        setCurrencyExchangeRates: function () { return Promise.resolve({}); },
                    }
                });
                helper_1.injector.provide({
                    provide: providers_1.FinanceProvider,
                    overwrite: true,
                    // @ts-ignore
                    useValue: {
                        getWithdrawOrder: function () {
                            return Promise.resolve({
                                amountInCoin: 0.856,
                                amountInUSD: 12,
                                amountInCurrency: 15,
                                withdrawFeeInitialPercent: 65,
                                withdrawFeeInitialUSD: 15,
                                withdrawFeeInPercent: 56,
                                withdrawFeeCoin: 47,
                                withdrawFeeInCurrency: 56,
                                totalWithdrawAmountInCoin: 15,
                                totalWithdrawAmountInCurrency: 46,
                                totalWithdrawAmountInUsd: 69,
                            });
                        },
                        getEasyTransferOrder: function () {
                            return Promise.resolve({
                                amountInCoin: 1,
                                amountInUSD: 1,
                                easyTransferFeeInitialPercent: 1,
                                easyTransferFeeInitialUSD: 1,
                                easyTransferFeeInPercent: 1,
                                easyTransferFeeCoin: 1,
                                easyTransferFeeInCurrency: 1,
                                totalEasyTransferAmountInCoin: 1,
                                totalEasyTransferAmountInCurrency: 1,
                                totalEasyTransferAmountInUsd: 1,
                            });
                        },
                        isInternalAddress: function () {
                            return Promise.resolve(true);
                        },
                        setExternalReceivers: function () { return Promise.resolve(); }
                    }
                });
                helper_1.injector.provide({
                    provide: core_1.ReportProvider,
                    overwrite: true,
                    // @ts-ignore
                    useValue: {
                        dailyReport: function () { return Promise.resolve(true); }
                    }
                });
                helper_1.injector.provide({
                    provide: core_1.CoinbaseProvider,
                    overwrite: true,
                    useValue: {
                        // @ts-ignore
                        sendMoney: function () { return Promise.resolve({ id: '5665' }); },
                        createWalletAddress: function () { return Promise.resolve('address'); },
                        // @ts-ignore
                        getTransaction: function () { return Promise.resolve({ status: 'CANCELED', network: { transaction_url: 'url' } }); }
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
beforeEach(function (done) { return __awaiter(void 0, void 0, void 0, function () {
    var collections, collections_1, collections_1_1, connection, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connection.db.collections()];
            case 1:
                collections = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 7, 8, 9]);
                collections_1 = __values(collections), collections_1_1 = collections_1.next();
                _b.label = 3;
            case 3:
                if (!!collections_1_1.done) return [3 /*break*/, 6];
                connection = collections_1_1.value;
                return [4 /*yield*/, connection.deleteMany({})];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                collections_1_1 = collections_1.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (collections_1_1 && !collections_1_1.done && (_a = collections_1.return)) _a.call(collections_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9:
                done();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connection.close()];
            case 1:
                _a.sent();
                return [4 /*yield*/, mongoServer.stop()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=setup.js.map