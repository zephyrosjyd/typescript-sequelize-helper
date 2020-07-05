import { Sequelize, ISchema } from './types';

export default {
  name: 'Sample',
  attributes: {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: new Sequelize.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    archived: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
} as ISchema;
