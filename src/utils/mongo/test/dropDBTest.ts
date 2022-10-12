import { disconnect } from 'mongoose';
import { Db, MongoClient } from 'mongodb';
import { drop } from '../db/index.js';

async function dropDBTest(client: MongoClient, db: Db):Promise<void> {
  await drop(db);
  await disconnect();
  await client.close();
}

export default dropDBTest;
