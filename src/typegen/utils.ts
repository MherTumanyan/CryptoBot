import path from 'path';
import { promises as fs, readFileSync } from 'fs';
import glob from 'glob';
import globWatch from 'glob-watcher';
import { generate } from '@graphql-codegen/cli';
import { DIRECTIVES } from '@sfast/gql-schema-mongoose';
import { GraphEntityParser } from '@sfast/gql-schema-parser';
import { parse } from 'graphql';

type GenerateConfig = {
    include: string;
    exclude: string;
    tsPath: string;
    graphqlPath: string;
    root: string;
    watch: boolean;
};

export const mergeGraphqlSchemas = (generateConfig: GenerateConfig) => {
  const { include, exclude, graphqlPath, root } = generateConfig;
  const pathToModules = path.resolve(__dirname, root);
  const includePathRoot = path.join(pathToModules, include);
  const excludePathRoot = path.join(pathToModules, exclude);
  return glob
    .sync(includePathRoot, { ignore: [excludePathRoot, path.join(pathToModules, graphqlPath)] }) // TODO second one give from config
    .map(file => readFileSync(file, { encoding: 'utf8' }));
};

export const generateTypes = async (generateConfig: GenerateConfig) => {
  const { include, exclude, tsPath, graphqlPath, root, watch } = generateConfig;
  try {
    if (watch) {
      const options = {
        ignoreInitial: false,
        delay: 1000
      };
      const pathToModules = path.resolve(__dirname, root);
      const includePathRoot = path.join(pathToModules, include);
      const excludePathRoot = path.join(pathToModules, exclude);
      return globWatch([includePathRoot, `!${excludePathRoot}`], options, done => {
        generateTypes({ ...generateConfig, watch: false });
        done();
      });
    }
    const mergedSchemas = mergeGraphqlSchemas(generateConfig);
    const graph = new GraphEntityParser(parse(mergedSchemas.join('\n')));

    const tsPathRoot = path.join(root, tsPath); // '../modules/core/types/genTypes.ts'
    const graphqlPathRoot = path.join(root, graphqlPath);
    await fs.writeFile(path.resolve(__dirname, graphqlPathRoot), `${DIRECTIVES}\n${graph.printSchema(graph.getSchema())}`);
    await generate(
      {
        schema: [DIRECTIVES, graph.printSchema(graph.getSchema())],
        generates: {
          [path.resolve(__dirname, tsPathRoot)]: {
            plugins: ['typescript', 'typescript-resolvers']
          }
        }
      },
      true
    );
  } catch (err) {
    console.error(err);
  }
};
