import { Connection } from 'mysql';
import { queryPromise } from './utils.js';

async function deleteData(con: Connection):Promise<void> {
  const tables = ['article_line', 'tag_article', 'tag', 'article', 'user'];
  const promises = tables.map((table) => {
    const deleteStr = `DELETE FROM ${table}`;
    return queryPromise(con, deleteStr);
  });
  await Promise.all(promises);
}
export default deleteData;
