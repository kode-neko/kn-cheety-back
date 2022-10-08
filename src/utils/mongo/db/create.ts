import { Db } from 'mongodb';

async function create(db: Db): Promise<void> {
  const article = db.createCollection('article');
  const user = db.createCollection('user');
  await Promise.all([article, user]);
}

export default create;
