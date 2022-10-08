import { queryPromise } from './connect.js';

async function deleteData():Promise<void> {
  const tables = ['article_line', 'tag_article', 'tag', 'article', 'user'];
  const promises = tables.map((table) => {
    const deleteStr = `DELETE FROM ${table}`;
    return queryPromise(deleteStr);
  });
  await Promise.all(promises);
}
export default deleteData;
