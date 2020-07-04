import { Sequelize, SyncOptions, Model } from 'sequelize';
import dbConfig from './config';
import { getModelFactoryList, sync } from './models';
import type { TModel } from './models';

const sequelize = new Sequelize(dbConfig);

export type ModelMapper = Record<string, TModel<Model>>;

export type ORM = { [k: string]: Sequelize | typeof Sequelize | ModelMapper };

export const init = async (): Promise<ORM> => {
  const modelFactoryList = await getModelFactoryList();
  const models: ModelMapper = ((list) => list.reduce((map, factory) => {
    const model = factory(sequelize);
    return {
      ...map,
      [model.name]: model,
    };
  }, {} as ModelMapper))(modelFactoryList);

  Object.values(models).forEach((model) => model.associate?.(models));

  return {
    sequelize,
    Sequelize,
    models,
  };
};

export const syncDB = async (options?: SyncOptions): Promise<Sequelize> => sync(sequelize, options);

export type { Sequelize, SyncOptions } from 'sequelize';
export * from './models';
