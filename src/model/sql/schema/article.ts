/* eslint-disable max-classes-per-file */
import {
  Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey,
} from 'sequelize';
import { UserModel } from './user.js';

interface IArticle {
  id?: number;
  title: string;
  author: string;
  lang: string;
}

class ArticleModel extends Model<
InferAttributes<ArticleModel>,
InferCreationAttributes<ArticleModel>
> implements IArticle {
  declare id: number;

  declare title: string;

  declare author: ForeignKey<UserModel['name']>;

  declare lang: string;
}

async function initArticleModel(con: Sequelize) {
  await ArticleModel.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize: con,
    modelName: 'article',
    tableName: 'article',
    updatedAt: false,
    createdAt: false,
  });

  await ArticleModel.belongsTo(UserModel, { foreignKey: 'author', targetKey: 'name' });
}

async function syncArticle() {
  await ArticleModel.sync();
}

export {
  IArticle,
  ArticleModel,
  initArticleModel,
  syncArticle,
};
