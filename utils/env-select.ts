import dotenv from 'dotenv';
import path from 'path';

function envSelect(env: string): void {
  const pathDotEnv = path.resolve(process.cwd(), '.env.test');
  switch (env) {
    case 'prod':
      dotenv.config();
      break;
    case 'dev':
      dotenv.config({ path: pathDotEnv });
      break;
    default:
      throw new Error('The env params must be "dev" or "prod"');
  }
}

export default envSelect;
