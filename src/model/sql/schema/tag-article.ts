/* eslint-disable max-classes-per-file */
import {
  Sequelize, Model, InferAttributes, InferCreationAttributes, ForeignKey,
} from 'sequelize';
import { ArticleModel } from './article.js';
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

async function initTagArticleModel(con: Sequelize) {
  await TagArticleModel.init({}, {
    sequelize: con,
    modelName: 'tag_article',
    tableName: 'tag_article',
    updatedAt: false,
    createdAt: false,
  });
}

async function syncTagArticle() {
  await TagArticleModel.sync();
}

export {
  ITagArticle,
  TagArticleModel,
  initTagArticleModel,
  syncTagArticle,
};
