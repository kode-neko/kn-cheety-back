import { MongoClient } from 'mongodb';

function getURL(): string {
  const {
    DB_MONGO_HOST,
    DB_MONGO_PORT,
    DB_NAME,
    DB_USER,
    DB_USER_PASS,
  } = process.env;

  const credentials = `${DB_USER}:${DB_USER_PASS}`;
  const host = `${DB_MONGO_HOST}:${DB_MONGO_PORT}`;
  const url = `mongodb://${credentials}@${host}/${DB_NAME}`;
  return url;
}

async function getClient(url: string): Promise<MongoClient> {
  const client = new MongoClient(url);
  return client;
}

export {
  getURL,
  getClient,
};
