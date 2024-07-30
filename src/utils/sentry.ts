import { ApolloError } from 'apollo-server';
import { get } from 'lodash';
import jwt from 'jsonwebtoken';

const ignoreErrors = [
  '401: Unauthorized',
  'Unauthenticated',
  'Unauthorized',
  '401: Unauthenticated',
  'GraphQLError: Unauthenticated',
];

export const didEncounterErrors = Sentry => ctx => {
  // If we couldn't parse the operation, don't
  // do anything here
  if (!ctx.operation) {
    return;
  }
  if (get(ctx.context, 'req')) ctx.context.req.error = true;
  const errors = ctx.errors.filter(err => {
    const isNotApolloerror = !(err instanceof ApolloError);
    const shouldNotIgnore = ignoreErrors.indexOf(get(err, 'message', '')) === -1;
    return isNotApolloerror && shouldNotIgnore;
  });

  errors.forEach(err => {
    // decode and get user telegramId
    const { telegramId } = jwt.decode(ctx.context.token, process.env.JWT_SECRET);
    // Add scoped report details and send to Sentry
    Sentry.withScope(scope => {
      // Annotate whether failing operation was query/mutation/subscription
      scope.setTag('kind', ctx.operation.operation);
      // Log query and variables as extras (make sure to strip out sensitive data!)
      scope.setExtra('query', ctx.request.query);
      scope.setExtra('variables', ctx.request.variables);
      scope.setUser({ telegramId });
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
};

export const sentryInitializer = (Sentry) => {
  if (process.env.SENTRY_DSN && Boolean(process.env.ENABLE_SENTRY)) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: process.env.VERSION,
    });
  }
};
