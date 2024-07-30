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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ReportProvider = void 0;
var moment_1 = __importDefault(require("moment"));
var lodash_1 = require("lodash");
var di_1 = require("@graphql-modules/di");
var base_provider_1 = require("./base.provider");
var namespace_entity_provider_1 = require("./namespace.entity.provider");
var types_1 = require("@spot_wallet/types");
var env_default_provider_1 = require("./env.default.provider");
var utils_1 = require("@spot_wallet/utils");
var ReportProvider = /** @class */ (function (_super) {
    __extends(ReportProvider, _super);
    function ReportProvider(nsp, envProvider) {
        var _this = _super.call(this, 'ReportProvider') || this;
        _this.nsp = nsp;
        _this.envProvider = envProvider;
        return _this;
    }
    ReportProvider.prototype.initializer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.nsp.onInit();
                this.envProvider.onInit();
                return [2 /*return*/];
            });
        });
    };
    ReportProvider.prototype.sendReport = function (data, entityName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (entityName === types_1.EntityEnum.OUTGOING_TRANSACTION && data.status === types_1.TransactionStatus.Completed && data.method === types_1.TransactionMethod.EasyTransfer) {
                        return [2 /*return*/, this.sendEasyTransferReport(data)];
                    }
                    if (entityName === types_1.EntityEnum.INCOMING_TRANSACTION && data.status === types_1.TransactionStatus.Completed && data.method === types_1.TransactionMethod.Payment) {
                        return [2 /*return*/, this.sendPaymentReport(data)];
                    }
                    if (entityName === types_1.EntityEnum.OUTGOING_TRANSACTION && data.status === types_1.TransactionStatus.Completed && data.method === types_1.TransactionMethod.Withdraw) {
                        return [2 /*return*/, this.sendWithdrawReport(data)];
                    }
                    if (entityName === types_1.EntityEnum.OUTGOING_TRANSACTION && data.status === types_1.TransactionStatus.Completed && data.method === types_1.TransactionMethod.InternalWithdraw) {
                        return [2 /*return*/, this.sendInternalWithdrawReport(data)];
                    }
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    ReportProvider.prototype.sendEasyTransferReport = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var UserModel, amount, amountWithFee, amountUsd, amountWithFeeUsd, action, coinType, date, feeCoin, feeUsd, fromUser, toUser, fromNickName, fromAccountId, toNickName, toAccountId, botUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        UserModel = this.nsp.getEntityModel(types_1.EntityEnum.USER);
                        amount = data.outgoingAmount, amountWithFee = data.outgoingAmountWithFee, amountUsd = data.outgoingAmountUSD, amountWithFeeUsd = data.outgoingAmountWithFeeUSD, action = data.method, coinType = data.coinType;
                        date = moment_1.default().format(utils_1.reportsDateFormat);
                        feeCoin = utils_1.numberToFixed((amountWithFee - amount));
                        feeUsd = utils_1.numberToFixed(amountWithFeeUsd - amountUsd, 1);
                        return [4 /*yield*/, UserModel.findOne({ uuid: data.userId }, { nickName: 1, accountId: 1 })];
                    case 1:
                        fromUser = _a.sent();
                        return [4 /*yield*/, UserModel.findOne({ accountId: data.toAccount }, { nickName: 1, accountId: 1 })];
                    case 2:
                        toUser = _a.sent();
                        if (lodash_1.isEmpty(fromUser) || lodash_1.isEmpty(toUser))
                            return [2 /*return*/];
                        fromNickName = fromUser.nickName, fromAccountId = fromUser.accountId;
                        toNickName = toUser.nickName, toAccountId = toUser.accountId;
                        botUrl = this.envProvider.BOT_URL;
                        return [2 /*return*/, this.nsp.sendMessage('POST', {
                                privateChannelId: this.envProvider.PRIVATE_CHANNEL_ID,
                                amount: amount,
                                amountWithFee: amountWithFee,
                                amountUsd: amountUsd,
                                amountWithFeeUsd: amountWithFeeUsd,
                                feeCoin: feeCoin,
                                feeUsd: feeUsd,
                                fromNickName: fromNickName,
                                fromAccountId: fromAccountId,
                                toNickName: toNickName,
                                toAccountId: toAccountId,
                                action: action,
                                date: date,
                                coinType: coinType
                            }, botUrl + "/transactionReportToPrivateChannel")];
                }
            });
        });
    };
    ReportProvider.prototype.sendPaymentReport = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var UserModel, amount, amountUsd, address, action, coinType, date, toUser, toNickName, toAccountId, botUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        UserModel = this.nsp.getEntityModel(types_1.EntityEnum.USER);
                        amount = data.amount, amountUsd = data.amountUSD, address = data.address, action = data.method, coinType = data.coinType;
                        date = moment_1.default().format(utils_1.reportsDateFormat);
                        return [4 /*yield*/, UserModel.findOne({ uuid: data.userId }, { nickName: 1, accountId: 1 })];
                    case 1:
                        toUser = _a.sent();
                        if (lodash_1.isEmpty(toUser))
                            return [2 /*return*/];
                        toNickName = toUser.nickName, toAccountId = toUser.accountId;
                        botUrl = this.envProvider.BOT_URL;
                        return [2 /*return*/, this.nsp.sendMessage('POST', {
                                privateChannelId: this.envProvider.PRIVATE_CHANNEL_ID,
                                amount: amount,
                                amountUsd: amountUsd,
                                address: address,
                                toNickName: toNickName,
                                toAccountId: toAccountId,
                                action: action,
                                date: date,
                                coinType: coinType
                            }, botUrl + "/transactionReportToPrivateChannel")];
                }
            });
        });
    };
    ReportProvider.prototype.sendWithdrawReport = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var UserModel, amount, outgoingAmountWithFee, amountUsd, amountWithFeeUsd, action, toAccountId, coinType, date, amountWithFee, feeCoin, feeUsd, fromUser, fromNickName, fromAccountId, botUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        UserModel = this.nsp.getEntityModel(types_1.EntityEnum.USER);
                        amount = data.outgoingAmount, outgoingAmountWithFee = data.outgoingAmountWithFee, amountUsd = data.outgoingAmountUSD, amountWithFeeUsd = data.outgoingAmountWithFeeUSD, action = data.method, toAccountId = data.receiverAddress, coinType = data.coinType;
                        date = moment_1.default().format(utils_1.reportsDateFormat);
                        amountWithFee = utils_1.numberToFixed(outgoingAmountWithFee);
                        feeCoin = utils_1.numberToFixed((amountWithFee - amount));
                        feeUsd = utils_1.numberToFixed(amountWithFeeUsd - amountUsd, 1);
                        return [4 /*yield*/, UserModel.findOne({ uuid: data.userId }, { nickName: 1, accountId: 1 })];
                    case 1:
                        fromUser = _a.sent();
                        if (lodash_1.isEmpty(fromUser))
                            return [2 /*return*/];
                        fromNickName = fromUser.nickName, fromAccountId = fromUser.accountId;
                        botUrl = this.envProvider.BOT_URL;
                        return [2 /*return*/, this.nsp.sendMessage('POST', {
                                privateChannelId: this.envProvider.PRIVATE_CHANNEL_ID,
                                amount: amount,
                                amountWithFee: amountWithFee,
                                amountUsd: amountUsd,
                                amountWithFeeUsd: amountWithFeeUsd,
                                toAccountId: toAccountId,
                                feeCoin: feeCoin,
                                feeUsd: feeUsd,
                                fromNickName: fromNickName,
                                fromAccountId: fromAccountId,
                                action: action,
                                date: date,
                                coinType: coinType
                            }, botUrl + "/transactionReportToPrivateChannel")];
                }
            });
        });
    };
    ReportProvider.prototype.sendInternalWithdrawReport = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ReceivingAddressesModel, UserModel, amount, outgoingAmountWithFee, amountUsd, amountWithFeeUsd, receiverAddress, action, coinType, date, amountWithFee, feeCoin, feeUsd, receivingAddressUserId, toUserId, fromUser, toUser, fromNickName, fromAccountId, toNickName, toAccountId, botUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ReceivingAddressesModel = this.nsp.getEntityModel(types_1.EntityEnum.RECEIVING_ADDRESS);
                        UserModel = this.nsp.getEntityModel(types_1.EntityEnum.USER);
                        amount = data.outgoingAmount, outgoingAmountWithFee = data.outgoingAmountWithFee, amountUsd = data.outgoingAmountUSD, amountWithFeeUsd = data.outgoingAmountWithFeeUSD, receiverAddress = data.receiverAddress, action = data.method, coinType = data.coinType;
                        date = moment_1.default().format(utils_1.reportsDateFormat);
                        amountWithFee = utils_1.numberToFixed(outgoingAmountWithFee);
                        feeCoin = utils_1.numberToFixed((amountWithFee - amount));
                        feeUsd = utils_1.numberToFixed(amountWithFeeUsd - amountUsd, 1);
                        return [4 /*yield*/, ReceivingAddressesModel.findOne({ address: receiverAddress }, { userId: 1, _id: 0 })];
                    case 1:
                        receivingAddressUserId = _a.sent();
                        if (lodash_1.isEmpty(receivingAddressUserId))
                            return [2 /*return*/];
                        toUserId = receivingAddressUserId.userId;
                        return [4 /*yield*/, UserModel.findOne({ uuid: data.userId }, { nickName: 1, accountId: 1 })];
                    case 2:
                        fromUser = _a.sent();
                        return [4 /*yield*/, UserModel.findOne({ uuid: toUserId }, { nickName: 1, accountId: 1 })];
                    case 3:
                        toUser = _a.sent();
                        if (lodash_1.isEmpty(fromUser) || lodash_1.isEmpty(toUser))
                            return [2 /*return*/];
                        fromNickName = fromUser.nickName, fromAccountId = fromUser.accountId;
                        toNickName = toUser.nickName, toAccountId = toUser.accountId;
                        botUrl = this.envProvider.BOT_URL;
                        return [2 /*return*/, this.nsp.sendMessage('POST', {
                                privateChannelId: this.envProvider.PRIVATE_CHANNEL_ID,
                                amount: amount,
                                amountWithFee: amountWithFee,
                                amountUsd: amountUsd,
                                amountWithFeeUsd: amountWithFeeUsd,
                                feeCoin: feeCoin,
                                feeUsd: feeUsd,
                                fromNickName: fromNickName,
                                fromAccountId: fromAccountId,
                                toNickName: toNickName,
                                toAccountId: toAccountId,
                                action: action,
                                date: date,
                                coinType: coinType
                            }, botUrl + "/transactionReportToPrivateChannel")];
                }
            });
        });
    };
    ReportProvider.prototype.dailyReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var OutgoingTransactionModel, IncomingTransactionModel, UserModel, createdDateQuery, updatedDateQuery, totalUsers, newUsers, totalWithdraw, newWithdraw, totalInternalWithdraw, newInternalWithdraw, totalIncome, newIncome, totalEasyTransfer, newEasyTransfer, botUrl, date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        OutgoingTransactionModel = this.nsp.getEntityModel(types_1.EntityEnum.OUTGOING_TRANSACTION);
                        IncomingTransactionModel = this.nsp.getEntityModel(types_1.EntityEnum.INCOMING_TRANSACTION);
                        UserModel = this.nsp.getEntityModel(types_1.EntityEnum.USER);
                        createdDateQuery = {
                            createdAt: {
                                $gte: moment_1.default().subtract(1, 'days').startOf('day').toString(),
                                $lte: moment_1.default().subtract(1, 'days').endOf('day').toString()
                            }
                        };
                        updatedDateQuery = {
                            updatedAt: {
                                $gte: moment_1.default().subtract(1, 'days').startOf('day').toString(),
                                $lte: moment_1.default().subtract(1, 'days').endOf('day').toString()
                            }
                        };
                        return [4 /*yield*/, UserModel.find().count()];
                    case 1:
                        totalUsers = _a.sent();
                        return [4 /*yield*/, UserModel.find(createdDateQuery).count()];
                    case 2:
                        newUsers = _a.sent();
                        return [4 /*yield*/, OutgoingTransactionModel.find({ method: types_1.OutgoingTransactionMethod.Withdraw, status: types_1.TransactionStatus.Completed }).count()];
                    case 3:
                        totalWithdraw = _a.sent();
                        return [4 /*yield*/, OutgoingTransactionModel.find(__assign({ method: types_1.OutgoingTransactionMethod.Withdraw, status: types_1.TransactionStatus.Completed }, updatedDateQuery)).count()];
                    case 4:
                        newWithdraw = _a.sent();
                        return [4 /*yield*/, OutgoingTransactionModel.find({ method: types_1.OutgoingTransactionMethod.InternalWithdraw, status: types_1.TransactionStatus.Completed }).count()];
                    case 5:
                        totalInternalWithdraw = _a.sent();
                        return [4 /*yield*/, OutgoingTransactionModel.find(__assign({ method: types_1.OutgoingTransactionMethod.InternalWithdraw, status: types_1.TransactionStatus.Completed }, createdDateQuery)).count()];
                    case 6:
                        newInternalWithdraw = _a.sent();
                        return [4 /*yield*/, IncomingTransactionModel.find({ method: types_1.IncomingTransactionMethod.Payment, status: types_1.TransactionStatus.Completed }).count()];
                    case 7:
                        totalIncome = _a.sent();
                        return [4 /*yield*/, IncomingTransactionModel.find(__assign({ method: types_1.IncomingTransactionMethod.Payment, status: types_1.TransactionStatus.Completed }, updatedDateQuery)).count()];
                    case 8:
                        newIncome = _a.sent();
                        return [4 /*yield*/, IncomingTransactionModel.find({ method: types_1.IncomingTransactionMethod.EasyTransfer, status: types_1.TransactionStatus.Completed }).count()];
                    case 9:
                        totalEasyTransfer = _a.sent();
                        return [4 /*yield*/, IncomingTransactionModel.find(__assign({ method: types_1.IncomingTransactionMethod.EasyTransfer, status: types_1.TransactionStatus.Completed }, createdDateQuery)).count()];
                    case 10:
                        newEasyTransfer = _a.sent();
                        botUrl = this.envProvider.BOT_URL;
                        date = moment_1.default().format(utils_1.reportsDateFormat);
                        return [2 /*return*/, this.nsp.sendMessage('POST', {
                                privateChannelId: this.envProvider.PRIVATE_CHANNEL_ID,
                                date: date,
                                totalUsers: totalUsers,
                                newUsers: newUsers,
                                totalWithdraw: totalWithdraw,
                                newWithdraw: newWithdraw,
                                totalInternalWithdraw: totalInternalWithdraw,
                                newInternalWithdraw: newInternalWithdraw,
                                totalIncome: totalIncome,
                                newIncome: newIncome,
                                totalEasyTransfer: totalEasyTransfer,
                                newEasyTransfer: newEasyTransfer
                            }, botUrl + "/dailyReportToPrivateChannel")];
                }
            });
        });
    };
    ReportProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Session
        }),
        __param(0, di_1.Inject(namespace_entity_provider_1.NamespaceEntityProvider)),
        __param(1, di_1.Inject(env_default_provider_1.DefaultEnvProvider)),
        __metadata("design:paramtypes", [namespace_entity_provider_1.NamespaceEntityProvider,
            env_default_provider_1.DefaultEnvProvider])
    ], ReportProvider);
    return ReportProvider;
}(base_provider_1.AsyncInitProvider));
exports.ReportProvider = ReportProvider;
//# sourceMappingURL=report.provider.js.map