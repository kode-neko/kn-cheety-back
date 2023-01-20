import ICrud from '../ICrud.js';
import { IArticle, ArticleModel } from './schema/index.js';

class Article implements ICrud<IArticle> {
  async selectByid(params: Record<string, unknown>): Promise<IArticle | null> {
    const article = await ArticleModel.findOne({ where: { ...params } });
    return article;
  }

  async selectAll(skip?: number, limit?: number): Promise<IArticle[]> {
    let users: IArticle[];
    if (skip && limit) {
      users = await ArticleModel.findAll({ offset: skip, limit });
    } else {
      users = await ArticleModel.findAll();
    }
    return users;
  }

  async select(
    params: Record<string, unknown>,
    skip?: number,
    limit?: number,
  ): Promise<IArticle[]> {
    let articles: IArticle[];
    if (skip && limit) {
      articles = await ArticleModel.findAll({ ...params, offset: skip, limit });
    } else {
      articles = await ArticleModel.findAll(params);
    }
    return articles;
  }

  async insert(ele: IArticle): Promise<IArticle> {
    const article = await ArticleModel.create(ele as ArticleModel);
    return article;
  }

  async update(ele: Partial<IArticle>, params: Record<string, unknown>): Promise<number> {
    const res = await ArticleModel.update({ ...ele }, { where: { ...params } });
    return res[0];
  }

  async delete(params: Record<string, unknown>): Promise<number> {
    const res = await ArticleModel.destroy({ where: { ...params } });
    return res;
  }
}

export default Article;
