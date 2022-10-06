import { CastError as MongooseError } from 'mongoose';

function checkIdObj(
  _target: Object,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  const newMethod = async (...args: Record<string, unknown>[]) => {
    let obj: any;
    try {
      obj = await originalMethod(...args);
    } catch (err) {
      if ((err as MongooseError).kind === 'ObjectId') { obj = null; } else throw err;
    }
    return obj;
  };

  const newDescriptor: PropertyDescriptor = {
    get() { return newMethod; },
  };

  return newDescriptor;
}

export default checkIdObj;
