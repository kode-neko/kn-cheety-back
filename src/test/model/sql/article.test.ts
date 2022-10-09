import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';
import { Connection } from 'mysql';
import { console, envSelect } from '../../../utils';
import { IArticle, Article } from '../../../model/sql/index.js';
import {
  getCon,
  create,
  deleteData,
  drop,
  populate,
} from '../../../utils/sql';
import { getConSeq, initialize } from '../../../utils/sql/db';

describe('Model SQL Article', () => {
  let article: Article;
  let conSeq: Sequelize;
  let conSql: Connection;

  beforeAll(async () => {
    try {
      const pathDotEnv = envSelect('dev');
      dotenv.config({ path: pathDotEnv });
      conSql = getCon();
      conSeq = getConSeq();
      await create(conSql);
      initialize();
    } catch (err) {
      console.error(err);
    }
  });

  beforeEach(async () => {
    try {
      article = new Article();
      await populate(conSql);
    } catch (err) {
      console.error(err);
    }
  });

  afterEach(async () => {
    try {
      await deleteData(conSql);
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    try {
      await drop(conSql);
    } catch (err) {
      console.error(err);
    } finally {
      await conSeq.close();
      await conSql.end();
    }
  });

  it('Model SQL selectAll', async () => {
    const articles = await article.selectAll();
    expect(articles).toHaveLength(3);
  });
/*
  it('Model SQL selectByid', async () => {
    const articles = await article.selectAll();
    const { id } = articles[0];
    const articleById = await article.selectByid({ id: articles[0].id });
    expect(articleById?.id).toBe(id);
  });

  it('Model SQL select by param', async () => {
    const articles = await article.selectAll();
    const { title } = articles[0];
    const articleByTitle = await article.select({ title });
    expect(articleByTitle[0].title || '').toBe(title);
  });

  it('Model SQL insert', async () => {
    const articleAux: IArticle = {
      title: faker.lorem.words(),
      lang: 'es',
      author: faker.name.firstName(),
    };
    const articleInserted = await article.insert(articleAux);
    expect(articleInserted.id).not.toBeNull();
  });

  it('Model SQL update', async () => {
    const articles = await article.selectAll();
    const updates = { title: faker.lorem.words() };
    const afected = await article.update(updates, { id: articles[0].id });
    expect(afected).toBeTruthy();
  });

  it('Model SQL delete', async () => {
    const articles = await article.selectAll();
    const afected = await article.delete({ _id: articles[0].id });
    const notAfected = await article.delete({ _id: faker.datatype.uuid() });
    expect(afected).toBeTruthy();
    expect(notAfected).toBeFalsy();
  }); */
});
