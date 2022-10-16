import jwt from 'jsonwebtoken';
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

describe('Ctrl.Mng.Auth', () => {
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

  it('Ctrl.Mng.POST /auth/signup', async () => {
    const name = faker.internet.userName();
    const email = faker.internet.email();
    const pass = faker.internet.password();
    const { status, body } = await supertest(app)
      .post('/auth/signup')
      .send({ name, email, pass });
    expect(status).toBe(201);
    expect(body).toEqual({ msg: 'created' });
    const { body: users } = await supertest(app)
      .post('/article/find')
      .send({ tags: [] });
    expect(users).toHaveLength(3);
  });

  it('Ctrl.Mng.PUT /auth/login', async () => {
    const name = 'kodeneko';
    const pass = name;
    const email = 'kodeneko@gmail.com';
    const token = jwt.sign(
      { id: name },
      process.env.API_SECRET as jwt.Secret,
      { expiresIn: 86400 },
    );
    const { status, body } = await supertest(app)
      .put('/auth/login')
      .auth(name, pass);
    expect(status).toBe(200);
    expect(body).toEqual({
      user: { name, email },
      message: 'Logins successfull',
      accessToken: token,
    });
  });
});
