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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaProvider = void 0;
var path_1 = __importDefault(require("path"));
var glob_1 = __importDefault(require("glob"));
var di_1 = require("@graphql-modules/di");
var graphql_toolkit_1 = require("graphql-toolkit");
var gql_schema_parser_1 = require("@sfast/gql-schema-parser");
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var lodash_1 = require("lodash");
var base_provider_1 = require("./base.provider");
var SchemaProvider = /** @class */ (function (_super) {
    __extends(SchemaProvider, _super);
    function SchemaProvider() {
        return _super.call(this, 'SchemaProvider') || this;
    }
    SchemaProvider.prototype.initializer = function () {
        try {
            console.log('SchemaProvider onInit - START');
            // ** those are all the models we have in a system
            // ** this part has lots of common things with envisioned engine
            var coreSchemasPath = path_1.default.resolve(__dirname, '../schema/');
            var schemas = glob_1.default
                .sync(coreSchemasPath + "/**/*.graphql", { ignore: coreSchemasPath + "/**/*.spec.graphql" })
                .map(function (file) { return graphql_toolkit_1.loadSchemaFiles(file); });
            this.typeDefs = [gql_schema_parser_1.DIRECTIVES, schemas].join('');
            var dn = graphql_tag_1.default(this.typeDefs);
            this.graphParser = new gql_schema_parser_1.GraphEntityParser(dn);
            console.log('SchemaProvider onInit - END');
        }
        catch (err) {
            throw new Error(err.message);
        }
    };
    Object.defineProperty(SchemaProvider.prototype, "entities", {
        get: function () {
            return this.graphParser.entities;
        },
        enumerable: false,
        configurable: true
    });
    SchemaProvider.prototype.getNamespaceEntities = function (namespace) {
        return lodash_1.reduce(this.graphParser.entities, function (acc, entityItem) {
            if (entityItem.namespace.indexOf(namespace) > -1)
                acc.push(entityItem);
            return acc;
        }, []);
    };
    SchemaProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Application
        }),
        __metadata("design:paramtypes", [])
    ], SchemaProvider);
    return SchemaProvider;
}(base_provider_1.SyncInitProvider));
exports.SchemaProvider = SchemaProvider;
//# sourceMappingURL=schema.provider.js.map