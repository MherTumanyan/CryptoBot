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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEnvProvider = void 0;
var mongoose_1 = require("mongoose");
var di_1 = require("@graphql-modules/di");
var loger_default_provider_1 = require("./loger.default.provider");
var provider_tokens_1 = require("./provider.tokens");
var base_provider_1 = require("./base.provider");
var DefaultEnvProvider = /** @class */ (function (_super) {
    __extends(DefaultEnvProvider, _super);
    function DefaultEnvProvider(loger, mongoose) {
        var _this = _super.call(this, 'DefaultEnvProvider') || this;
        _this.loger = loger;
        _this.mongoose = mongoose;
        _this.debug = false;
        return _this;
    }
    DefaultEnvProvider.prototype.initializer = function () {
        console.log('DefaultEnvProvider onInit - START');
        this.loger.onInit();
        this.debug = !!process.env.debug;
        this.MASTER_MONGO_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
        this.MASTER_MONGO_DATABASE = process.env.MASTER_MONGO_DATABASE || 'crypto_spot';
        this.MASTER_MONGO_ARGS = process.env.MONGODB_ARGS || '';
        this.PORT = +process.env.PORT || 4000;
        console.log('DefaultEnvProvider onInit - END');
        this.BOT_URL = process.env.BOT_URL;
        this.PRIVATE_CHANNEL_ID = process.env.PRIVATE_CHANNEL_ID;
        this.ELECTRUM_URL = process.env.ELECTRUM_URL;
        this.ELECTRUM_OUT_WALLET_PASSWORD = process.env.ELECTRUM_OUT_WALLET_PASSWORD;
        this.ELECTRUM_IN_WALLET_PASSWORD = process.env.ELECTRUM_IN_WALLET_PASSWORD;
        this.REQUEST_TO_ELECTRUM_IN = process.env.REQUEST_TO_ELECTRUM_IN;
        this.REQUEST_TO_ELECTRUM_OUT = process.env.REQUEST_TO_ELECTRUM_OUT;
        this.AUTH_TOKEN_ELECTRUM_IN = process.env.AUTH_TOKEN_ELECTRUM_IN;
        this.AUTH_TOKEN_ELECTRUM_OUT = process.env.AUTH_TOKEN_ELECTRUM_OUT;
        this.ELECTRUM_ENABLE = +process.env.ELECTRUM_ENABLE;
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_SECRET_MAIL = process.env.JWT_SECRET_MAIL;
        this.BTC_CHANGE_SENDGRID_KEY = process.env.BTC_CHANGE_SENDGRID_KEY;
        this.COINBASE_API_KEY = process.env.COINBASE_API_KEY;
        this.COINBASE_API_SECRET = process.env.COINBASE_API_SECRET;
        this.COINBASE_PRO_KEY = process.env.COINBASE_PRO_KEY;
        this.COINBASE_PRO_SECRET = process.env.COINBASE_PRO_SECRET;
        this.COINBASE_PRO_PASSPHRASE = process.env.COINBASE_PRO_PASSPHRASE;
        this.DASH_ADDRESS_VERIFICATION_URL = process.env.DASH_ADDRESS_VERIFICATION_URL;
        this.BTC_TRANSACTION_MIN_AMOUNT = process.env.BTC_TRANSACTION_MIN_AMOUNT;
        this.BLOCKCHAIN_INFO_URL = process.env.BLOCKCHAIN_INFO_URL;
        this.JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
        this.ADMIN_BOT_URL = process.env.ADMIN_BOT_URL;
        this.USD_TO_AMD = process.env.USD_TO_AMD;
        this.BTC_TO_USD = process.env.BTC_TO_USD;
        this.USD_TO_RUB = process.env.USD_TO_RUB;
        this.TWILIO_SID = process.env.TWILIO_SID;
        this.TWILIO_TOKEN = process.env.TWILIO_TOKEN;
        this.TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
        this.APP_NAME = process.env.APP_NAME;
        this.BLOT_API_SECRET = process.env.BLOT_API_SECRET;
        this.CLAN_API_URL = process.env.CLAN_API_URL;
        this.CLAN_JWT_KEY = process.env.CLAN_JWT_KEY;
        this.EASY_TRANSFER_EXPIRE_TIME = process.env.EASY_TRANSFER_EXPIRE_TIME || '30000';
        this.WITHDRAW_EXPIRE_TIME = process.env.WITHDRAW_EXPIRE_TIME || '30000';
        this.TRANSACTION_URL = process.env.TRANSACTION_URL;
    };
    DefaultEnvProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Application
        }),
        __param(0, di_1.Inject(loger_default_provider_1.DefaultLoggerProvider)), __param(1, di_1.Inject(provider_tokens_1.MongooseSDKProviderToken)),
        __metadata("design:paramtypes", [loger_default_provider_1.DefaultLoggerProvider, mongoose_1.Mongoose])
    ], DefaultEnvProvider);
    return DefaultEnvProvider;
}(base_provider_1.SyncInitProvider));
exports.DefaultEnvProvider = DefaultEnvProvider;
//# sourceMappingURL=env.default.provider.js.map