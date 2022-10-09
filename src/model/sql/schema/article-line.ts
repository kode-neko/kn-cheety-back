/* eslint-disable max-classes-per-file */
import {
  Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey,
} from 'sequelize';
import { getConSeq } from '../../../utils/sql/index.js';
import { ArticleModel } from './article.js';

interface IArticleLine {
  id?: number;
  content: string;
  lang: string;
  article: number;
}

class ArticleLineModel extends Model<
InferAttributes<ArticleLineModel>,
InferCreationAttributes<ArticleLineModel>
> implements IArticleLine {
  declare id: number;

  declare content: string;

  declare lang: string;

  declare article: ForeignKey<ArticleModel['id']>;
}

function initArticleLineModel() {
  ArticleLineModel.init({
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize: getConSeq(),
    modelName: 'article_line',
  });

  ArticleLineModel.belongsTo(ArticleModel, { targetKey: 'id' });
  ArticleLineModel.sync();
}

export {
  IArticleLine,
  ArticleLineModel,
  initArticleLineModel,
};
