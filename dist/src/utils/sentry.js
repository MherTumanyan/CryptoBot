"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentryInitializer = exports.didEncounterErrors = void 0;
var apollo_server_1 = require("apollo-server");
var lodash_1 = require("lodash");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ignoreErrors = [
    '401: Unauthorized',
    'Unauthenticated',
    'Unauthorized',
    '401: Unauthenticated',
    'GraphQLError: Unauthenticated',
];
exports.didEncounterErrors = function (Sentry) { return function (ctx) {
    // If we couldn't parse the operation, don't
    // do anything here
    if (!ctx.operation) {
        return;
    }
    if (lodash_1.get(ctx.context, 'req'))
        ctx.context.req.error = true;
    var errors = ctx.errors.filter(function (err) {
        var isNotApolloerror = !(err instanceof apollo_server_1.ApolloError);
        var shouldNotIgnore = ignoreErrors.indexOf(lodash_1.get(err, 'message', '')) === -1;
        return isNotApolloerror && shouldNotIgnore;
    });
    errors.forEach(function (err) {
        // decode and get user telegramId
        var telegramId = jsonwebtoken_1.default.decode(ctx.context.token, process.env.JWT_SECRET).telegramId;
        // Add scoped report details and send to Sentry
        Sentry.withScope(function (scope) {
            // Annotate whether failing operation was query/mutation/subscription
            scope.setTag('kind', ctx.operation.operation);
            // Log query and variables as extras (make sure to strip out sensitive data!)
            scope.setExtra('query', ctx.request.query);
            scope.setExtra('variables', ctx.request.variables);
            scope.setUser({ telegramId: telegramId });
            if (err.path) {
                // We can also add the path as breadcrumb
                scope.addBreadcrumb({
                    category: 'query-path',
                    message: err.path.join(' > '),
                    level: Sentry.Severity.Debug,
                });
            }
            Sentry.captureException(err);
        });
    });
}; };
exports.sentryInitializer = function (Sentry) {
    if (process.env.SENTRY_DSN && Boolean(process.env.ENABLE_SENTRY)) {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            environment: process.env.NODE_ENV,
            release: process.env.VERSION,
        });
    }
};
//# sourceMappingURL=sentry.js.map