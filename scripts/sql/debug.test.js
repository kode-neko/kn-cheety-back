const chalk = require('chalk');
const figlet = require('figlet');
const { console } = require('../../utils');
const { getCon } = require('./sql');
const { create } = require('./create');
const { populate } = require('./populate');
const { drop } = require('./drop');

async function debug() {
  console.log(
    chalk.bold.magentaBright(
      figlet.textSync('Debug SQL', {
        font: 'Crawford2',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    ),
  );
  try {
    await create();
    await populate();
    await drop();
  } catch (err) {
    console.error(err);
    await drop();
  } finally {
    getCon().end();
  }
}

debug();
