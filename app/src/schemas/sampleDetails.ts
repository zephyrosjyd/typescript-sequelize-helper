import { DataTypes } from 'sequelize';
import { ISchema } from './types';

export default {
  name: 'SampleDetail',
  attributes: {
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
  },
} as ISchema;
