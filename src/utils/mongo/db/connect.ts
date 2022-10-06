import { MongoClient } from 'mongodb';

function getURL(): string {
  const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_ADMIN,
    DB_ADMIN_PASS,
  } = process.env;

  const credentials = `${DB_ADMIN}:${DB_ADMIN_PASS}`;
  const host = `${DB_HOST}:${DB_PORT}`;
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
