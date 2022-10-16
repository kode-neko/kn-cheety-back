import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';
import supertest from 'supertest';
import mongoose from 'mongoose';
import {
  populate,
  deleteData,
  getURL,
} from '../../utils/mongo/index.js';
import { envSelect } from '../../utils';
import { dropDBTest, initDbTest } from '../../utils/mongo/test/index.js';
import app from '../../server.js';

describe('Ctrl.Mng.Article', () => {
  let db: Db;
  let client: MongoClient;

  beforeAll(async () => {
    const pathDotEnv = envSelect('dev');
    dotenv.config({ path: pathDotEnv });
    const data = await initDbTest();
    db = data.db;
    client = data.client;
    await mongoose.connect(getURL());
  });

  beforeEach(async () => {
    await populate(db);
  });

  afterEach(async () => {
    await deleteData(db);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await dropDBTest(client, db);
  });
  it('Ctrl.Mng.POST /article/find', async () => {
    const { status, body } = await supertest(app)
      .post('/article/find')
      .send({ tags: [] });
    expect(status).toBe(200);
    expect(body).toHaveLength(3);
  });

  it('Ctrl.Mng.POST /article/:id', async () => {
    const { body } = await supertest(app)
      .post('/article/find')
      .send({ tags: [] });
    const artExpect = body[0];
    const { status, body: article } = await supertest(app)
      .get(`/article/${artExpect?.id}`);
    expect(status).toBe(200);
    expect(article.id).toBe(artExpect.id);
  });

  it('Ctrl.Mng.POST /article', async () => {
    const artNew = {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      author: faker.name.firstName(),
      // lang: 'es',
      tags: [faker.lorem.word()],
    };
    const { status, body } = await supertest(app)
      .post('/article')
      .send(artNew);
    expect(status).toBe(201);
    expect(body.id).not.toBeFalsy();
  });

  it('Ctrl.Mng.PUT /article', async () => {
    const { body } = await supertest(app)
      .post('/article/find')
      .send({ tags: [] });
    const artExpect = body[0];
    const newTitle = faker.animal.cat();
    const artModified = { ...artExpect, title: newTitle };
    const { body: { affected }, status } = await supertest(app)
      .put('/article')
      .send({ ...artModified });
    expect(status).toBe(200);
    expect(affected).toStrictEqual(1);
  });
  it('Ctrl.Mng.DELETE /article', async () => {
    const { body } = await supertest(app)
      .post('/article/find')
      .send({});
    const { body: { affected }, status } = await supertest(app)
      .delete(`/article/${body[0].id}`);
    expect(status).toBe(200);
    expect(affected).toBe(1);
    const { body: bodyMinus } = await supertest(app)
      .post('/article/find')
      .send({});
    expect(bodyMinus).toHaveLength(2);
  });
});
