/* eslint-disable max-classes-per-file */
import {
  Model, DataTypes, InferAttributes, InferCreationAttributes,
} from 'sequelize';
import ICrud from '../ICrud';
import getCon from './connect';

interface IUser {
  name: string;
  email: string;
  pass: string;
  salt: string;
}

class UserModel extends Model<
InferAttributes<UserModel>,
InferCreationAttributes<UserModel>
> implements IUser {
  declare name: string;

  declare email: string;

  declare pass: string;

  declare salt: string;
}

UserModel.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: getCon(),
  modelName: 'user',
});

UserModel.sync();

class User implements ICrud<IUser> {
  async selectByid(params: Record<string, unknown>): Promise<IUser | null> {
    const user = await UserModel.findOne({ where: { ...params } });
    return user;
  }

  async selectAll(): Promise<IUser[]> {
    const users = await UserModel.findAll();
    return users;
  }

  async select(params: Record<string, unknown>): Promise<IUser[] | null> {
    const users = await UserModel.findAll(params);
    return users;
  }

  async insert(ele: IUser): Promise<IUser> {
    const user = await UserModel.create(ele);
    return user;
  }

  async update(ele: IUser, params: Record<string, unknown>): Promise<boolean> {
    const res = await UserModel.update({ ...ele }, { where: { ...params } });
    return res[0] > 0;
  }

  async delete(params: Record<string, unknown>): Promise<boolean> {
    const res = await UserModel.destroy({ where: { ...params } });
    return res > 0;
  }
}

export default User;
export {
  UserModel,
};
