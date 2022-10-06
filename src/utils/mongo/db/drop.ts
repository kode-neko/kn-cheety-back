import { Db } from 'mongodb';

import { IModel, mongoConfig } from '../config';
import IMongoConfig from '../config/IMongoConfig';

async function drop(db: Db): Promise<void> {
  const promises = mongoConfig.map(
    (doc: IMongoConfig<IModel>) => db.collection(doc.name).drop(),
  );
  await Promise.all(promises);
}

export default drop;
