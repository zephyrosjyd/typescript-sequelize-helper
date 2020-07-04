import type { Sequelize, SyncOptions, Model } from 'sequelize';
import type {
  TModel, TSampleModel, TSampleDetailModel,
  ISample, ISampleDetail,
} from './types';

type Factory<T> = (sequelize: Sequelize) => T;

// Model interface 추가
export type ModelTypeUnion = ISample | ISampleDetail;

// Model 객체를 생성할 수 있는 factory 함수 등록
export const getModelFactoryList = async (): Promise<Factory<TModel<Model>>[]> => ([
  (await import('./sample')).default as Factory<TSampleModel>,
  (await import('./sample_detail')).default as Factory<TSampleDetailModel>,
]);

export const sync = async (
  sequelize: InstanceType<typeof Sequelize>,
  options?: SyncOptions,
): Promise<Sequelize> => sequelize.sync(options);

type Filter<T, U> = T extends U ? T : never;
export type ModelConstraints<T extends ModelTypeUnion> = Filter<ModelTypeUnion, T>;// Partial<Required<T>>;

export type {
  // DataRow,
  TModel,
  ISample,
  ISampleModel,
  TSampleModel,
  ISampleDetail,
  ISampleDetailModel,
  TSampleDetailModel,
} from './types';
