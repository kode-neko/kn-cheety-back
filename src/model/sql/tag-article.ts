import ICrud from '../ICrud.js';
import { ITagArticle, TagArticleModel } from './schema/index.js';

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

export default TagArticle;
