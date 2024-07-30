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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendDBInitProvider = void 0;
var di_1 = require("@graphql-modules/di");
var core_1 = require("@spot_wallet/core");
var utils_1 = require("../../backend/utils");
// ** Init provider - for everything we need for backend initialization
var BackendDBInitProvider = /** @class */ (function (_super) {
    __extends(BackendDBInitProvider, _super);
    function BackendDBInitProvider(nsp, schemaProvider, envProvider, reportProvider, historyMetaProvider) {
        var _this = _super.call(this, 'BackendDBInitProvider') || this;
        _this.nsp = nsp;
        _this.schemaProvider = schemaProvider;
        _this.envProvider = envProvider;
        _this.reportProvider = reportProvider;
        _this.historyMetaProvider = historyMetaProvider;
        return _this;
    }
    BackendDBInitProvider.prototype.initializer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, MASTER_MONGO_URL, MASTER_MONGO_DATABASE, MASTER_MONGO_ARGS, masterNamespace, masterEntitites;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('BackendDBInitProvider onInit - STARTED');
                        // ** INITIALIZATION PART
                        this.schemaProvider.onInit();
                        this.envProvider.onInit();
                        this.nsp.onInit();
                        return [4 /*yield*/, this.reportProvider.onInit()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.historyMetaProvider.onInit()];
                    case 2:
                        _b.sent();
                        _a = this.envProvider, MASTER_MONGO_URL = _a.MASTER_MONGO_URL, MASTER_MONGO_DATABASE = _a.MASTER_MONGO_DATABASE, MASTER_MONGO_ARGS = _a.MASTER_MONGO_ARGS;
                        masterNamespace = {
                            url: MASTER_MONGO_URL + "/" + MASTER_MONGO_DATABASE + MASTER_MONGO_ARGS,
                        };
                        masterEntitites = this.schemaProvider.getNamespaceEntities('master');
                        return [4 /*yield*/, this.nsp.registerEntities(masterEntitites)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.nsp.registerNamespace(masterNamespace)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.nsp.attachStorageEmitter(core_1.EntityEnum.INCOMING_TRANSACTION)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.nsp.attachStorageEmitter(core_1.EntityEnum.OUTGOING_TRANSACTION)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.nsp.attachStorageEmitter(core_1.EntityEnum.RECEIVING_ADDRESS)];
                    case 7:
                        _b.sent();
                        this.nsp.on('change', function (_a) {
                            var data = _a.data, entityName = _a.entityName, operationType = _a.operationType;
                            _this.reportProvider.sendReport(data, entityName);
                            _this.historyMetaProvider.changeHistoryMetaTxStatus(data, entityName);
                            utils_1.pubsub.publish('SCHEMA_CHANGED', { data: data, entityName: entityName, operationType: operationType });
                        });
                        this.nsp.ready();
                        console.log('BackendDBInitProvider onInit - END');
                        return [2 /*return*/];
                }
            });
        });
    };
    BackendDBInitProvider.prototype.getEntityModel = function (entityName) {
        return this.nsp.getEntityModel(entityName);
    };
    BackendDBInitProvider = __decorate([
        di_1.Injectable({
            scope: di_1.ProviderScope.Application
        }),
        __param(0, di_1.Inject(core_1.NamespaceEntityProvider)),
        __param(1, di_1.Inject(core_1.SchemaProvider)),
        __param(2, di_1.Inject(core_1.DefaultEnvProvider)),
        __param(3, di_1.Inject(core_1.ReportProvider)),
        __param(4, di_1.Inject(core_1.HistoryMetaProvider)),
        __metadata("design:paramtypes", [core_1.NamespaceEntityProvider,
            core_1.SchemaProvider,
            core_1.DefaultEnvProvider,
            core_1.ReportProvider,
            core_1.HistoryMetaProvider])
    ], BackendDBInitProvider);
    return BackendDBInitProvider;
}(core_1.AsyncInitProvider));
exports.BackendDBInitProvider = BackendDBInitProvider;
//# sourceMappingURL=backend.db.init.js.map