import { Connection } from 'mysql';
import create from './create.js';
import populate from './populate.js';

async function createAll(con: Connection):Promise<void> {
  await create(con);
  await populate(con);
}

export default createAll;
