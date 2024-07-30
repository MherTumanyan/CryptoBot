"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var configOptions = {
    include: './**/*.graphql',
    exclude: './**/*.spec.graphql',
    tsPath: './core/types/genTypes.ts',
    graphqlPath: './core/types/genTypes.graphql',
    root: '../modules',
    watch: false
};
// TODO get watch from --watch, package.json (cli)
utils_1.generateTypes(configOptions);
//# sourceMappingURL=build.js.map