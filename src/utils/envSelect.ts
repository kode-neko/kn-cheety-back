import path from 'path';

function envSelect(env = 'dev'): string {
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
  return path.resolve(process.cwd(), pathDotEnv);
}

export default envSelect;
