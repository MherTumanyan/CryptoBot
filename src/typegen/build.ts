import { generateTypes } from './utils';

const configOptions = {
  include: './**/*.graphql',
  exclude: './**/*.spec.graphql',
  tsPath: './core/types/genTypes.ts',
  graphqlPath: './core/types/genTypes.graphql',
  root: '../modules',
  watch: false
};

// TODO get watch from --watch, package.json (cli)
generateTypes(configOptions);
