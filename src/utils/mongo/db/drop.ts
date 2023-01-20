import { Db } from 'mongodb';

async function drop(db: Db): Promise<void> {
  const article = db.collection('article').drop();
  const user = db.collection('user').drop();
  await Promise.all([article, user]);
}

export default drop;
