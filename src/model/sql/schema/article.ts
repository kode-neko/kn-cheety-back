/* eslint-disable max-classes-per-file */
import {
  Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey,
} from 'sequelize';
import { getConSeq } from '../../../utils/sql/index.js';
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

function initArticleModel() {
  ArticleModel.init({
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
    sequelize: getConSeq(),
    modelName: 'article',
  });

  ArticleModel.belongsTo(UserModel, { targetKey: 'name' });
  ArticleModel.sync();
}

export {
  IArticle,
  ArticleModel,
  initArticleModel,
};
