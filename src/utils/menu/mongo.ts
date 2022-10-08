import dotenv from 'dotenv';
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { MongoError } from 'mongodb';
import console from '../console.js';
import envSelect from '../envSelect.js';
import getEnv from '../getEnv.js';
import {
  getURL,
  getClient,
  create,
  createAll,
  deleteAll,
  deleteData,
  drop,
  populate,
} from '../mongo/index.js';

const path = envSelect(getEnv());
dotenv.config({ path });

const choices = {
  createAll: {
    opt: {
      name: 'Create All',
      value: 'createAll',
      short: '1',
    },
    func: createAll,
  },
  deleteAll: {
    opt: {
      name: 'Delete collections',
      value: 'deleteAll',
      short: '2',
    },
    func: deleteAll,
  },
  create: {
    opt: {
      name: 'Create',
      value: 'create',
      short: '3',
    },
    func: create,
  },
  populate: {
    opt: {
      name: 'Populate',
      value: 'populate',
      short: '4',
    },
    func: populate,
  },
  deleteData: {
    opt: {
      name: 'Delete Data',
      value: 'deleteData',
      short: '5',
    },
    func: deleteData,
  },
  drop: {
    opt: {
      name: 'Drop',
      value: 'drop',
      short: '5',
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

  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'option',
      loop: false,
      message: 'Select an operation',
      choices: Object.entries(choices).map(([, val]) => val.opt),
    },
  ]).then(async (answer) => {
    const url = getURL();
    const client = await getClient(url);
    const db = client.db();
    try {
      (choices as any)[answer.option].func(db);
    } catch (err) {
      console.error((err as MongoError).errmsg);
      await drop(db);
    } finally {
      client.close();
    }
    process.exit(1);
  });
}

export default menu;
