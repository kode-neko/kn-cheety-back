import { Connection } from 'mysql';
import { queryPromise } from './utils.js';

async function drop(con: Connection):Promise<void> {
  const dropTables = 'DROP TABLE IF EXISTS article_line, tag_article, tag, article, user';
  await queryPromise(con, dropTables);
}

export default drop;
