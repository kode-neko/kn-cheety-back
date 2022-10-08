import create from './create.js';
import populate from './populate.js';

async function createAll():Promise<void> {
  await create();
  await populate();
}

export default createAll;
