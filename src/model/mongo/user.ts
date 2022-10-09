import { Schema, model } from 'mongoose';
import { checkIdCount, checkIdObj } from '../../utils/index.js';
import ICrud from '../ICrud.js';

interface IUser {
  name: string;
  email: string;
  pass: string;
  salt: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
}, { collection: 'user' });

const UserModel = model('user', userSchema);

class User implements ICrud<IUser> {
  @checkIdObj
  async selectByid(params: Record<string, unknown>): Promise<IUser | null> {
    const user = await UserModel.findOne(params);
    return user;
  }

  async selectAll(): Promise<IUser[]> {
    const users = await UserModel.find({});
    return users;
  }

  async select(params: Record<string, unknown>): Promise<IUser[]> {
    const users = await UserModel.find(params);
    return users;
  }

  @checkIdObj
  async insert(ele: IUser): Promise<IUser> {
    const user = new UserModel(ele);
    await user.save();
    return user;
  }

  @checkIdCount
  async update(ele: Partial<IUser>, params: Record<string, unknown>): Promise<number> {
    const res = await UserModel.updateOne(params, ele);
    return res.modifiedCount;
  }

  @checkIdCount
  async delete(params: Record<string, unknown>): Promise<number> {
    const res = await UserModel.deleteOne(params);
    return res.deletedCount;
  }
}

export { IUser, UserModel, User };
