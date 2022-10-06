import { Db } from 'mongodb';

import { IModel, mongoConfig } from '../config';
import IMongoConfig from '../config/IMongoConfig';

async function create(db: Db): Promise<void> {
  const promises = mongoConfig.map((doc: IMongoConfig<IModel>) => db.createCollection(doc.name));
  await Promise.all(promises);
}

export default create;
