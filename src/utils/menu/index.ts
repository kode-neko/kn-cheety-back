import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import console from '../console.js';
import envSelect from '../envSelect.js';
import { default as mongo } from './mongo.js';
import { default as sql } from './sql.js';

const argsv = yargs(hideBin(process.argv))
  .option('db', {
    alias: 'database',
    demandOption: true,
    choices: ['mongo', 'sql'],
    describe: 'Seleccionar tipo de datbase',
    type: 'string',
  })
  .argv as { [s: string]: unknown };

switch (argsv.db as string) {
  case 'mongo':
    mongo();
    break;
  case 'sql':
    sql();
    break;
  default:
    console.log('No existe la DB');
}

envSelect();
