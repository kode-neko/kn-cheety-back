import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import {
  populate,
  deleteData,
  getURL,
} from '../../utils/mongo/index.js';
import { envSelect } from '../../utils';
import { dropDBTest, initDbTest } from '../../utils/mongo/test/index.js';
import verifyToken from '../../middleware/verifyToken';

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

  it('MiddlW.verifyToken', async () => {

  });
});
