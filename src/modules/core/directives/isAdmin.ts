import { UserRole } from '@spot_wallet/types';

export default () => next => async (root, args, context, info) => {
  if (context.user.role !== UserRole.Admin) throw new Error('Unauthorized!');

  return next(root, args, context, info);
};
