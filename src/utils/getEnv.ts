import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

function getEnv() {
  const argsv = yargs(hideBin(process.argv))
    .option('m', {
      alias: 'mode',
      default: 'dev',
      demandOption: true,
      choices: ['dev', 'prod'],
      describe: 'Selecciona modo despliegue',
      type: 'string',
    })
    .argv as { [s: string]: unknown };

  return argsv.m as string;
}

export default getEnv;
