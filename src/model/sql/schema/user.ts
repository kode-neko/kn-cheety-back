/* eslint-disable max-classes-per-file */
import {
  Model, DataTypes, InferAttributes, InferCreationAttributes,
} from 'sequelize';
import getCon from '../connect.js';

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

function initUserModel() {
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
}

export {
  IUser,
  UserModel,
  initUserModel,
};
