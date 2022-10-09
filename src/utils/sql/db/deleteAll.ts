import { Connection } from 'mysql';
import deleteData from './deleteData.js';
import drop from './drop.js';

async function deleteAll(con: Connection):Promise<void> {
  await deleteData(con);
  await drop(con);
}

export default deleteAll;
