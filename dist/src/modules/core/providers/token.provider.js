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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenProvider = void 0;
var di_1 = require("@graphql-modules/di");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var apollo_server_core_1 = require("apollo-server-core");
var utils_1 = require("@spot_wallet/utils");
var _1 = require(".");
var TokenProvider = /** @class */ (function (_super) {
    __extends(TokenProvider, _super);
    function TokenProvider(envProvider) {
        var _this = _super.call(this, 'TokenProvider') || this;
        _this.envProvider = envProvider;
        return _this;
    }
    TokenProvider.prototype.initializer = function () {
        this.envProvider.onInit();
    };
    TokenProvider.prototype.generateToken = function (userId, admin, secret, expiresIn) {
        if (admin === void 0) { admin = false; }
        if (expiresIn === void 0) { expiresIn = '48h'; }
        if (admin)
            return jsonwebtoken_1.default.sign({ admin: admin }, secret || this.envProvider.JWT_SECRET, { expiresIn: expiresIn });
        return jsonwebtoken_1.default.sign({ userId: userId }, secret || this.envProvider.JWT_SECRET, { expiresIn: expiresIn });
    };
    TokenProvider.prototype.decodeToken = function (token) {
        var JWT_SECRET = this.envProvider.JWT_SECRET;
        var verify = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!verify)
            throw new apollo_server_core_1.ApolloError(utils_1.ResetTokenExpiredError);
        var payload = jsonwebtoken_1.default.decode(token, JWT_SECRET);
        if (!payload)
            throw new apollo_server_core_1.ApolloError(utils_1.IncorrectTokenError);
        if (payload.telegramId)
            return { telegramId: payload.telegramId };
        if (payload.isService)
            return { isService: payload.isService };
        throw new apollo_server_core_1.ApolloError(utils_1.IncorrectTokenError);
    };
    TokenProvider.prototype.decodeAdminToken = function (token) {
        var JWT_SECRET_ADMIN = this.envProvider.JWT_SECRET_ADMIN;
        var verify = jsonwebtoken_1.default.verify(token, JWT_SECRET_ADMIN);
        if (!verify)
            throw new apollo_server_core_1.ApolloError(utils_1.ResetTokenExpiredError);
        var payload = jsonwebtoken_1.default.decode(token, JWT_SECRET_ADMIN);
        if (!payload)
            throw new apollo_server_core_1.ApolloError(utils_1.IncorrectTokenError);
        if (payload.userId)
            return { userId: payload.userId };
        if (payload.telegramId)
            return { telegramId: payload.telegramId };
        if (payload.isService)
            return { isService: payload.isService };
        throw new apollo_server_core_1.ApolloError(utils_1.IncorrectTokenError);
    };
    TokenProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Application
        }),
        __metadata("design:paramtypes", [_1.DefaultEnvProvider])
    ], TokenProvider);
    return TokenProvider;
}(_1.SyncInitProvider));
exports.TokenProvider = TokenProvider;
//# sourceMappingURL=token.provider.js.map