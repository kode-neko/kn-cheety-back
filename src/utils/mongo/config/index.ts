// import { exampleFix } from '@fixtures';
// import { IExample } from '../../../model';
import IMongoConfig from './IMongoConfig';
/*
const mongoConfigExample: IMongoConfig<IExample> = {
  name: 'example',
  fixtures: exampleFix,
};
*/
type IModel = {};

const mongoConfig: IMongoConfig<IModel>[] = [];

export default mongoConfig;
export {
  IModel,
  mongoConfig,
  // mongoConfigExample,
};
