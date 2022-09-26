import dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import app from './server';
import { console } from '../utils';

const argsv = yargs(hideBin(process.argv))
  .option('m', {
    alias: 'mode',
    default: 'dev',
    demandOption: true,
    choices: ['dev', 'prod'],
    describe: 'Select deploy mode',
    type: 'string',
  })
  .argv as { [x: string]: unknown };
console.log(argsv.m);
switch (argsv.m) {
  case 'prod':
    dotenv.config();
    console.log('Prod');
    app.listen(process.env.SERVER_PORT);
    break;
  case 'dev':
    dotenv.config({ path: '../.env.test' });
    console.log('Dev');
    app.listen(process.env.SERVER_PORT);
    break;
  default:
    console.log('Parametro "mode" invalido');
}
