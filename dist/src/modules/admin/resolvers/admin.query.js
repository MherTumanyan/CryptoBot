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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
var lodash_1 = require("lodash");
var apollo_server_core_1 = require("apollo-server-core");
var core_1 = require("@spot_wallet/core");
exports.Query = {
    getTechnicalDetails: function (root, _a, _b) {
        var TechnicalModel = _b.TechnicalModel;
        return __awaiter(void 0, void 0, void 0, function () {
            var technicals, _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, TechnicalModel.findOne({})];
                    case 1:
                        technicals = _d.sent();
                        return [2 /*return*/, technicals ? technicals : null];
                    case 2:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    sendNotifications: function (root, _a, _b) {
        var message = _a.message, telegramIds = _a.telegramIds;
        var UserModel = _b.UserModel, injector = _b.injector, botUrl = _b.botUrl;
        return __awaiter(void 0, void 0, void 0, function () {
            var users, droppedIds, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        if (!lodash_1.isEmpty(telegramIds)) return [3 /*break*/, 2];
                        return [4 /*yield*/, UserModel.find({})];
                    case 1:
                        users = _c.sent();
                        telegramIds = lodash_1.map(users, function (user) { return user.telegramId; });
                        _c.label = 2;
                    case 2:
                        droppedIds = lodash_1.chunk(telegramIds, 15);
                        injector.get(core_1.NamespaceEntityProvider).sendMessage('POST', {
                            message: message,
                            telegramIds: droppedIds
                        }, botUrl + "/sendNotifications");
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 3:
                        error_1 = _c.sent();
                        throw new apollo_server_core_1.ApolloError(error_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    // ScheduleJob
    dailyReport: function (root, _a, _b) {
        var injector = _b.injector;
        return __awaiter(void 0, void 0, void 0, function () {
            var _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, injector.get(core_1.ReportProvider).dailyReport()];
                    case 1:
                        _d.sent();
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 2:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};
//# sourceMappingURL=admin.query.js.map