import ICrud from '../ICrud.js';
import { IArticleLine, ArticleLineModel } from './schema/index.js';

class ArticleLine implements ICrud<IArticleLine> {
  async selectByid(params: Record<string, unknown>): Promise<IArticleLine | null> {
    const articleLine = await ArticleLineModel.findOne({ where: { ...params } });
    return articleLine;
  }

  async selectAll(skip?: number, limit?: number): Promise<IArticleLine[]> {
    let users: IArticleLine[];
    if (skip && limit) {
      users = await ArticleLineModel.findAll({ offset: skip, limit });
    } else {
      users = await ArticleLineModel.findAll();
    }
    return users;
  }

  async select(
    params: Record<string, unknown>,
    skip?: number,
    limit?: number,
  ): Promise<IArticleLine[]> {
    let articleLines: IArticleLine[];
    if (skip && limit) {
      articleLines = await ArticleLineModel.findAll({ ...params, offset: skip, limit });
    } else {
      articleLines = await ArticleLineModel.findAll(params);
    }
    return articleLines;
  }

  async insert(ele: IArticleLine): Promise<IArticleLine> {
    const articleLine = await ArticleLineModel.create(ele as ArticleLineModel);
    return articleLine;
  }

  async update(ele: Partial<IArticleLine>, params: Record<string, unknown>): Promise<number> {
    const res = await ArticleLineModel.update({ ...ele }, { where: { ...params } });
    return res[0];
  }

  async delete(params: Record<string, unknown>): Promise<number> {
    const res = await ArticleLineModel.destroy({ where: { ...params } });
    return res;
  }
}

export default ArticleLine;
