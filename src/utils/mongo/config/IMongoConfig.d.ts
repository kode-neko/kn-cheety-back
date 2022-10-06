interface IMongoConfig<T> {
  name: string;
  fixtures: T[];
}

export default IMongoConfig;
