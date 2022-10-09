/* eslint-disable max-classes-per-file */
import {
  Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes,
} from 'sequelize';

interface ITag {
  name: string;
}

class TagModel extends Model<
InferAttributes<TagModel>,
InferCreationAttributes<TagModel>
> implements ITag {
  declare name: string;
}

async function initTagModel(con: Sequelize) {
  TagModel.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    sequelize: con,
    modelName: 'tag',
    tableName: 'tag',
    updatedAt: false,
    createdAt: false,
  });
}

async function syncTag() {
  await TagModel.sync();
}

export {
  ITag,
  TagModel,
  initTagModel,
  syncTag,
};
