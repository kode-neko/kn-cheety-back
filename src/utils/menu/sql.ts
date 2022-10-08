import dotenv from 'dotenv';
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { MysqlError } from 'mysql';
import console from '../console';
import envSelect from '../envSelect';
import getEnv from '../getEnv';
import {
  getCon,
  create,
  createAll,
  deleteAll,
  deleteData,
  drop,
  populate,
} from '../sql';

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
        await (choices as any)[answer.option].func();
        console.log('se fini');
      } catch (err) {
        console.error((err as MysqlError).message);
        await drop();
      } finally {
        getCon().end();
      }
      return true;
    });
}

export default menu;
