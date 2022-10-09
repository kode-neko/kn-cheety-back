import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Db, MongoClient } from 'mongodb';
import { connect, disconnect } from 'mongoose';
import { faker } from '@faker-js/faker';
import {
  getURL,
  getClient,
  populate,
  drop,
  deleteData,
} from '../../../utils/mongo/index.js';
import { console, envSelect } from '../../../utils';
import { User, IUser } from '../../../model/mongo/user.js';

describe('User Mongo User', () => {
  let db: Db;
  let client: MongoClient;
  let user: User;

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
      user = new User();
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

  it('User Mongo selectAll', async () => {
    const users = await user.selectAll();
    expect(users).toHaveLength(2);
  });

  it('User Mongo selectByid', async () => {
    const users = await user.selectAll();
    const { name } = users[0];
    const userById = await user.selectByid({ id: users[0].name });
    expect(userById?.name).toBe(name);
  });

  it('User Mongo select by param', async () => {
    const users = await user.selectAll();
    const { name } = users[0];
    const userByTitle = await user.select({ name });
    expect(userByTitle[0].name || '').toBe(name);
  });

  it('User Mongo insert', async () => {
    const salt = await bcrypt.genSalt(10);
    const plainPass = faker.internet.password();
    const pass = await bcrypt.hash(plainPass, salt);
    const userAux: IUser = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      pass,
      salt,
    };
    const userInserted = await user.insert(userAux);
    expect(userInserted.name).not.toBeNull();
  });

  it('User Mongo update', async () => {
    const users = await user.selectAll();
    const updates = { name: faker.lorem.words() };
    const afected = await user.update(updates, { email: users[0].email });
    expect(afected).toBeTruthy();
  });

  it('User Mongo delete', async () => {
    const users = await user.selectAll();
    const afected = await user.delete({ name: users[0].name });
    const notAfected = await user.delete({ name: faker.internet.userName() });
    expect(afected).toBeTruthy();
    expect(notAfected).toBeFalsy();
  });
});
