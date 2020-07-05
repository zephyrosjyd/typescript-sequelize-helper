/* eslint-disable no-console */
import type { Options } from 'sequelize';

const options: Options = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
  dialect: 'postgres',
  // operatorsAliases: true,
  define: {
    charset: 'utf8',
    timestamps: true,
  },
  logging: (sql: string): void => {
    console.log(sql);
  },
};

export default options;
