const { create } = require('./create');
const { deleteFrom } = require('./delete-from');
const { populate } = require('./populate');
const { drop } = require('./drop');
const { getCon } = require('./sql');
const { menu } = require('./menu');

module.exports = {
  create,
  deleteFrom,
  populate,
  drop,
  getCon,
  menu,
};
