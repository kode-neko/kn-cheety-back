const chalk = require('chalk');
const figlet = require('figlet');
const { console } = require('../../utils');
const { getDbHere, populate, drop } = require('./mongo');

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
  const [client, db] = await getDbHere();
  try {
    populate(db);
    drop(db);
  } catch (err) {
    console.error(err.sqlMessage);
    await drop();
  } finally {
    client.close();
  }
  process.exit(1);
}

debug();
