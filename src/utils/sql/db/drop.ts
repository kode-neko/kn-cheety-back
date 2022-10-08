import { queryPromise } from './connect';

async function drop():Promise<void> {
  const dropTables = 'DROP TABLE IF EXISTS article_line, tag_article, tag, article, user';
  await queryPromise(dropTables);
}

export default drop;
