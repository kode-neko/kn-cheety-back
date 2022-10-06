import { Db } from 'mongodb';
import { connect, disconnect, ObjectId } from 'mongoose';
import {
  getDbHere,
  populate,
  drop,
} from '../../../scripts/mongo/mongo';
import { console, envSelect } from '../../../utils';
import Article, { IArticle } from '../../../src/model/mongo/article';
import {faker} from '@faker-js/faker'

describe('Model Mongo Article', () => {
  let db: Db;
  let url: string;
  let article: Article;

  beforeAll(async () => {
    try {
      envSelect('dev');
      const [, dbReal, urlReal] = await getDbHere();
      db = dbReal;
      url = urlReal;
      await connect(url);
    } catch (err) {
      console.error(err);
    }
  });

  beforeEach(async () => {
    try {
      await populate(db);
      article = new Article();
    } catch (err) {
      console.error(err);
    }
  });

  afterEach(async () => {
    try {
      await drop(db);
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    try{
      await disconnect();
    } catch(err) {
      console.error(err);
    }
  })

  it('Model Mongo selectAll', async () => {
    const articles = await article.selectAll();
    expect(articles).toHaveLength(3);
  });

  it('Model Mongo selectByid', async () => {
    const articles = await article.selectAll();
    const id = articles[0].id;
    const articleById = await article.selectByid({id: articles[0].id}); 
    expect(articleById?.id).toBe(id);
  });

  it('Model Mongo select by param', async () => {
    const articles = await article.selectAll();
    const title = articles[0].title;
    const articleByTitle = await article.select({title});
    expect(articleByTitle[0].title || '').toBe(title);
  });

  it('Model Mongo insert', async () => {
    const articleAux: IArticle = {
      title: faker.lorem.words(),
      content: faker.lorem.text(),
      tags: [faker.lorem.word()],
      lang: 'es',
      author: faker.name.firstName(),
    };
    const articleInserted = await article.insert(articleAux);
    expect(articleInserted.id).not.toBeNull();
  });

  it('Model Mongo update', async () => {
    const articles = await article.selectAll();
    const updates = {title: faker.lorem.words()};
    const afected = await article.update(updates, {id: articles[0].id})
    expect(afected).toBeTruthy();
  });

  it('Model Mongo delete', async () => {
    const articles = await article.selectAll();
    const afected = await article.delete({_id: articles[0].id});
    const notAfected = await article.delete({_id: faker.datatype.uuid()});
    expect(afected).toBeTruthy();
    expect(notAfected).toBeFalsy();
  });
});
