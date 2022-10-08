import { Db } from 'mongodb';

async function deleteData(db: Db): Promise<void> {
  const article = db.collection('article').deleteMany({});
  const user = db.collection('user').deleteMany({});
  await Promise.all([article, user]);
}

export default deleteData;
