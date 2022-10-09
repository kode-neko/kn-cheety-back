import ICrud from '../ICrud.js';
import { IArticle, ArticleModel } from './schema/index.js';

class Article implements ICrud<IArticle> {
  async selectByid(params: Record<string, unknown>): Promise<IArticle | null> {
    const article = await ArticleModel.findOne({ where: { ...params } });
    return article;
  }

  async selectAll(): Promise<IArticle[]> {
    const articles = await ArticleModel.findAll();
    return articles;
  }

  async select(params: Record<string, unknown>): Promise<IArticle[]> {
    const articles = await ArticleModel.findAll(params);
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
