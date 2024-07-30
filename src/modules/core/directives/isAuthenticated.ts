export default () => next => async (root, args, context, info) => {
  if (!context.user) throw new Error('Unauthorized!');

  return next(root, args, context, info);
};
