import create from './create';
import populate from './populate';

async function createAll():Promise<void> {
  await create();
  await populate();
}

export default createAll;
