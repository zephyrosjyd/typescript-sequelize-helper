import {
  Sequelize, Model, DataTypes, ModelAttributes,
} from 'sequelize';
import type { TModel } from './types';

export interface ISampleDetail {
  id?: string;
  sid: string;
  createdAt?: string;
  updatedAt?: string;
}

// export interface ISampleDetailModel extends Model, ISampleDetail { }
export type ISampleDetailModel = Model & ISampleDetail;

export type TSampleDetailModel = TModel<ISampleDetailModel>;

export default (sequelize: Sequelize): TSampleDetailModel => {
  const attributes: ModelAttributes = {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    sid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Samples',
        key: 'id',
      },
    },
  };

  const SampleDetail = sequelize.define('SampleDetail', attributes, {
    timestamps: true,
  }) as TSampleDetailModel;

  SampleDetail.associate = ({ Sample }) => {
    SampleDetail.belongsTo(Sample, {
      foreignKey: { name: 'sid', allowNull: false },
    });
  };

  return SampleDetail;
};
