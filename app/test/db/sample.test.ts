import { Sequelize, Op } from 'sequelize';
import { random } from 'lodash';
import Database from '../../src/db';
import type {
  ISampleDetail, ISample,
  TModel, ISampleModel, ISampleDetailModel,
  DatabaseModel,
} from '../../src/db';

describe('[lib/db] ORM Wrapper', () => {
  let db: Database;
  const uuidLength = '36453319-64c8-488e-be7b-efb4c45e39ba'.length;

  type SampleModel = DatabaseModel<TModel<ISampleModel>>;
  type SampleDetailModel = DatabaseModel<TModel<ISampleDetailModel>>;

  beforeAll(async () => {
    try {
      db = Database.instance;
      await db.initialize();
    } catch (err) {
      console.log(err);
    }
    // await Database.sync();
  });

  afterAll(async () => {
    const Sample = db.models.Sample as SampleModel;
    const SampleDetail = db.models.SampleDetail as SampleDetailModel;

    await SampleDetail.delete({
      cascade: true,
      force: true,
      where: { sid: { [Op.not]: null } },
    });
    await Sample.delete({
      cascade: true,
      force: true,
      where: { name: { [Op.like]: 'unit-test%' } },
    });

    // await (db.ormInstance?.sequelize as Sequelize).drop({
    //   cascade: true,
    // });
    await db.clear();
  });

  describe('[Sample & SampleDetail] CRUD', () => {
    it('[Sample] insert', async () => {
      const data = {
        name: `unit-test1-${random(1, 1000)}`,
        price: random(1000, 100000),
        archived: false,
      } as ISample;
      const Sample = db.models.Sample as SampleModel;
      const rs = await Sample.insert(data) as ISample;

      expect(rs?.name).toEqual(data.name);
      expect(parseInt(rs?.price as unknown as string, 10)).toEqual(data.price);
      expect(rs?.id?.length).toEqual(uuidLength);
    });

    it('[Sample] select by PK', async () => {
      const data = {
        name: `unit-test2-${random(1, 1000)}`,
        price: random(1000, 100000),
        archived: false,
        // none: 1111,
      };
      const Sample = db.models.Sample as SampleModel;
      const savedRs = await Sample.insert(data) as ISample;
      const rs = await Sample.selectByPk(savedRs.id as string) as ISample;

      expect(rs?.name).toEqual(data.name);
      expect(parseInt(rs?.price as unknown as string, 10)).toEqual(data.price);
      expect(rs?.id).toEqual(savedRs.id);
    });

    it('[Sample] update', async () => {
      const data = {
        name: `unit-test3-${random(1, 1000)}`,
        price: random(1000, 100000),
        archived: false,
      } as ISample;
      const Sample = db.models.Sample as SampleModel;
      const savedRs = await Sample.insert(data) as ISample;
      const newData = {
        price: random(1000, 100000),
        archived: true,
      } as ISample;
      const { rows, count } = await Sample.update(newData, {
        where: {
          id: savedRs.id as string,
        },
      });
      const rs = rows as ISample[];

      expect(count).toEqual(1);
      expect(rs[0]?.name).toEqual(data.name);
      expect(rs[0]?.archived).toEqual(newData.archived);
      expect(parseInt(rs[0]?.price as unknown as string, 10)).toEqual(newData.price);
      expect((rs[0]?.id as string)?.length).toEqual(uuidLength);
    });

    it('[Sample] delete', async () => {
      const data = {
        name: `unit-test4-${random(1, 1000)}`,
        price: random(1000, 100000),
        archived: false,
      } as ISample;
      const Sample = db.models.Sample as SampleModel;
      const savedRs = await Sample.insert(data) as ISample;
      const count = await Sample.delete({
        where: {
          id: savedRs.id as string,
        },
      });

      expect(count).toEqual(1);

      const rs = await Sample.selectByPk(savedRs.id as string) as ISample | undefined;

      expect(rs).toBeUndefined();
    });

    it('[SampleDetail+Sample] insert & select with join', async () => {
      const data = {
        name: `unit-test5-${random(1, 1000)}`,
        price: random(1000, 100000),
        archived: false,
      } as ISample;
      const Sample = db.models.Sample as SampleModel;
      const SampleDetail = db.models.SampleDetail as SampleDetailModel;
      const sequelize = db.ormInstance?.sequelize as Sequelize;

      const rs = [] as (ISample | ISampleDetail)[];
      await sequelize?.transaction(async (transaction) => {
        rs[0] = await Sample.insert(data, { transaction }) as ISample;
        rs[1] = await SampleDetail.insert<ISampleDetail>({
          sid: rs[0].id as string,
        }, { transaction }) as ISampleDetail;
      });

      expect((rs[0] as ISample)?.name).toEqual(data.name);
      expect(parseInt((rs[0] as ISample)?.price as unknown as string, 10)).toEqual(data.price);
      expect(rs[0]?.id).toEqual((rs[1] as ISampleDetail)?.sid);

      const result = await SampleDetail.selectAll({
        where: {
          sid: (rs[1] as ISampleDetail)?.sid,
        },
        include: [{
          model: Sample.modelInstance,
          // where: { id: Sequelize.col('SampleDetails.sid') },
        }],
      }) as (ISampleDetail & { Sample: Partial<ISample> })[];

      expect(result[0]?.id).toEqual(rs[1]?.id);
      expect(result[0]?.Sample?.name as string).toEqual(data.name);
    });
  });
});
