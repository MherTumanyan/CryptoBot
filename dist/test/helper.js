"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.injector = exports.data = exports.getModels = exports.schema = exports.typeDef = void 0;
var path_1 = require("path");
var graphql_1 = require("graphql");
var mongoose_1 = __importStar(require("mongoose"));
var graphql_toolkit_1 = require("graphql-toolkit");
var merge_1 = require("@graphql-tools/merge");
var load_files_1 = require("@graphql-tools/load-files");
var gql_schema_mongoose_1 = require("@sfast/gql-schema-mongoose");
var graphql_tools_1 = require("@kamilkisiela/graphql-tools");
var app_1 = require("../src/modules/app");
var lodash_1 = require("lodash");
exports.typeDef = function () {
    var schemaPath = path_1.resolve('src/modules/core/types/genTypes.graphql');
    var accountModuleTypeDefs = load_files_1.loadFilesSync(schemaPath, { extensions: ['.graphql'] });
    return merge_1.mergeTypeDefs(accountModuleTypeDefs);
};
var modules = ['src/modules/account/resolvers', 'src/modules/admin/resolvers', 'src/modules/finance/resolvers'];
var resolvers = [];
lodash_1.forEach(modules, function (module) {
    resolvers.push.apply(resolvers, __spread(graphql_toolkit_1.loadResolversFiles(path_1.resolve(module))));
});
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: exports.typeDef(),
    resolvers: resolvers,
});
exports.getModels = function (schemaName, collection) {
    var mongooseParser = new gql_schema_mongoose_1.ParseToMongoose(exports.typeDef(), { mongoose: mongoose_1.default });
    var mod = mongooseParser.getEntitySchema(schemaName);
    return mongoose_1.default.model(collection, new mongoose_1.Schema(mod));
};
exports.data = function (document, contextValue) { return graphql_1.execute({
    schema: exports.schema,
    document: document,
    contextValue: contextValue
}); };
exports.injector = app_1.createAppModule('backend').injector;
//# sourceMappingURL=helper.js.map