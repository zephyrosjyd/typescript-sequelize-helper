import {
  Sequelize, Model, DataTypes, ModelAttributes,
} from 'sequelize';
import type { TModel } from './types';

export interface ISample {
  id?: string;
  name: string;
  price: number;
  archived: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// export interface ISampleModel extends Model, ISample { }
export type ISampleModel = Model & ISample;

export type TSampleModel = TModel<ISampleModel>;

export default (sequelize: Sequelize): TSampleModel => {
  const attributes: ModelAttributes = {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: new DataTypes.DECIMAL(10, 2), allowNull: false },
    archived: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  };
  return sequelize.define('Sample', attributes, {
    timestamps: true,
  }) as TSampleModel;
};
