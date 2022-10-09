import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';
import { connect, disconnect } from 'mongoose';
import { faker } from '@faker-js/faker';
import {
  getURL,
  getClient,
  populate,
  deleteData,
  drop,
} from '../../../utils/mongo/index.js';
import { console, envSelect } from '../../../utils';
import { Article, IArticle } from '../../../model/mongo/article.js';

describe('Article Mongo Article', () => {
  let db: Db;
  let client: MongoClient;
  let article: Article;

  beforeAll(async () => {
    try {
      const pathDotEnv = envSelect('dev');
      dotenv.config({ path: pathDotEnv });
      const url = getURL();
      client = await getClient(url);
      db = client.db('cheety');
      await connect(url);
    } catch (err) {
      console.error(err);
    }
  });

  beforeEach(async () => {
    try {
      await populate(db);
      article = new Article();
    } catch (err) {
      console.error(err);
    }
  });

  afterEach(async () => {
    try {
      await deleteData(db);
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    try {
      await drop(db);
      await disconnect();
      await client.close();
    } catch (err) {
      console.error(err);
    }
  });

  it('Article Mongo selectAll', async () => {
    const articles = await article.selectAll();
    expect(articles).toHaveLength(3);
  });

  it('Article Mongo selectByid', async () => {
    const articles = await article.selectAll();
    const { id } = articles[0];
    const articleById = await article.selectByid({ id: articles[0].id });
    expect(articleById?.id).toBe(id);
  });

  it('Article Mongo select by param', async () => {
    const articles = await article.selectAll();
    const { title } = articles[0];
    const articleByTitle = await article.select({ title });
    expect(articleByTitle[0].title || '').toBe(title);
  });

  it('Article Mongo insert', async () => {
    const articleAux: IArticle = {
      title: faker.lorem.words(),
      content: faker.lorem.text(),
      tags: [faker.lorem.word()],
      lang: 'es',
      author: faker.name.firstName(),
    };
    const articleInserted = await article.insert(articleAux);
    expect(articleInserted.id).not.toBeNull();
  });

  it('Article Mongo update', async () => {
    const articles = await article.selectAll();
    const updates = { title: faker.lorem.words() };
    const afected = await article.update(updates, { id: articles[0].id });
    expect(afected).toBeTruthy();
  });

  it('Article Mongo delete', async () => {
    const articles = await article.selectAll();
    const afected = await article.delete({ _id: articles[0].id });
    const notAfected = await article.delete({ _id: faker.datatype.uuid() });
    expect(afected).toBeTruthy();
    expect(notAfected).toBeFalsy();
  });
});
