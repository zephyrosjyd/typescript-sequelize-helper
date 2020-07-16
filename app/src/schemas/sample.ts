import { DataTypes } from 'sequelize';
import { ISchema } from './types';

export default {
  name: 'Sample',
  attributes: {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: new DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
} as ISchema;
