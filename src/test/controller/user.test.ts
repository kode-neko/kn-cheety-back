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
import { IUser } from '../../model/mongo/index.js';

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
  it('Ctrl.Mng.POST /user/find', async () => {
    const { status, body } = await supertest(app)
      .post('/user/find')
      .send({ name: ['kodeneko'] });
    expect(status).toBe(200);
    expect(body).toHaveLength(1);
  });

  it('trl.Mng.POST /user/:name', async () => {
    const { body } = await supertest(app)
      .post('/user/find');
    const artExpect = body[0];
    const { status, body: user } = await supertest(app)
      .get(`/user/${artExpect.name}`);
    expect(status).toBe(200);
    expect(user.id).toBe(artExpect.id);
  });

  it('Ctrl.Mng.POST /user', async () => {
    const artNew: IUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      pass: faker.internet.password(),
      salt: faker.random.alphaNumeric(),
    };
    const { status, body } = await supertest(app)
      .post('/user')
      .send(artNew);
    expect(status).toBe(201);
    expect(body.name).not.toBeFalsy();
  });

  it('Ctrl.Mng.PUT /user', async () => {
    const { body } = await supertest(app)
      .post('/user/find')
      .send({});
    const userExpect = body[0];
    const newEmail = faker.animal.cat();
    const userModified = { ...userExpect, email: newEmail };
    const { body: { affected }, status } = await supertest(app)
      .put('/user')
      .send({ ...userModified });
    expect(status).toBe(200);
    expect(affected).toStrictEqual(1);
  });
  it('Ctrl.Mng.DELETE /user', async () => {
    const { body } = await supertest(app)
      .post('/user/find')
      .send({});
    const { body: { affected }, status } = await supertest(app)
      .delete(`/user/${body[0].name}`);
    expect(status).toBe(200);
    expect(affected).toBe(1);
    const { body: bodyMinus } = await supertest(app)
      .post('/user/find')
      .send({});
    expect(bodyMinus).toHaveLength(1);
  });
});
