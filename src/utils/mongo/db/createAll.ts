import { Db } from 'mongodb';
import create from './create';
import populate from './populate';

async function createAll(db: Db): Promise<void> {
  await create(db);
  await populate(db);
}

export default createAll;
