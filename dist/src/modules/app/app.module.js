"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppModule = void 0;
var core_1 = require("@graphql-modules/core");
var backend_1 = require("@spot_wallet/backend");
exports.createAppModule = function (moduleName) {
    var gModule = null;
    switch (moduleName.toLowerCase()) {
        case 'backend':
            gModule = new core_1.GraphQLModule({
                imports: [backend_1.createBackendModule()]
            });
            break;
        default: {
            throw new Error('ERROR - Wrong type of module specified');
        }
    }
    return gModule;
};
//# sourceMappingURL=app.module.js.map