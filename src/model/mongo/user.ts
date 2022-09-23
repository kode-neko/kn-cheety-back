import { Schema, model } from 'mongoose';
import ICrud from '../Icrud';

interface IUser {
  id: string;
  name: string;
  mail: string;
  pass: string;
  salt: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  mail: {
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
}, { id: true });

const UserModel = model('user', userSchema);

class User implements ICrud<IUser> {
  static async selectByid(id: string): Promise<IUser | null> {
    const article = await UserModel.findById(id);
    return article;
  }

  static async selectAll(): Promise<IUser[]> {
    const articles = await UserModel.find();
    return articles;
  }

  static async select(params: Record<string, unknown>): Promise<IUser[] | null> {
    const articles = await UserModel.find(params);
    return articles;
  }

  static async insert(ele: IUser): Promise<IUser> {
    const article = new UserModel(ele);
    await article.save();
    return article;
  }

  static async update(ele: IUser): Promise<boolean> {
    const res = await UserModel.updateOne(ele);
    return res.modifiedCount > 0;
  }

  static async delete(id: string): Promise<boolean> {
    const res = await UserModel.deleteOne({ _id: id });
    return res.deletedCount > 0;
  }
}

export default User;
