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
require("module-alias/register");
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
// tslint:disable-next-line:ordered-imports
var apollo_server_express_1 = require("apollo-server-express");
var Sentry = __importStar(require("@sentry/node"));
var app_1 = require("@spot_wallet/app");
var utils_1 = require("@spot_wallet/utils");
dotenv.config();
var run = function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
    var PORT, BTC_CHANGE_ENV, HOST, appModule, contextGenerator, appoloServerConfig, apolloServer, app, httpServer;
    return __generator(this, function (_a) {
        PORT = process.env.PORT || 7000;
        console.log('PORT::::::::::back:::::::', PORT);
        BTC_CHANGE_ENV = process.env.BCLUSTER_ENV || 'backend';
        HOST = '127.0.0.1';
        console.log('PORT, BTC_CHANGE_ENV, HOST::::::::::::', PORT, BTC_CHANGE_ENV, HOST);
        appModule = app_1.createAppModule(BTC_CHANGE_ENV);
        // await appModule.injector.get(BackendInitProvider).onInit();
        // eslint-disable-next-line no-unused-expressions
        appModule.injector;
        console.log('ssssssssssssssssssssssssssssssssssssss');
        // sentry Initializer
        // sentryInitializer(Sentry);
        console.log('zzzzzzzzzzzzzzzzzzzzzzz');
        contextGenerator = function (_a) {
            var req = _a.req, connection = _a.connection;
            return __awaiter(void 0, void 0, void 0, function () {
                var token;
                return __generator(this, function (_b) {
                    if (connection)
                        return [2 /*return*/, connection.context];
                    token = req.headers.authorization || '';
                    return [2 /*return*/, { token: token }];
                });
            });
        };
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
        appoloServerConfig = {
            // ** We can use GQL module in appolo server and use context builder like ...MyAccountsModule.context({ req, res })
            modules: [appModule],
            // schema,
            context: contextGenerator,
            subscriptions: {
                onConnect: function (connectionParams) {
                    // tslint:disable-next-line:curly
                    if (connectionParams.Authorization) {
                        return { token: connectionParams.Authorization };
                    }
                }
            },
            plugins: [
                {
                    requestDidStart: function () {
                        return {
                            didEncounterErrors: utils_1.didEncounterErrors(Sentry),
                        };
                    },
                },
            ],
        };
        apolloServer = new apollo_server_express_1.ApolloServer(appoloServerConfig);
        console.log('2222222222222222222222222222222222222222222222222222222222');
        app = express_1.default();
        apolloServer.applyMiddleware({ app: app });
        httpServer = http_1.createServer(app);
        console.log('++++++++++++++++++++++++111111111111++++++++++++++++++++++++');
        apolloServer.installSubscriptionHandlers(httpServer);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++');
        httpServer.listen({ port: PORT, host: HOST }, function () {
            console.log('http://${HOST}:${PORT}${apolloServer.graphqlPath}:::::::::::', "http://" + HOST + ":" + PORT + apolloServer.graphqlPath);
            // tslint:disable-next-line: no-console
            console.info("\uD83D\uDE80 Server ready at http://" + HOST + ":" + PORT + apolloServer.graphqlPath);
            // tslint:disable-next-line: no-console
            console.info("\uD83D\uDE80 Subsciription ready at ws://" + HOST + ":" + PORT + apolloServer.subscriptionsPath);
            resolve();
        });
        app.get('/health', function (req, res) { return res.status(200).send({ status: 'OK' }); });
        return [2 /*return*/];
    });
}); };
var startPromise = new Promise(run);
startPromise
    .then(function () {
    console.log('!!! Crypto Spot backend Started !!!!');
})
    .catch(function (err) {
    console.error('!!! ERROR !!!!', err);
});
//# sourceMappingURL=server.js.map