import { ModelAttributes } from 'sequelize';

export interface ISchema {
  name: string;
  attributes: ModelAttributes;
}
