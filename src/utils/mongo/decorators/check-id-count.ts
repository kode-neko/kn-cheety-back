import { CastError as MongooseError } from 'mongoose';

function checkIdCount(
  _target: Object,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  const newMethod = async (...args: Record<string, unknown>[]) => {
    let count: number;
    try {
      count = await originalMethod(...args);
    } catch (err) {
      if ((err as MongooseError).kind === 'ObjectId') { count = 0; } else throw err;
    }
    return count;
  };

  const newDescriptor: PropertyDescriptor = {
    get() { return newMethod; },
  };

  return newDescriptor;
}

export default checkIdCount;
