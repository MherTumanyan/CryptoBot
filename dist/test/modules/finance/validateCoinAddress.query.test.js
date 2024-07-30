"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var types_1 = require("@spot_wallet/types");
var helper_1 = require("../../helper");
var utils_1 = require("../../utils");
var ReceivingAddressModel = helper_1.getModels('ReceivingAddress', 'receivingAddress');
var input1 = {
    title: 'when Coin address not valid',
    query: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  { \n    validateCoinAddress(coinType: ", ", coinAddress: \"294a463e-d705-53f9-82d2-65fedeef5c77\") {\n        success, \n        code, \n        error\n      }\n    }\n  "], ["\n  { \n    validateCoinAddress(coinType: ", ", coinAddress: \"294a463e-d705-53f9-82d2-65fedeef5c77\") {\n        success, \n        code, \n        error\n      }\n    }\n  "])), types_1.CoinType.Dash),
    expected: {
        data: {
            validateCoinAddress: {
                success: false,
                code: 400,
                error: '',
            }
        }
    }
};
var input2 = {
    title: 'when Coin address is valid',
    query: graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    { \n      validateCoinAddress(coinType: ", ", coinAddress: \"1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck\" ) {\n          success, \n          code, \n          error\n        }\n      }\n    "], ["\n    { \n      validateCoinAddress(coinType: ", ", coinAddress: \"1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck\" ) {\n          success, \n          code, \n          error\n        }\n      }\n    "])), types_1.CoinType.Btc),
    expected: {
        data: {
            validateCoinAddress: {
                success: true,
                code: 200,
                error: '',
            }
        }
    }
};
var input3 = {
    title: 'when address belongs to sender',
    query: graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    { \n      validateCoinAddress(coinType: ", ", coinAddress: \"dshdsfnsdljfsdf\" ) {\n          success, \n          code, \n          error\n        }\n      }\n    "], ["\n    { \n      validateCoinAddress(coinType: ", ", coinAddress: \"dshdsfnsdljfsdf\" ) {\n          success, \n          code, \n          error\n        }\n      }\n    "])), types_1.CoinType.Btc),
    expected: {
        data: {
            validateCoinAddress: {
                success: false,
                code: 409,
                error: '',
            }
        }
    }
};
describe.each(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  input\n  ", "\n  ", "\n  ", "\n  "], ["\n  input\n  ", "\n  ", "\n  ", "\n  "])), input1, input2, input3)('When the :input is $input', function (_a) {
    var input = _a.input;
    it("" + input.title, function () { return __awaiter(void 0, void 0, void 0, function () {
        var query, expected, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = input.query, expected = input.expected;
                    return [4 /*yield*/, ReceivingAddressModel.create(utils_1.receivingAddressData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, helper_1.data(query, { injector: helper_1.injector, ReceivingAddressModel: ReceivingAddressModel, user: utils_1.user6 })];
                case 2:
                    result = _a.sent();
                    expect(result).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=validateCoinAddress.query.test.js.map