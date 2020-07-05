/* eslint-disable no-console */
import { Sequelize } from 'sequelize';
import { init, syncDB } from './psql';
import DatabaseModel from './databaseModel';
import type {
  ORM, SyncOptions, ModelMapper,
} from './psql';

type DatabaseModelMap = Record<string, InstanceType<typeof DatabaseModel>>;

/**
 * ORM(Sequelize)에 의해 생성되어 관리되는 데이버베이스 인스턴스 클래스
 *
 * @export
 * @class Database
 */
export default class Database {
  private static _instance?: InstanceType<typeof Database>;

  private initialized = false;

  models: DatabaseModelMap = {};

  constructor(public ormInstance?: ORM) {
    if (this.ormInstance) this.bindModels();
  }

  private bindModels() {
    Object.entries(this.ormInstance?.models as ModelMapper).forEach((entry) => {
      this.models[entry[0]] = new DatabaseModel(...entry);
    });
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    this.ormInstance = await init();
    this.bindModels();
    this.initialized = true;
  }

  async clear(): Promise<void> {
    await (this.ormInstance?.sequelize as Sequelize)?.close();
    Database._instance = undefined;
  }

  static get instance(): InstanceType<typeof Database> {
    if (Database._instance) return Database._instance as Database;
    Database._instance = new Database();
    return Database._instance;
  }

  static async sync(dbSyncOptions?: SyncOptions | false): Promise<void> {
    const defaultOptions: SyncOptions = {
      alter: true,
      // force: false,
      logging: (sql: string) => console.log(sql),
    };
    let options: SyncOptions = defaultOptions;

    if (dbSyncOptions) {
      options = {
        ...defaultOptions,
        ...dbSyncOptions,
      };
    }

    await syncDB(options);
  }
}

export { DatabaseModel };

export * from './psql';
