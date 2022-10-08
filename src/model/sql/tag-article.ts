/* eslint-disable max-classes-per-file */
import {
  Model, InferAttributes, InferCreationAttributes, ForeignKey,
} from 'sequelize';
import ICrud from '../ICrud.js';
import { ArticleModel } from './article.js';
import getCon from './connect.js';
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

TagArticleModel.init({}, {
  sequelize: getCon(),
  modelName: 'tag_article',
});

TagArticleModel.sync();

class TagArticle implements ICrud<ITagArticle> {
  async selectByid(params: Record<string, unknown>): Promise<ITagArticle | null> {
    const tagArticle = await TagArticleModel.findOne({ where: { ...params } });
    return tagArticle;
  }

  async selectAll(): Promise<ITagArticle[]> {
    const tagArticles = await TagArticleModel.findAll();
    return tagArticles;
  }

  async select(params: Record<string, unknown>): Promise<ITagArticle[]> {
    const tagArticles = await TagArticleModel.findAll(params);
    return tagArticles;
  }

  async insert(ele: ITagArticle): Promise<ITagArticle> {
    const tagArticle = await TagArticleModel.create(ele);
    return tagArticle;
  }

  async update(ele: Partial<ITagArticle>, params: Record<string, unknown>): Promise<number> {
    const res = await TagArticleModel.update({ ...ele }, { where: { ...params } });
    return res[0];
  }

  async delete(params: Record<string, unknown>): Promise<number> {
    const res = await TagArticleModel.destroy({ where: { ...params } });
    return res;
  }
}

export {
  ITagArticle,
  TagArticleModel,
  TagArticle,
};
