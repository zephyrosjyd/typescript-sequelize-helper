import { Sequelize, ISchema } from './types';

export default {
  name: 'SampleDetail',
  attributes: {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    sid: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Samples',
        key: 'id',
      },
    },
  },
} as ISchema;
