"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoreModule = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var core_1 = require("@graphql-modules/core");
var twilio_provider_1 = require("./providers/twilio.provider");
var providers_1 = require("./providers");
var gm = null;
exports.createCoreModule = function () {
    if (gm)
        return gm;
    console.log('createCoreModule');
    gm = new core_1.GraphQLModule({
        providers: [
            {
                provide: providers_1.MongooseSDKProviderToken,
                useValue: mongoose_1.default
            },
            providers_1.DefaultEnvProvider,
            providers_1.DefaultLoggerProvider,
            providers_1.SchemaProvider,
            providers_1.NamespaceEntityProvider,
            providers_1.TokenProvider,
            providers_1.TechnicalProvider,
            twilio_provider_1.TwilioProvider,
            providers_1.ReportProvider,
            providers_1.GraphqlClientProvider,
            providers_1.WhitelistProvider,
            providers_1.CoinbaseProvider,
            providers_1.ExchangeCurrencyRateProvider,
            providers_1.HistoryMetaProvider
        ]
    });
    return gm;
};
//# sourceMappingURL=core.module.js.map