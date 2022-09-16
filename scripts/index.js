const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const menuSQL = require('./sql').menu;
const menuMongo = require('./mongo').menu;

const argsv = yargs(hideBin(process.argv))
  .usage('Crear base de datos para Cheety')
  .command('CreateDBCheety', 'Crear la base de datos de la app Cheety')
  .alias('db', 'database')
  .nargs('db', 1)
  .describe('db', 'especificar la base de datos')
  .help('h')
  .alias('h', 'help')
  .demandOption(['db'])
  .epilog('Kodeneko CopyLeft 2022')
  .argv;

switch (argsv.db) {
  case 'sql':
    menuSQL();
    break;
  case 'mongo':
    menuMongo();
    break;
  default:
    console.log('opción no válida');
}
