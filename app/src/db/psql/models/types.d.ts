import { Model } from 'sequelize';

export * from 'sequelize';

type ConstructableModel<T> = new (values?: Record<string, unknown>, options?: BuildOptions) => T;

export type TModel<T> = typeof Model & ConstructableModel<T> & {
  associate: (models: Record<string, TModel>) => void;
};

export type { ISample, ISampleModel, TSampleModel } from './sample';
export type { ISampleDetail, ISampleDetailModel, TSampleDetailModel } from './sampleDetail';
