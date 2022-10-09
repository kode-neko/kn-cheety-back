/* eslint-disable max-classes-per-file */
import {
  Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes,
} from 'sequelize';

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

async function initUserModel(con: Sequelize) {
  await UserModel.init({
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
    sequelize: con,
    modelName: 'user',
    tableName: 'user',
    updatedAt: false,
    createdAt: false,
  });
}

async function syncUser() {
  await UserModel.sync();
}

export {
  IUser,
  UserModel,
  initUserModel,
  syncUser,
};
