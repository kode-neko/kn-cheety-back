const { console } = require('../../utils');
const { queryPromise } = require('./sql');

async function drop() {
  const dropTables = 'DROP TABLE IF EXISTS article_line, tag_article, tag, article, user';
  await queryPromise(dropTables);
  console.log('- Deleted all tables');
}

module.exports = {
  drop,
};
