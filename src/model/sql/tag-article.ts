import ICrud from '../ICrud.js';
import { ITagArticle, TagArticleModel } from './schema/index.js';

class TagArticle implements ICrud<ITagArticle> {
  async selectByid(params: Record<string, unknown>): Promise<ITagArticle | null> {
    const tagArticle = await TagArticleModel.findOne({ where: { ...params } });
    return tagArticle;
  }

  async selectAll(skip?: number, limit?: number): Promise<ITagArticle[]> {
    let users: ITagArticle[];
    if (skip && limit) {
      users = await TagArticleModel.findAll({ offset: skip, limit });
    } else {
      users = await TagArticleModel.findAll();
    }
    return users;
  }

  async select(
    params: Record<string, unknown>,
    skip?: number,
    limit?: number,
  ): Promise<ITagArticle[]> {
    let tagArticles: ITagArticle[];
    if (skip && limit) {
      tagArticles = await TagArticleModel.findAll({ ...params, offset: skip, limit });
    } else {
      tagArticles = await TagArticleModel.findAll(params);
    }
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

export default TagArticle;
