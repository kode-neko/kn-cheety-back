import ICrud from '../ICrud.js';
import { ITag, TagModel } from './schema/index.js';

class Tag implements ICrud<ITag> {
  async selectByid(params: Record<string, unknown>): Promise<ITag | null> {
    const tag = await TagModel.findOne({ where: { ...params } });
    return tag;
  }

  async selectAll(skip?: number, limit?: number): Promise<ITag[]> {
    let users: ITag[];
    if (skip && limit) {
      users = await TagModel.findAll({ offset: skip, limit });
    } else {
      users = await TagModel.findAll();
    }
    return users;
  }

  async select(
    params: Record<string, unknown>,
    skip?: number,
    limit?: number,
  ): Promise<ITag[]> {
    let tags: ITag[];
    if (skip && limit) {
      tags = await TagModel.findAll({ ...params, offset: skip, limit });
    } else {
      tags = await TagModel.findAll(params);
    }
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
