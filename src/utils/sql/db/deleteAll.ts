import deleteData from './deleteData';
import drop from './drop';

async function deleteAll():Promise<void> {
  await deleteData();
  await drop();
}

export default deleteAll;
