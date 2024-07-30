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
exports.TwilioProvider = void 0;
var di_1 = require("@graphql-modules/di");
var twilio_1 = require("twilio");
var apollo_server_core_1 = require("apollo-server-core");
var utils_1 = require("@spot_wallet/utils");
var base_provider_1 = require("./base.provider");
var env_default_provider_1 = require("./env.default.provider");
var token_provider_1 = require("./token.provider");
var namespace_entity_provider_1 = require("./namespace.entity.provider");
var TwilioProvider = /** @class */ (function (_super) {
    __extends(TwilioProvider, _super);
    function TwilioProvider(envProvider, tokenProvider, nsp) {
        var _this = _super.call(this, 'TwilioProvider') || this;
        _this.envProvider = envProvider;
        _this.tokenProvider = tokenProvider;
        _this.nsp = nsp;
        var _a = _this.envProvider, TWILIO_SID = _a.TWILIO_SID, TWILIO_TOKEN = _a.TWILIO_TOKEN, APP_NAME = _a.APP_NAME;
        _this.twilio = new twilio_1.Twilio(TWILIO_SID, TWILIO_TOKEN);
        _this.appName = APP_NAME;
        return _this;
    }
    TwilioProvider.prototype.initializer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.envProvider.onInit();
                this.tokenProvider.onInit();
                this.nsp.onInit();
                return [2 /*return*/];
            });
        });
    };
    TwilioProvider.prototype.verificationSms = function (phone) {
        return __awaiter(this, void 0, void 0, function () {
            var TWILIO_PHONE_NUMBER, code, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!phone)
                            throw new apollo_server_core_1.ApolloError(utils_1.NotCorrectValue);
                        TWILIO_PHONE_NUMBER = this.envProvider.TWILIO_PHONE_NUMBER;
                        code = Math.random()
                            .toString()
                            .substring(2, 8);
                        return [4 /*yield*/, this.twilio.messages.create({
                                from: TWILIO_PHONE_NUMBER,
                                to: "+" + phone,
                                body: "Your " + (this.appName || 'TelO BTC') + " verification code is: " + code
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, code];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TwilioProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Session
        }),
        __metadata("design:paramtypes", [env_default_provider_1.DefaultEnvProvider, token_provider_1.TokenProvider, namespace_entity_provider_1.NamespaceEntityProvider])
    ], TwilioProvider);
    return TwilioProvider;
}(base_provider_1.AsyncInitProvider));
exports.TwilioProvider = TwilioProvider;
//# sourceMappingURL=twilio.provider.js.map