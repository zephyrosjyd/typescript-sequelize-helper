export namespace Sequelize {
  export { DataTypes, ModelAttributes } from 'sequelize';
}

export interface ISchema {
  name: string;
  attributes: Sequelize.ModelAttributes;
}
