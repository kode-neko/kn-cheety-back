/* eslint-disable @typescript-eslint/naming-convention */
import {
  Schema, model, Types,
} from 'mongoose';
import { checkIdCount, checkIdObj, mongoIdToIdArticle } from '../../utils/index.js';
import ICrud from '../ICrud.js';

interface IArticle {
  id?: Types.ObjectId;
  title?: string;
  content?: string | string[];
  tags: string[];
  lang: string;
  author: string;
}

interface IArticleMongo extends IArticle {
  _id?: Types.ObjectId;
}

const articleSchema = new Schema<IArticleMongo>({
  title: {
    type: String,
  },
  content: {
    type: Schema.Types.Mixed,
  },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
  lang: {
    type: String,
    required: true,
    default: 'es',
  },
  author: {
    type: String,
    required: true,
  },
}, { collection: 'article', id: true });

const ArticleModel = model('article', articleSchema);
class Article implements ICrud<IArticle> {
  @checkIdObj
  async selectByid(params: Record<string, unknown>): Promise<IArticle | null> {
    const article = await ArticleModel.findOne(params);
    return article && mongoIdToIdArticle(article as IArticleMongo);
  }

  async selectAll(skip?: number, limit?: number): Promise<IArticle[]> {
    let articles: IArticleMongo[];
    if (skip && limit) {
      articles = await ArticleModel.find({}).skip(skip).limit(limit);
    } else {
      articles = await ArticleModel.find({});
    }
    const articlesId = articles.map(mongoIdToIdArticle);
    return articlesId;
  }

  async select(
    params: Record<string, unknown>,
    skip?: number,
    limit?: number,
  ): Promise<IArticle[]> {
    let articles: IArticleMongo[];
    if (skip && limit) {
      articles = await ArticleModel.find(params).skip(skip).limit(limit);
    } else {
      articles = await ArticleModel.find(params);
    }
    const articlesId = articles.map(mongoIdToIdArticle);
    return articlesId;
  }

  @checkIdObj
  async insert(ele: IArticle): Promise<IArticle> {
    const article = new ArticleModel(ele);
    await article.save();
    return mongoIdToIdArticle(article);
  }

  @checkIdCount
  async update(ele: Partial<IArticle>, params: Record<string, unknown>): Promise<number> {
    const res = await ArticleModel.updateOne(params, ele);
    return res.modifiedCount;
  }

  @checkIdCount
  async delete(params: Record<string, unknown>): Promise<number> {
    // eslint-disable-next-line prefer-const
    let { id, ...paramsDepurated } = params;
    if (params.id) {
      paramsDepurated = { ...paramsDepurated, _id: id };
    } else {
      paramsDepurated = { ...paramsDepurated };
    }
    const res = await ArticleModel.deleteMany(paramsDepurated);
    return res.deletedCount;
  }
}

export {
  IArticle, IArticleMongo, ArticleModel, Article,
};
