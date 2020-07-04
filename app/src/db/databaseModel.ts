import type {
  Model,
  CreateOptions,
  FindOptions,
  UpdateOptions,
  FindOrCreateOptions,
  DestroyOptions,
} from 'sequelize';
import type {
  TModel,
  ModelConstraints,
  ModelTypeUnion,
} from './psql';

type ResultSet<T extends ModelTypeUnion> = Model<T> | ModelConstraints<T> | null | undefined;
type MultiResultSet<T extends ModelTypeUnion> = Model<T>[] | ModelConstraints<T>[] | null | undefined;

/**
 * 각 모델 인스턴스 관리를 위한 클래스
 *
 * @export
 * @class DatabaseModel
 * @template T TModel<Model> 파생 클래스 타입
 */
export default class DatabaseModel<T extends TModel<Model>> {
  constructor(public name: string, public modelInstance: T) {}

  private static toJSON<M extends ModelTypeUnion>(resultSet: ResultSet<M> | MultiResultSet<M>, returnAsModel?: boolean): ResultSet<M> | MultiResultSet<M> {
    if (returnAsModel) return resultSet;

    if (Array.isArray(resultSet)) return (resultSet as Model[]).map((it) => it.toJSON() as ModelConstraints<M>);

    return (resultSet as Model)?.toJSON() as ModelConstraints<M>;
  }

  insert = async <M extends ModelTypeUnion>(items: ModelConstraints<M>, options?: CreateOptions, returnAsModel?: boolean): Promise<ResultSet<M>> => {
    const result = await this.modelInstance.create(items, options);
    return DatabaseModel.toJSON(result, returnAsModel) as ResultSet<M>;
  };

  selectByPk = async <M extends ModelTypeUnion>(identifier: string | number, options?: FindOptions, returnAsModel?: boolean): Promise<ResultSet<M>> => {
    const result = await this.modelInstance.findByPk(identifier, options);
    return DatabaseModel.toJSON(result, returnAsModel) as ResultSet<M>;
  };

  selectOne = async <M extends ModelTypeUnion>(options?: FindOptions, returnAsModel?: boolean): Promise<ResultSet<M>> => {
    const result = await this.modelInstance.findOne(options);
    return DatabaseModel.toJSON(result, returnAsModel) as ResultSet<M>;
  };

  selectOrInsertIfNotExist = async <M extends ModelTypeUnion>(options: FindOrCreateOptions, returnAsModel?: boolean): Promise<[ResultSet<M>, boolean]> => {
    const [result, created] = await this.modelInstance.findOrCreate(options);
    return [DatabaseModel.toJSON(result, returnAsModel) as ResultSet<M>, created];
  };

  selectAll = async <M extends ModelTypeUnion>(options?: FindOptions, returnAsModel?: boolean): Promise<MultiResultSet<M>> => {
    const results = await this.modelInstance.findAll(options);
    return DatabaseModel.toJSON(results, returnAsModel) as MultiResultSet<M>;
  };

  selectAndCountAll = async <M extends ModelTypeUnion>(options?: FindOptions, returnAsModel?: boolean): Promise<{
    rows: MultiResultSet<M>,
    count: number,
  }> => {
    const results = await this.modelInstance.findAndCountAll(options);
    return {
      rows: DatabaseModel.toJSON(results.rows, returnAsModel) as MultiResultSet<M>,
      count: results.count,
    };
  };

  update = async <M extends ModelTypeUnion>(values: ModelConstraints<M>, options: UpdateOptions, returnAsModel?: boolean): Promise<{
    rows: MultiResultSet<M>,
    count: number,
  }> => {
    const updateOptions: UpdateOptions = {
      returning: true,
      ...options,
    };
    const [affected, result] = await this.modelInstance.update(values, updateOptions);
    return {
      rows: DatabaseModel.toJSON(result, returnAsModel) as MultiResultSet<M>,
      count: affected,
    };
  };

  delete = async (options?: DestroyOptions): Promise<number> => {
    const count = await this.modelInstance.destroy(options);
    return count;
  };
}
