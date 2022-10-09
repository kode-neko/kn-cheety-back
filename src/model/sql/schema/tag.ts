/* eslint-disable max-classes-per-file */
import {
  Model, DataTypes, InferAttributes, InferCreationAttributes,
} from 'sequelize';
import getCon from '../connect.js';

interface ITag {
  name: string;
}

class TagModel extends Model<
InferAttributes<TagModel>,
InferCreationAttributes<TagModel>
> implements ITag {
  declare name: string;
}

function initTagModel() {
  TagModel.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    sequelize: getCon(),
    modelName: 'tag',
  });

  TagModel.sync();
}

export {
  ITag,
  TagModel,
  initTagModel,
};
