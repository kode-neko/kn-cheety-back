/* eslint-disable max-classes-per-file */
import {
  Model, DataTypes, InferAttributes, InferCreationAttributes,
} from 'sequelize';
import ICrud from '../ICrud';
import getCon from './connect';

interface ITag {
  name: string;
}

class TagModel extends Model<
InferAttributes<TagModel>,
InferCreationAttributes<TagModel>
> implements ITag {
  declare name: string;
}

TagModel.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize: getCon(),
  modelName: 'tag',
});

TagModel.sync();

class Tag implements ICrud<ITag> {
  async selectByid(params: Record<string, unknown>): Promise<ITag | null> {
    const tag = await TagModel.findOne({ where: { ...params } });
    return tag;
  }

  async selectAll(): Promise<ITag[]> {
    const tags = await TagModel.findAll();
    return tags;
  }

  async select(params: Record<string, unknown>): Promise<ITag[]> {
    const tags = await TagModel.findAll(params);
    return tags;
  }

  async insert(ele: ITag): Promise<ITag> {
    const tag = await TagModel.create(ele);
    return tag;
  }

  async update(ele: Partial<ITag>, params: Record<string, unknown>): Promise<number> {
    const res = await TagModel.update({ ...ele }, { where: { ...params } });
    return res[0];
  }

  async delete(params: Record<string, unknown>): Promise<number> {
    const res = await TagModel.destroy({ where: { ...params } });
    return res;
  }
}

export default Tag;
export {
  TagModel,
};
