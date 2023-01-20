import { Db } from 'mongodb';
import deleteData from './deleteData.js';
import drop from './drop.js';

async function deleteAll(db: Db): Promise<void> {
  await deleteData(db);
  await drop(db);
}

export default deleteAll;
