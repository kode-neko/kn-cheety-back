import { queryPromise } from './connect';

async function create():Promise<void> {
  const createUser = `
    CREATE TABLE IF NOT EXISTS user(
      name VARCHAR(50) NOT NULL,
      email VARCHAR(75) NOT NULL UNIQUE,
      pass VARCHAR(100) NOT NULL,
      salt VARCHAR(100) NOT NULL,

      PRIMARY KEY(name)
    )
  `;
  const createArticle = `
    CREATE TABLE IF NOT EXISTS article(
      id INT UNSIGNED AUTO_INCREMENT,
      title VARCHAR(75),
      author VARCHAR(50) NOT NULL,
      lang VARCHAR(2) NOT NULL,

      PRIMARY KEY(id),
      CONSTRAINT fk_user
        FOREIGN KEY(author) REFERENCES user(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `;
  const createArticleLine = `
    CREATE TABLE IF NOT EXISTS article_line(
      id INT UNSIGNED AUTO_INCREMENT,
      content TINYTEXT,
      lang VARCHAR(2) NOT NULL,
      article INT UNSIGNED NOT NULL,

      PRIMARY KEY(id),
      CONSTRAINT fk_article
        FOREIGN KEY(article) REFERENCES article(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `;
  const createTag = `
    CREATE TABLE IF NOT EXISTS tag(
      name varchar(20) NOT NULL,

      PRIMARY KEY(name)
    )
  `;
  const createTagArticle = `
    CREATE TABLE IF NOT EXISTS tag_article(
      article INT UNSIGNED,
      tag VARCHAR(20),
      
      PRIMARY KEY(article, tag),
      CONSTRAINT fk_ta_article
        FOREIGN KEY(article) REFERENCES article(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_ta_tag
        FOREIGN KEY(tag) REFERENCES tag(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `;

  const userT = queryPromise(createUser);
  const articleT = queryPromise(createArticle);
  const articleLineT = queryPromise(createArticleLine);
  const tagT = queryPromise(createTag);
  const tagArticleT = queryPromise(createTagArticle);

  await Promise.all([userT, articleT, articleLineT, tagT, tagArticleT]);
}

export default create;
