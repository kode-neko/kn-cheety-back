import { IArticle, IArticleMongo } from '../../../model/mongo/index.js';

function idToMongoIdArticle(article: IArticle):IArticleMongo {
  const {
    id, title, content, tags, author, lang,
  } = article;
  return {
    _id: id,
    title,
    content,
    tags,
    author,
    lang,
  };
}

function mongoIdToIdArticle(articleM: IArticleMongo):IArticle {
  const {
    _id, title, content, tags, author, lang,
  } = articleM;
  return {
    id: _id,
    title,
    content,
    tags,
    author,
    lang,
  };
}

export {
  idToMongoIdArticle,
  mongoIdToIdArticle,
};
