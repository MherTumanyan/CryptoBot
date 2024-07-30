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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypes = exports.mergeGraphqlSchemas = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var glob_1 = __importDefault(require("glob"));
var glob_watcher_1 = __importDefault(require("glob-watcher"));
var cli_1 = require("@graphql-codegen/cli");
var gql_schema_mongoose_1 = require("@sfast/gql-schema-mongoose");
var gql_schema_parser_1 = require("@sfast/gql-schema-parser");
var graphql_1 = require("graphql");
exports.mergeGraphqlSchemas = function (generateConfig) {
    var include = generateConfig.include, exclude = generateConfig.exclude, graphqlPath = generateConfig.graphqlPath, root = generateConfig.root;
    var pathToModules = path_1.default.resolve(__dirname, root);
    var includePathRoot = path_1.default.join(pathToModules, include);
    var excludePathRoot = path_1.default.join(pathToModules, exclude);
    return glob_1.default
        .sync(includePathRoot, { ignore: [excludePathRoot, path_1.default.join(pathToModules, graphqlPath)] }) // TODO second one give from config
        .map(function (file) { return fs_1.readFileSync(file, { encoding: 'utf8' }); });
};
exports.generateTypes = function (generateConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var include, exclude, tsPath, graphqlPath, root, watch, options, pathToModules, includePathRoot, excludePathRoot, mergedSchemas, graph, tsPathRoot, graphqlPathRoot, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                include = generateConfig.include, exclude = generateConfig.exclude, tsPath = generateConfig.tsPath, graphqlPath = generateConfig.graphqlPath, root = generateConfig.root, watch = generateConfig.watch;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                if (watch) {
                    options = {
                        ignoreInitial: false,
                        delay: 1000
                    };
                    pathToModules = path_1.default.resolve(__dirname, root);
                    includePathRoot = path_1.default.join(pathToModules, include);
                    excludePathRoot = path_1.default.join(pathToModules, exclude);
                    return [2 /*return*/, glob_watcher_1.default([includePathRoot, "!" + excludePathRoot], options, function (done) {
                            exports.generateTypes(__assign(__assign({}, generateConfig), { watch: false }));
                            done();
                        })];
                }
                mergedSchemas = exports.mergeGraphqlSchemas(generateConfig);
                graph = new gql_schema_parser_1.GraphEntityParser(graphql_1.parse(mergedSchemas.join('\n')));
                tsPathRoot = path_1.default.join(root, tsPath);
                graphqlPathRoot = path_1.default.join(root, graphqlPath);
                return [4 /*yield*/, fs_1.promises.writeFile(path_1.default.resolve(__dirname, graphqlPathRoot), gql_schema_mongoose_1.DIRECTIVES + "\n" + graph.printSchema(graph.getSchema()))];
            case 2:
                _b.sent();
                return [4 /*yield*/, cli_1.generate({
                        schema: [gql_schema_mongoose_1.DIRECTIVES, graph.printSchema(graph.getSchema())],
                        generates: (_a = {},
                            _a[path_1.default.resolve(__dirname, tsPathRoot)] = {
                                plugins: ['typescript', 'typescript-resolvers']
                            },
                            _a)
                    }, true)];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.error(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=utils.js.map