"use strict";
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
exports.Mutation = void 0;
var apollo_server_core_1 = require("apollo-server-core");
var utils_1 = require("@spot_wallet/utils");
var twilio_provider_1 = require("@spot_wallet/core/providers/twilio.provider");
var finance_query_1 = require("../../finance/resolvers/finance.query");
exports.Mutation = {
    registerTelegramUser: function (root, _a, _b) {
        var firstName = _a.firstName, lastName = _a.lastName, telegramId = _a.telegramId;
        var UserModel = _b.UserModel;
        return __awaiter(this, void 0, void 0, function () {
            var user, accountId, newUser, _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, UserModel.findOne({ telegramId: telegramId })];
                    case 1:
                        user = _d.sent();
                        if (user)
                            return [2 /*return*/, { error: utils_1.UserAlreadyExists, code: 409, success: false }];
                        accountId = utils_1.getCustomId({});
                        return [4 /*yield*/, UserModel.create({ telegramId: telegramId, accountId: accountId, firstName: firstName, lastName: lastName })];
                    case 2:
                        newUser = _d.sent();
                        return [2 /*return*/, __assign(__assign({}, newUser), { code: 200, success: true, error: '' })];
                    case 3:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    updateUser: function (root, _a, _b) {
        var nickName = _a.nickName, language = _a.language;
        var UserModel = _b.UserModel, _id = _b.user._id;
        return __awaiter(this, void 0, void 0, function () {
            var response, updatedUser, _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, finance_query_1.Query.validateName(root, { name: nickName }, { UserModel: UserModel })];
                    case 1:
                        response = _d.sent();
                        if (response.code === 409 || response.code === 400)
                            return [2 /*return*/, response];
                        return [4 /*yield*/, UserModel.findByIdAndUpdate(_id, { nickName: nickName, language: language }, { new: true })];
                    case 2:
                        updatedUser = _d.sent();
                        return [2 /*return*/, __assign(__assign({}, response), { data: updatedUser })];
                    case 3:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    sendVerificationSms: function (root, _a, _b) {
        var phoneNumber = _a.phoneNumber;
        var user = _b.user, UserModel = _b.UserModel, injector = _b.injector;
        return __awaiter(this, void 0, void 0, function () {
            var response, verificationCode, _id, _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, finance_query_1.Query.validatePhoneNumber(root, { phoneNumber: phoneNumber }, { UserModel: UserModel })];
                    case 1:
                        response = _d.sent();
                        if (response.code !== 200)
                            return [2 /*return*/, response];
                        return [4 /*yield*/, injector.get(twilio_provider_1.TwilioProvider).verificationSms(phoneNumber)];
                    case 2:
                        verificationCode = _d.sent();
                        _id = user._id;
                        return [4 /*yield*/, UserModel.updateOne({ _id: _id }, { phoneNumber: phoneNumber, verificationCode: verificationCode })];
                    case 3:
                        _d.sent();
                        return [2 /*return*/, { error: '', code: 200, success: true }];
                    case 4:
                        _c = _d.sent();
                        message = _c.message;
                        throw new apollo_server_core_1.ApolloError(message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    verifyActivationCode: function (root, _a, _b) {
        var code = _a.code;
        var UserModel = _b.UserModel, user = _b.user;
        return __awaiter(this, void 0, void 0, function () {
            var _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        if (user.verificationCode !== code)
                            return [2 /*return*/, { error: '', code: 400, success: false }];
                        return [4 /*yield*/, UserModel.findOneAndUpdate({ _id: user._id }, { verificationCode: '0', verified: true })];
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
    },
    toggleNotify: function (root, _a, _b) {
        var notify = _a.notify;
        var UserModel = _b.UserModel, user = _b.user;
        return __awaiter(this, void 0, void 0, function () {
            var _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel.findByIdAndUpdate(user._id, { notify: notify })];
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
    },
};
//# sourceMappingURL=account.mutation.js.map