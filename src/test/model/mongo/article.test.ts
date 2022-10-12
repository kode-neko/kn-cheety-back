import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';
import {
  initDbTest,
  dropDBTest,
} from '../../../utils/mongo';
import { deleteDataMongo, envSelect, populateMongo } from '../../../utils';
import { Article, IArticle } from '../../../model/mongo/article.js';

describe('Mng.Article', () => {
  let db: Db;
  let client: MongoClient;
  let article: Article;

  beforeAll(async () => {
    const pathDotEnv = envSelect('dev');
    dotenv.config({ path: pathDotEnv });
    const data = await initDbTest();
    db = data.db;
    client = data.client;
  });

  beforeEach(async () => {
    await populateMongo(db);
    article = new Article();
  });

  afterEach(async () => {
    await deleteDataMongo(db);
  });

  afterAll(async () => {
    await dropDBTest(client, db);
  });

  it('Mng.Article.select', async () => {
    const articles = await article.selectAll();
    expect(articles).toHaveLength(3);
  });

  it('Mng.Article.selectByid', async () => {
    const articles = await article.selectAll();
    const { id } = articles[0];
    const articleById = await article.selectByid({ id: articles[0].id });
    expect(articleById?.id).toStrictEqual(id);
  });

  it('Mng.Article.select(params)', async () => {
    const articles = await article.selectAll();
    const { title } = articles[0];
    const articleByTitle = await article.select({ title });
    expect(articleByTitle[0].title || '').toBe(title);
  });

  it('Mng.Article.insert', async () => {
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

  it('Mng.Article.update', async () => {
    const articles = await article.selectAll();
    const updates = { title: faker.lorem.words() };
    const afected = await article.update(updates, { id: articles[0].id });
    expect(afected).toBeTruthy();
  });

  it('Mng.Article.delete', async () => {
    const articles = await article.selectAll();
    const afected = await article.delete({ _id: articles[0].id });
    const notAfected = await article.delete({ _id: faker.datatype.uuid() });
    expect(afected).toBeTruthy();
    expect(notAfected).toBeFalsy();
  });
});
