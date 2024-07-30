import { getFieldsWithDirectives } from '@graphql-modules/utils';
import isAuthenticated from './isAuthenticated';
import isAdmin from './isAdmin';
import isService from './isService';

const DIRECTIVE_TO_GUARD = {
  isAuthenticated,
  isAdmin,
  isService
};
export const resolversComposition = ({ typeDefs }) => {
  const fieldsAndTypeToDirectivesMap = getFieldsWithDirectives(typeDefs);
  const result: { [fieldMap: string]: any[] } = {};

  Object.entries(fieldsAndTypeToDirectivesMap).forEach(entry => {
    const [key, value] = entry;
    if (value.length > 0) {
      result[key] = value.reduce((acc, directive) => {
        if (DIRECTIVE_TO_GUARD[directive.name]) {
          const mapperFn = DIRECTIVE_TO_GUARD[directive.name];
          const resultFn = mapperFn(directive.args);
          return [...acc, resultFn];
        }
        return acc;
      }, []);
    }
  });
  return result;
};
