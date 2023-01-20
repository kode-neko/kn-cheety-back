import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './server.js';
import {
  console, envSelect, i18nextConfig,
} from './utils/index.js';
import { getURL } from './utils/mongo/index.js';

i18nextConfig();
dotenv.config({ path: envSelect() });

mongoose.connect(getURL())
  .then(() => {
    console.log('port', process.env.SERVER_PORT);
    app.listen(process.env.SERVER_PORT);
  })
  .catch((err) => console.error(err));
