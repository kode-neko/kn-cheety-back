import { Db } from 'mongodb';
import deleteData from './deleteData';
import drop from './drop';

async function deleteAll(db: Db): Promise<void> {
  await deleteData(db);
  await drop(db);
}

export default deleteAll;
