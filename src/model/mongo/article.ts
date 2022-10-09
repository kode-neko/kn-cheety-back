import {
  Schema, model, Types,
} from 'mongoose';
import { checkIdCount, checkIdObj } from '../../utils/index.js';
import ICrud from '../ICrud.js';

interface IArticle {
  id?: Types.ObjectId;
  title?: string;
  content?: string | string[];
  tags: string[];
  lang: string;
  author: string;
}

const articleSchema = new Schema<IArticle>({
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
}, { collection: 'article' });

const ArticleModel = model('article', articleSchema);
class Article implements ICrud<IArticle> {
  @checkIdObj
  async selectByid(params: Record<string, unknown>): Promise<IArticle | null> {
    const article = await ArticleModel.findOne(params);
    return article;
  }

  async selectAll(skip?: number, limit?: number): Promise<IArticle[]> {
    let articles: IArticle[];
    if (skip && limit) {
      articles = await ArticleModel.find({}).skip(skip).limit(limit);
    } else {
      articles = await ArticleModel.find({});
    }
    return articles;
  }

  async select(
    params: Record<string, unknown>,
    skip?: number,
    limit?: number,
  ): Promise<IArticle[]> {
    let articles: IArticle[];
    if (skip && limit) {
      articles = await ArticleModel.find(params).skip(skip).limit(limit);
    } else {
      articles = await ArticleModel.find(params);
    }
    return articles;
  }

  @checkIdObj
  async insert(ele: IArticle): Promise<IArticle> {
    const article = new ArticleModel(ele);
    await article.save();
    return article;
  }

  @checkIdCount
  async update(ele: Partial<IArticle>, params: Record<string, unknown>): Promise<number> {
    const res = await ArticleModel.updateOne(params, ele);
    return res.modifiedCount;
  }

  @checkIdCount
  async delete(params: Record<string, unknown>): Promise<number> {
    const res = await ArticleModel.deleteMany(params);
    return res.deletedCount;
  }
}

export { IArticle, ArticleModel, Article };
