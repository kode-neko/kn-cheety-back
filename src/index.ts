import dotenv from 'dotenv';
import app from './server.js';
import {
  console, envSelect, getEnv, i18nextConfig,
} from './utils/index.js';

i18nextConfig();
const path = envSelect(getEnv());
dotenv.config({ path });

try {
  console.log('port', process.env.SERVER_PORT);
  app.listen(process.env.SERVER_PORT);
} catch (err) {
  console.error(err);
}
