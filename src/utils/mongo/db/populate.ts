import { Db } from 'mongodb';
import {
  articlesFixtures,
  usersFixtures,
} from '../../../../fixtures/index.js';

async function populate(db: Db): Promise<void> {
  const article = db.collection('article').insertMany(articlesFixtures);
  const user = db.collection('user').insertMany(usersFixtures);
  await Promise.all([article, user]);
}

export default populate;
