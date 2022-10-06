import dotenv from 'dotenv';
import path from 'path';

function envSelect(env = 'dev'): void {
  let pathDotEnv: string;
  switch (env) {
    case 'prod':
      pathDotEnv = '.env';
      break;
    case 'dev':
      pathDotEnv = '.env.test';
      break;
    default:
      throw new Error('The env params must be "dev" or "prod"');
  }
  dotenv.config({ path: path.resolve(process.cwd(), pathDotEnv) });
}

export default envSelect;
