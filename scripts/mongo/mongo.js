const { MongoClient } = require('mongodb');
const { console } = require('../../utils');
const { articles, users } = require('../../fixtures/index.cjs');

async function getDb() {
  const {
    DB_MONGO_HOST, DB_MONGO_PORT, DB_NAME, DB_ADMIN, DB_ADMIN_PASS,
  } = process.env;

  const encoAdmin = encodeURIComponent(DB_ADMIN);
  const encoPass = encodeURIComponent(DB_ADMIN_PASS);
  const credentials = `${encoAdmin}:${encoPass}`;
  const host = `${DB_MONGO_HOST}:${DB_MONGO_PORT}`;
  const url = `mongodb://${credentials}@${host}/${DB_NAME}`;

  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(DB_NAME);

  return [client, db, url];
}

let dbData = null;

async function getDbHere() {
  if (dbData) {
    return dbData;
  }
  dbData = await getDb();
  return dbData;
}

async function populate(db) {
  const userCollection = db.collection('user');
  const articlesCollection = db.collection('article');
  const resultUser = await userCollection.insertMany(users);
  console.log(`${resultUser.insertedCount} usuarios insertados`);
  const resultArticle = await articlesCollection.insertMany(articles);
  console.log(`${resultArticle.insertedCount} artículos insertados`);
}

async function drop(db) {
  const userCollection = db.collection('user');
  const articlesCollection = db.collection('article');
  const dropUsers = userCollection.drop();
  console.log(`Eliminado colección usuarios: ${dropUsers}`);
  const dropArticles = articlesCollection.drop();
  console.log(`Eliminado colección artículos: ${dropArticles}`);
}

module.exports = {
  getDb,
  getDbHere,
  populate,
  drop,
};
