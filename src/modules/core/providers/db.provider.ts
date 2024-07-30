export const DBProviderToken = Symbol('DBProviderToken');
export interface IDBProvider {
  getEntityModel: <Type>(entityName: string) => Type;
}
