import { Db } from 'mongodb';

import { IModel, mongoConfig } from '../config';
import IMongoConfig from '../config/IMongoConfig';

async function populate(db: Db): Promise<void> {
  const promises = mongoConfig.map(
    (doc: IMongoConfig<IModel>) => db.collection(doc.name).insertMany(doc.fixtures),
  );
  await Promise.all(promises);
}

export default populate;
