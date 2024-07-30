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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLoggerProvider = void 0;
var di_1 = require("@graphql-modules/di");
var base_provider_1 = require("./base.provider");
require("reflect-metadata");
/**
 * This is the defalt logger that could be changed
 */
var DefaultLoggerProvider = /** @class */ (function (_super) {
    __extends(DefaultLoggerProvider, _super);
    function DefaultLoggerProvider() {
        return _super.call(this, 'DefaultLoggerProvider') || this;
    }
    DefaultLoggerProvider.prototype.initializer = function () {
        console.log('DefaultLoggerProvider');
    };
    DefaultLoggerProvider.prototype.log = function (message) {
        console.log(message);
    };
    DefaultLoggerProvider.prototype.info = function (message) {
        console.info(message);
    };
    DefaultLoggerProvider.prototype.error = function (message) {
        console.error(message);
    };
    DefaultLoggerProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Application
        }),
        __metadata("design:paramtypes", [])
    ], DefaultLoggerProvider);
    return DefaultLoggerProvider;
}(base_provider_1.SyncInitProvider));
exports.DefaultLoggerProvider = DefaultLoggerProvider;
//# sourceMappingURL=loger.default.provider.js.map