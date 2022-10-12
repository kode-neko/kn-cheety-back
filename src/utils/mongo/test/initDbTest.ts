import { connect } from 'mongoose';
import { Db, MongoClient } from 'mongodb';
import { getURL, getClient } from '../index.js';

async function initDbTest():Promise<{
  url: string, client: MongoClient, db: Db
}> {
  const url = getURL();
  const client = await getClient(url);
  const db = client.db('cheety');
  await connect(url);
  return { url, client, db };
}

export default initDbTest;
