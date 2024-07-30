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
exports.NamespaceEntityProvider = void 0;
var typedi_1 = require("typedi");
var di_1 = require("@graphql-modules/di");
var gql_schema_mongoose_1 = require("@sfast/gql-schema-mongoose");
var mongoose_1 = require("mongoose");
var lodash_1 = require("lodash");
var request_promise_1 = __importDefault(require("request-promise"));
var utils_1 = require("@spot_wallet/utils");
var env_default_provider_1 = require("./env.default.provider");
var base_provider_1 = require("./base.provider");
var types_1 = require("../types");
var NAMESPACE_READY = 'NAMESPACE_READY';
var NamespaceEntityProvider = /** @class */ (function (_super) {
    __extends(NamespaceEntityProvider, _super);
    function NamespaceEntityProvider(envProvider) {
        var _this = _super.call(this, 'NamespaceEntityProvider') || this;
        _this.envProvider = envProvider;
        return _this;
    }
    NamespaceEntityProvider.prototype.initializer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        console.log('NamespaceEntityProvider onInit - START');
                        _this.envProvider.onInit();
                        console.log('NamespaceEntityProvider onInit - END');
                        _this.once(NAMESPACE_READY, resolve);
                    })];
            });
        });
    };
    NamespaceEntityProvider.prototype.ready = function () {
        this.emit(NAMESPACE_READY);
    };
    NamespaceEntityProvider.prototype.registerNamespace = function (mongoConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var url, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = mongoConfig.url, config = mongoConfig.config;
                        return [4 /*yield*/, utils_1.connect(url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NamespaceEntityProvider.prototype.registerEntities = function (entities, dbType) {
        var _this = this;
        if (dbType === void 0) { dbType = 'mongo'; }
        console.log('NamespaceEntityProvider registerEntities');
        return lodash_1.reduce(entities, function (prevPromise, entityDef) { return __awaiter(_this, void 0, void 0, function () {
            var name, entitySchema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prevPromise];
                    case 1:
                        _a.sent();
                        name = entityDef.name;
                        switch (dbType) {
                            case 'mongo':
                                {
                                    entitySchema = {
                                        name: name,
                                        schema: gql_schema_mongoose_1.createMongooseSchema(entityDef),
                                        options: {
                                            collection: entityDef.collection
                                        },
                                    };
                                    this.registerSchema(entitySchema);
                                }
                                break;
                            default:
                                throw new Error(utils_1.UnknownStorageType);
                        }
                        return [2 /*return*/];
                }
            });
        }); }, Promise.resolve());
    };
    NamespaceEntityProvider.prototype.registerSchema = function (entitySchema) {
        var name = entitySchema.name, schema = entitySchema.schema;
        var entityModel = mongoose_1.model(name, schema);
        typedi_1.Container.set(name, entityModel);
    };
    NamespaceEntityProvider.prototype.getEntityModel = function (entityName) {
        return typedi_1.Container.get(entityName);
    };
    NamespaceEntityProvider.prototype.attachStorageEmitter = function (entityName) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            var _this = this;
            return __generator(this, function (_a) {
                model = this.getEntityModel(entityName);
                model.watch([], { fullDocument: 'updateLookup' }).on('change', function (data) {
                    if (data.operationType === 'insert' || data.operationType === 'update' || data.operationType === 'replace') {
                        _this.emit('change', { data: data.fullDocument, entityName: entityName, operationType: data.operationType });
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    NamespaceEntityProvider.prototype.sendMessage = function (method, body, url, headers, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var botUrl, includesIds, allTelegramIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        botUrl = this.envProvider.BOT_URL;
                        includesIds = Object.keys(body).some(function (key) { return utils_1.TELEGRAM_ID_KEYS.includes(key); });
                        if (!url.includes(botUrl) || !includesIds || force)
                            return [2 /*return*/, this.request(method, body, url, headers)];
                        allTelegramIds = [];
                        return [4 /*yield*/, Promise.all(utils_1.TELEGRAM_ID_KEYS.map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                                var value, filteredIds;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            value = lodash_1.get(body, key);
                                            if (!value)
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this.filterTelegramIds(value)];
                                        case 1:
                                            filteredIds = _a.sent();
                                            allTelegramIds.push.apply(allTelegramIds, __spread(filteredIds));
                                            lodash_1.set(body, key, lodash_1.isArray(value) ? filteredIds : filteredIds[0]);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        if (!allTelegramIds.length)
                            return [2 /*return*/];
                        return [2 /*return*/, this.request(method, body, url, headers)];
                }
            });
        });
    };
    NamespaceEntityProvider.prototype.request = function (method, body, url, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = {
                    method: method,
                    uri: url,
                    headers: __assign({ 'User-Agent': 'Request-Promise' }, headers),
                    body: body,
                    json: true // Automatically stringifies the body to JSON
                };
                return [2 /*return*/, request_promise_1.default(options)];
            });
        });
    };
    NamespaceEntityProvider.prototype.filterTelegramIds = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var UserModel, tgIds, filteredTelegramIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        UserModel = this.getEntityModel(types_1.EntityEnum.USER);
                        tgIds = lodash_1.isArray(ids) ? ids : [ids];
                        filteredTelegramIds = [];
                        return [4 /*yield*/, Promise.all(lodash_1.map(tgIds, function (value) { return __awaiter(_this, void 0, void 0, function () {
                                var telegramId, user;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            telegramId = (value === null || value === void 0 ? void 0 : value.telegramId) || value;
                                            return [4 /*yield*/, UserModel.findOne({ telegramId: telegramId }, { notify: 1, _id: 0 })];
                                        case 1:
                                            user = _a.sent();
                                            if (user === null || user === void 0 ? void 0 : user.notify)
                                                filteredTelegramIds.push(value);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, filteredTelegramIds];
                }
            });
        });
    };
    NamespaceEntityProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Application
        }),
        __param(0, di_1.Inject(env_default_provider_1.DefaultEnvProvider)),
        __metadata("design:paramtypes", [env_default_provider_1.DefaultEnvProvider])
    ], NamespaceEntityProvider);
    return NamespaceEntityProvider;
}(base_provider_1.AsyncInitProvider));
exports.NamespaceEntityProvider = NamespaceEntityProvider;
//# sourceMappingURL=namespace.entity.provider.js.map