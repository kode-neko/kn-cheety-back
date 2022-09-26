import dotenv from 'dotenv';

function envSelect(env: string): void {
  switch (env) {
    case 'prod':
      dotenv.config();
      break;
    case 'dev':
      dotenv.config({ path: '../.env.test' });
      break;
    default:
      throw new Error('The env params must be "dev" or "prod"');
  }
}

export default envSelect;
