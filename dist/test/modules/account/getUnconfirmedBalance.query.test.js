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
var modules = __importStar(require("../../../src/utils/helpers"));
var helper_1 = require("../../helper");
var utils_1 = require("../../utils");
var IncomingTransactionModel = helper_1.getModels('IncomingTransaction', 'incomingTransaction');
var input1 = {
    title: 'test getUnconfirmedBalance query',
    query: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n   {\n    getUnconfirmedBalance {\n      unconfirmedBalance {\n        USDT\n        BTC\n        ETH \n        DASH\n      }\n      unconfirmedBalanceUSD {\n        USDT\n        BTC\n        ETH \n        DASH\n      }\n      }\n    }\n  "], ["\n   {\n    getUnconfirmedBalance {\n      unconfirmedBalance {\n        USDT\n        BTC\n        ETH \n        DASH\n      }\n      unconfirmedBalanceUSD {\n        USDT\n        BTC\n        ETH \n        DASH\n      }\n      }\n    }\n  "]))),
    expected: {
        data: {
            getUnconfirmedBalance: {
                unconfirmedBalance: {
                    USDT: 42,
                    BTC: 42,
                    ETH: 42,
                    DASH: 42
                },
                unconfirmedBalanceUSD: {
                    USDT: 42,
                    BTC: 42,
                    ETH: 42,
                    DASH: 42
                }
            }
        }
    }
};
describe.each(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  input\n  ", "\n"], ["\n  input\n  ", "\n"])), input1)('When the :input is $input', function (_a) {
    var input = _a.input;
    it("" + input.title, function () { return __awaiter(void 0, void 0, void 0, function () {
        var query, expected, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // @ts-ignore
                    modules.numberToFixed = jest.fn().mockReturnValue(42);
                    query = input.query, expected = input.expected;
                    return [4 /*yield*/, IncomingTransactionModel.create(utils_1.incomingTransactionData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, helper_1.data(query, { user: utils_1.user1, IncomingTransactionModel: IncomingTransactionModel, injector: helper_1.injector })];
                case 2:
                    result = _a.sent();
                    expect(result).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=getUnconfirmedBalance.query.test.js.map