import deleteData from './deleteData.js';
import drop from './drop.js';

async function deleteAll():Promise<void> {
  await deleteData();
  await drop();
}

export default deleteAll;
