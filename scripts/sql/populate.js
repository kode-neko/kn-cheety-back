const articlesFix = require('../../fixtures/articles.json');
const usersFix = require('../../fixtures/users.json');

const { console } = require('../../utils');
const { queryValuePromise, queryInsertPromise } = require('./sql');

async function populateUser() {
  const insertArticle = 'INSERT INTO user SET ?';
  const promiseList = usersFix.map((user) => queryValuePromise(insertArticle, user));
  const users = await Promise.all(promiseList);
  users.map((user) => console.log(`- Inserted user "${user.values.name}"`));
}

async function populateArticle() {
  const insertArticle = 'INSERT INTO article SET ?';
  const articlesPromises = articlesFix.map(async (ele) => {
    const article = { title: ele.title, author: ele.author, lang: ele.lang };
    return queryInsertPromise(insertArticle, article);
  });
  const articles = await Promise.all(articlesPromises);
  articles.map((art) => console.log(`- Inserted article "${art.valuesId.id}"`));
  return articlesFix.map((art, index) => ({ ...articles[index].valuesId, ...art }));
}

async function populateArticleLine(articles) {
  const insertArticleLine = 'INSERT INTO article_line SET ?';
  const articleLinesPromises = articles.reduce((prev, art) => {
    const part = { lang: art.lang, article: art.id };
    if (art.content instanceof Array) {
      const lines = art.content.map((c) => (
        queryInsertPromise(insertArticleLine, { ...part, content: c })
      ));
      return [...prev, ...lines];
    }
    const line = queryInsertPromise(insertArticleLine, { ...part, content: art.content });
    return [...prev, line];
  }, []);
  const articleLines = await Promise.all(articleLinesPromises);
  articleLines.map((artl) => console.log(`- Inserted articleLine line "${artl.valuesId.id}"`));
}

async function populateTag() {
  const insertTag = 'INSERT INTO tag SET ?';
  let tagList = [];
  articlesFix.forEach((art) => {
    const tagCandidates = art.tags.filter((tag) => !tagList.find((tl) => tl === tag));
    tagList = [...tagList, ...tagCandidates];
  });
  const tagListPromises = tagList.map((t) => queryValuePromise(insertTag, { name: t }));
  const tagListInserted = await Promise.all(tagListPromises);
  tagListInserted.map((tag) => console.log(`- Inserted tag "${tag.values.name}"`));
}

async function populateTagArticle(articles) {
  const insertTagArticle = 'INSERT INTO tag_article SET ?';
  const tagArticle = articles.reduce((prev, art) => {
    const tags = art.tags.map((tag) => ({ tag, article: art.id }));
    return [...prev, ...tags];
  }, []);
  const tagArticlePromises = tagArticle.map((ta) => queryValuePromise(insertTagArticle, ta));
  const tagArticleResult = await Promise.all(tagArticlePromises);
  tagArticleResult.map((tagArt) => console.log(`- Inserted tagArticle "${tagArt.values.article} - ${tagArt.values.tag}"`));
}

async function populate() {
  await populateUser();
  const articles = await populateArticle();
  await populateArticleLine(articles);
  await populateTag();
  await populateTagArticle(articles);
}

module.exports = {
  populate,
};
