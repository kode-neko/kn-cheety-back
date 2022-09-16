require('dotenv').config();

const chalk = require('chalk');
const figlet = require('figlet');
const { prompt } = require('inquirer');
const { console } = require('../../utils');

const { getDbHere, populate, drop } = require('./mongo');

const choices = {
  populate: {
    opt: {
      name: 'Create collections',
      value: 'populate',
      short: '1',
    },
    func: populate,
  },
  drop: {
    opt: {
      name: 'Drop collections',
      value: 'drop',
      short: '2',
    },
    func: drop,
  },
};

function menu() {
  console.log(
    chalk.bold.magentaBright(
      figlet.textSync('Cheety Mongo', {
        font: 'Cosmike',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    ),
  );

  prompt([
    {
      type: 'rawlist',
      name: 'option',
      loop: false,
      message: 'Select a operation',
      choices: Object.entries(choices).map(([, val]) => val.opt),
    },
  ]).then(async (answer) => {
    const [client, db] = await getDbHere();
    try {
      choices[answer.option].func(db);
    } catch (err) {
      console.error(err.sqlMessage);
      await drop();
    } finally {
      client.close();
    }
    process.exit(1);
  });
}

module.exports = {
  menu,
};
