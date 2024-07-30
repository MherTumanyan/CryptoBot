"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversComposition = void 0;
var utils_1 = require("@graphql-modules/utils");
var isAuthenticated_1 = __importDefault(require("./isAuthenticated"));
var isAdmin_1 = __importDefault(require("./isAdmin"));
var isService_1 = __importDefault(require("./isService"));
var DIRECTIVE_TO_GUARD = {
    isAuthenticated: isAuthenticated_1.default,
    isAdmin: isAdmin_1.default,
    isService: isService_1.default
};
exports.resolversComposition = function (_a) {
    var typeDefs = _a.typeDefs;
    var fieldsAndTypeToDirectivesMap = utils_1.getFieldsWithDirectives(typeDefs);
    var result = {};
    Object.entries(fieldsAndTypeToDirectivesMap).forEach(function (entry) {
        var _a = __read(entry, 2), key = _a[0], value = _a[1];
        if (value.length > 0) {
            result[key] = value.reduce(function (acc, directive) {
                if (DIRECTIVE_TO_GUARD[directive.name]) {
                    var mapperFn = DIRECTIVE_TO_GUARD[directive.name];
                    var resultFn = mapperFn(directive.args);
                    return __spread(acc, [resultFn]);
                }
                return acc;
            }, []);
        }
    });
    return result;
};
//# sourceMappingURL=resolvers-composition.js.map