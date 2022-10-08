import { articlesFixtures, usersFixtures } from '../../../../fixtures/index.js';
import { queryValuePromise, queryInsertPromise } from './connect.js';
import {
  IArticleLine, IArticle, IUser,
} from '../../../model/sql/index.js';
import {
  IArticle as IArticleMongo, IUser as IUserMongo,
} from '../../../model/mongo/index.js';

const articlesFix = articlesFixtures as IArticleMongo[];
const usersFix = usersFixtures as IUserMongo[];

async function populateUser():Promise<void> {
  const insertArticle = 'INSERT INTO user SET ?';
  const promiseList = usersFix.map(
    (user: IUser) => queryValuePromise<IUser>(insertArticle, user),
  );
  await Promise.all(promiseList);
}

async function populateArticle():Promise<IArticleMongo[]> {
  const insertArticle = 'INSERT INTO article SET ?';
  const articlesPromises = articlesFix.map(async (ele: IArticleMongo) => {
    const article = { title: ele.title, author: ele.author, lang: ele.lang } as IArticle;
    return queryInsertPromise<IArticle>(insertArticle, article as IArticle);
  });
  const resultPromises = await Promise.all(articlesPromises);
  return articlesFix.map(
    (art: IArticleMongo, index) => ({ ...resultPromises[index].valuesId, ...art } as IArticleMongo),
  );
}

async function populateArticleLine(articles: IArticleMongo[]):Promise<void> {
  const insertArticleLine = 'INSERT INTO article_line SET ?';
  const articleLinesPromises = articles.reduce((prev: IArticleLine[], art: IArticleMongo) => {
    const part = { lang: art.lang, article: art.id };
    if (art.content instanceof Array) {
      const lines = art.content.map((c) => (
        queryInsertPromise(insertArticleLine, { ...part, content: c })
      ));
      return [...prev, ...lines] as IArticleLine[];
    }
    const line = queryInsertPromise(insertArticleLine, { ...part, content: art.content });
    return [...prev, line] as IArticleLine[];
  }, []);
  await Promise.all(articleLinesPromises);
}

async function populateTag():Promise<void> {
  const insertTag = 'INSERT INTO tag SET ?';
  let tagList: string[] = [];
  articlesFixtures.forEach((art: IArticleMongo) => {
    const tagCandidates = art.tags.filter(
      (tag) => !tagList.find((tl) => tl === tag),
    );
    tagList = [...tagList, ...tagCandidates];
  });
  const tagListPromises = tagList.map((t) => queryValuePromise(insertTag, { name: t }));
  await Promise.all(tagListPromises);
}

async function populateTagArticle(articles: IArticleMongo[]):Promise<void> {
  const insertTagArticle = 'INSERT INTO tag_article SET ?';
  const tagArticle = articles.reduce((prev: string[], art: IArticleMongo) => {
    const tags = art.tags.map((tag) => ({ tag, article: art.id }));
    return [...prev, ...tags] as string[];
  }, []);
  const tagArticlePromises = tagArticle.map((ta) => queryValuePromise(insertTagArticle, ta));
  await Promise.all(tagArticlePromises);
}

async function populate() {
  await populateUser();
  const articles = await populateArticle();
  await populateArticleLine(articles);
  await populateTag();
  await populateTagArticle(articles);
}

export default populate;
