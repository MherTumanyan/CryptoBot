"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
require("reflect-metadata");
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var graphql_1 = require("graphql");
var apollo_server_core_1 = require("apollo-server-core");
var core_1 = require("@spot_wallet/core");
var helper_1 = require("../../helper");
var modules = __importStar(require("../../../src/utils/helpers"));
var utils_1 = require("../../utils");
var UserModel = helper_1.getModels('User', 'users');
var OutgoingTransactionModel = helper_1.getModels('OutgoingTransaction', 'outgoingTransaction');
var input1 = {
    title: 'when trasaction status Canceled',
    query: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation{ \n    checkOutgoingTransactionStatus {\n        error, \n        code, \n        success \n      }\n    }\n  "], ["\n  mutation{ \n    checkOutgoingTransactionStatus {\n        error, \n        code, \n        success \n      }\n    }\n  "]))),
    expected: {
        data: {
            checkOutgoingTransactionStatus: {
                error: '',
                code: 200,
                success: true
            }
        }
    }
};
var input2 = {
    title: 'when trasaction status Completed',
    query: graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation{ \n    checkOutgoingTransactionStatus {\n        error, \n        code, \n        success \n      }\n    }\n  "], ["\n  mutation{ \n    checkOutgoingTransactionStatus {\n        error, \n        code, \n        success \n      }\n    }\n  "]))),
    trasactionStatusCompleted: true,
    expected: {
        data: {
            checkOutgoingTransactionStatus: {
                error: '',
                code: 200,
                success: true
            }
        }
    }
};
var input3 = {
    title: 'Checking catch block',
    query: graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      mutation{\n        checkOutgoingTransactionStatus(orderId: \"TT8439241\") {\n              error,\n              code,\n              success\n          }\n      }\n  "], ["\n      mutation{\n        checkOutgoingTransactionStatus(orderId: \"TT8439241\") {\n              error,\n              code,\n              success\n          }\n      }\n  "]))),
    expected: {
        error: new apollo_server_core_1.ApolloError('message')
    }
};
describe.each(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  input\n  ", "\n  ", "\n  ", "\n"], ["\n  input\n  ", "\n  ", "\n  ", "\n"])), input1, input2, input3)('When the :input is $input', function (_a) {
    var input = _a.input;
    it("" + input.title, function () { return __awaiter(void 0, void 0, void 0, function () {
        var query, expected, trasactionStatusCompleted, isApolloError_1, expectedError_1, result_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = input.query, expected = input.expected, trasactionStatusCompleted = input.trasactionStatusCompleted;
                    return [4 /*yield*/, OutgoingTransactionModel.create({ userId: '5656c6d2-b3a3-46bf-a3f9-5aba260bb160', status: core_1.TransactionStatus.Sent, method: core_1.OutgoingTransactionMethod.Withdraw })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, UserModel.create(utils_1.user6)];
                case 2:
                    _a.sent();
                    if (trasactionStatusCompleted) {
                        helper_1.injector.provide({
                            provide: core_1.CoinbaseProvider,
                            overwrite: true,
                            useValue: {
                                // @ts-ignore
                                getTransaction: function () { return Promise.resolve({ status: 'CANCELED', network: { transaction_url: 'url' } }); },
                            }
                        });
                    }
                    if (!input.expected.error) return [3 /*break*/, 4];
                    isApolloError_1 = input.expected.error instanceof apollo_server_core_1.ApolloError;
                    expectedError_1 = isApolloError_1 ? input.expected.error : false;
                    // @ts-ignore
                    modules.isValidTransferAmount = jest.fn().mockImplementation(function () {
                        if (isApolloError_1)
                            throw expectedError_1;
                        return expectedError_1;
                    });
                    return [4 /*yield*/, helper_1.data(query, {})];
                case 3:
                    result_1 = _a.sent();
                    // @ts-ignore
                    return [2 /*return*/, isApolloError_1 ? expect(result_1.errors[0]).toBeInstanceOf(graphql_1.GraphQLError) : expect(result_1.data.acceptEasyTransferOrder.code).toEqual(input.expected.error)];
                case 4: return [4 /*yield*/, helper_1.data(query, { injector: helper_1.injector, user: utils_1.user6, UserModel: UserModel, OutgoingTransactionModel: OutgoingTransactionModel })];
                case 5:
                    result = _a.sent();
                    expect(result).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=checkOutgoingTransactionStatus.mutation.test.js.map