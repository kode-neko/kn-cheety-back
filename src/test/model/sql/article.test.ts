import { Sequelize } from 'sequelize';
import {faker} from '@faker-js/faker'
import {default as getConSequalize} from '../../../src/model/sql/connect'
import { console } from '../../../utils';
import { IArticle, Article } from '../../../src/model/sql'
import {   
  create,
  deleteFrom,
  populate,
  drop,
  getCon as getConSql,
  menu, 
} from '../../../scripts/sql';
import Connection from 'mysql/lib/Connection';

describe('Model SQL Article', () => {
  let article = new Article();
  let conSequalize: Sequelize;
  let conSql: Connection;

  beforeAll(async () => {
    try{
      conSequalize = await getConSequalize();
      conSql = await getConSql();
      await create();
    } catch(err) {
      console.error(err);
    }
  });

  beforeEach(async () => {
    try{
      await populate();
    } catch(err) {
      console.error(err)
    }
  });

  afterEach(async () => {
    try{
      await deleteFrom();
    } catch(err) {
      console.error(err)
    }
  });

  afterAll(async () => {
    try{
      await drop();
    }catch(err) {
      console.error(err)
    } finally {
      await conSequalize.close();
      await conSql.end();
    }
  })

  it('Model SQL selectAll', async () => {
    const articles = await article.selectAll();
    expect(articles).toHaveLength(3);
  });

  it('Model SQL selectByid', async () => {
    const articles = await article.selectAll();
    const id = articles[0].id;
    const articleById = await article.selectByid({id: articles[0].id}); 
    expect(articleById?.id).toBe(id);
  });

  it('Model SQL select by param', async () => {
    const articles = await article.selectAll();
    const title = articles[0].title;
    const articleByTitle = await article.select({title});
    expect(articleByTitle[0].title || '').toBe(title);
  });

  it('Model SQL insert', async () => {
    const articleAux: IArticle = {
      title: faker.lorem.words(),
      lang: 'es',
      author: faker.name.firstName(),
    };
    const articleInserted = await article.insert(articleAux);
    expect(articleInserted.id).not.toBeNull();
  });

  it('Model SQL update', async () => {
    const articles = await article.selectAll();
    const updates = {title: faker.lorem.words()};
    const afected = await article.update(updates, {id: articles[0].id})
    expect(afected).toBeTruthy();
  });

  it('Model SQL delete', async () => {
    const articles = await article.selectAll();
    const afected = await article.delete({_id: articles[0].id});
    const notAfected = await article.delete({_id: faker.datatype.uuid()});
    expect(afected).toBeTruthy();
    expect(notAfected).toBeFalsy();
  });
});
