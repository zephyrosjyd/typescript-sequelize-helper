import type { Sequelize, Model, TModel } from './types';
import schema from '../../../schemas/sample';

export interface ISample {
  id?: string;
  name: string;
  price: number;
  archived: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ISampleModel = Model & ISample;

export type TSampleModel = TModel<ISampleModel>;

export default (sequelize: Sequelize): TSampleModel => {
  const { name, attributes } = schema;
  return sequelize.define(name, attributes, {
    timestamps: true,
  }) as TSampleModel;
};
