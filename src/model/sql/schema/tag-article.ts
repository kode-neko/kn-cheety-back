/* eslint-disable max-classes-per-file */
import {
  Model, InferAttributes, InferCreationAttributes, ForeignKey,
} from 'sequelize';
import { ArticleModel } from './article.js';
import { getConSeq } from '../../../utils/sql/index.js';
import { TagModel } from './tag.js';

interface ITagArticle {
  article: number;
  tag: string;
}

class TagArticleModel extends Model<
InferAttributes<TagArticleModel>,
InferCreationAttributes<TagArticleModel>
> implements ITagArticle {
  declare article: ForeignKey<ArticleModel['id']>;

  declare tag: ForeignKey<TagModel['name']>;
}

function initTagArticleModel() {
  TagArticleModel.init({}, {
    sequelize: getConSeq(),
    modelName: 'tag_article',
  });

  TagArticleModel.sync();
}

export {
  ITagArticle,
  TagArticleModel,
  initTagArticleModel,
};
