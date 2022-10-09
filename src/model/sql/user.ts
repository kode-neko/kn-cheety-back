import ICrud from '../ICrud.js';
import { IUser, UserModel } from './schema/index.js';

class User implements ICrud<IUser> {
  async selectByid(params: Record<string, unknown>): Promise<IUser | null> {
    const user = await UserModel.findOne({ where: { ...params } });
    return user;
  }

  async selectAll(): Promise<IUser[]> {
    const users = await UserModel.findAll();
    return users;
  }

  async select(params: Record<string, unknown>): Promise<IUser[]> {
    const users = await UserModel.findAll(params);
    return users;
  }

  async insert(ele: IUser): Promise<IUser> {
    const user = await UserModel.create(ele);
    return user;
  }

  async update(ele: Partial<IUser>, params: Record<string, unknown>): Promise<number> {
    const res = await UserModel.update({ ...ele }, { where: { ...params } });
    return res[0];
  }

  async delete(params: Record<string, unknown>): Promise<number> {
    const res = await UserModel.destroy({ where: { ...params } });
    return res;
  }
}

export default User;
