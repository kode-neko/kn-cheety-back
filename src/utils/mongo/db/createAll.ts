import { Db } from 'mongodb';
import create from './create.js';
import populate from './populate.js';

async function createAll(db: Db): Promise<void> {
  await create(db);
  await populate(db);
}

export default createAll;
