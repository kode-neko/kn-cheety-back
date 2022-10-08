/* eslint-disable max-classes-per-file */
import {
  Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey,
} from 'sequelize';
import ICrud from '../ICrud.js';
import getCon from './connect.js';
import { UserModel } from './user.js';

interface IArticle {
  id?: number;
  title: string;
  author: string;
  lang: string;
}

class ArticleModel extends Model<
InferAttributes<ArticleModel>,
InferCreationAttributes<ArticleModel>
> implements IArticle {
  declare id: number;

  declare title: string;

  declare author: ForeignKey<UserModel['name']>;

  declare lang: string;
}

ArticleModel.init({
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: getCon(),
  modelName: 'article',
});

ArticleModel.belongsTo(UserModel, { targetKey: 'name' });

ArticleModel.sync();

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

export {
  IArticle,
  ArticleModel,
  Article,
};
