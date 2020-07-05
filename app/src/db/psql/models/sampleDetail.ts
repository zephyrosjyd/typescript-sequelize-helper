import type { Sequelize, Model, TModel } from './types';
import schema from '../../../schemas/sampleDetails';

export interface ISampleDetail {
  id?: string;
  sid: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ISampleDetailModel = Model & ISampleDetail;

export type TSampleDetailModel = TModel<ISampleDetailModel>;

export default (sequelize: Sequelize): TSampleDetailModel => {
  const { name, attributes } = schema;
  const SampleDetail = sequelize.define(name, attributes, {
    timestamps: true,
  }) as TSampleDetailModel;

  SampleDetail.associate = ({ Sample }) => {
    SampleDetail.belongsTo(Sample, {
      foreignKey: { name: 'sid', allowNull: false },
    });
  };

  return SampleDetail;
};
