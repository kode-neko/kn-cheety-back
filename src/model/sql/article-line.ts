/* eslint-disable max-classes-per-file */
import {
  Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey,
} from 'sequelize';
import ICrud from '../ICrud.js';
import { ArticleModel } from './article.js';
import getCon from './connect.js';

interface IArticleLine {
  id?: number;
  content: string;
  lang: string;
  article: number;
}

class ArticleLineModel extends Model<
InferAttributes<ArticleLineModel>,
InferCreationAttributes<ArticleLineModel>
> implements IArticleLine {
  declare id: number;

  declare content: string;

  declare lang: string;

  declare article: ForeignKey<ArticleModel['id']>;
}

ArticleLineModel.init({
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
  lang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: getCon(),
  modelName: 'article_line',
});

ArticleLineModel.belongsTo(ArticleModel, { targetKey: 'id' });

ArticleLineModel.sync();

class ArticleLine implements ICrud<IArticleLine> {
  async selectByid(params: Record<string, unknown>): Promise<IArticleLine | null> {
    const articleLine = await ArticleLineModel.findOne({ where: { ...params } });
    return articleLine;
  }

  async selectAll(): Promise<IArticleLine[]> {
    const articleLines = await ArticleLineModel.findAll();
    return articleLines;
  }

  async select(params: Record<string, unknown>): Promise<IArticleLine[]> {
    const articleLines = await ArticleLineModel.findAll(params);
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

export {
  IArticleLine,
  ArticleLineModel,
  ArticleLine,
};
