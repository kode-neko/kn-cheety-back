const { create } = require('./create');
const { populate } = require('./populate');
const { drop } = require('./drop');
const { getCon } = require('./sql');
const { menu } = require('./menu');

module.exports = {
  create,
  populate,
  drop,
  getCon,
  menu,
};
