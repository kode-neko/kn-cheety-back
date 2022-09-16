require('dotenv').config();
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const { console } = require('../../utils/console');
const { create } = require('./create');
const { populate } = require('./populate');
const { drop } = require('./drop');
const { getCon } = require('./sql');

const choices = {
  create: {
    opt: {
      name: 'Create Tables',
      value: 'create',
      short: '1',
    },
    func: create,
  },
  populate: {
    opt: {
      name: 'Populate Tables',
      value: 'populate',
      short: '2',
    },
    func: populate,
  },
  drop: {
    opt: {
      name: 'Drop Tables',
      value: 'drop',
      short: '3',
    },
    func: drop,
  },
};

console.log(
  chalk.bold.magentaBright(
    figlet.textSync('Cheety SQL', {
      font: 'Crawford2',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    }),
  ),
);

inquirer.prompt([
  {
    type: 'rawlist',
    name: 'option',
    loop: true,
    message: 'Select a DB operation',
    choices: Object.entries(choices).map(([, val]) => val.opt),
  },
])
  .then(async (answer) => {
    try {
      await choices[answer.option].func();
      console.log('se fini');
    } catch (err) {
      console.error(err.sqlMessage);
      await drop();
    } finally {
      getCon().end();
    }
    return true;
  });
