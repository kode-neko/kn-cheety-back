require('dotenv').config();
const { Console } = require('console');

const chalk = require('chalk');
const figlet = require('figlet');
const prompt = require('inquirer').propmt;

const { getDbHere, populate, drop } = require('./mongo');

const console = new Console(process.stdout, process.stderr);

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
  ])
    .then(async (answer) => {
      const [, db] = await getDbHere();
      choices[answer.option].func(db);
      process.exit(1);
    })
    .catch(async (err) => {
      const [client] = await getDbHere();
      console.error('Error', err);
      client.close().then(() => console.log('Conexión cerrada')).catch((err2) => console.error(err2));
      process.exit(1);
    });
}

module.exports = {
  menu,
};
