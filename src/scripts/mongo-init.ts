import { Db } from 'mongodb';
import dotenv from 'dotenv';
import chalk from 'chalk';
import figlet from 'figlet';
import console from '../utils/console.js';
import {
  getClient, getURL, createMongo, populateMongo, dropMongo, envSelect,
} from '../utils/index.js';

const path = envSelect();
dotenv.config({ path });

async function isEmptyDb(db: Db): Promise<boolean> {
  const cols = await db.listCollections().toArray();
  if (cols.length === 0) return true;
  const articles = await db.collection('article').find({}).toArray();
  if (articles.length === 0) return true;
  return false;
}

async function init() {
  console.log(
    chalk.bold.magentaBright(
      figlet.textSync('Mongo Init', {
        font: 'Cosmike',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    ),
  );

  const url = getURL();
  const client = await getClient(url);
  const db = client.db();

  try {
    if (await isEmptyDb(db)) {
      await createMongo(db);
      await populateMongo(db);
    }
  } catch (err) {
    console.error(err);
    await dropMongo(db);
  } finally {
    client.close();
  }
}

init();
