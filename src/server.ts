import express from 'express';
import helmet from 'helmet';
import { errorHandler, notFound, rateLimiter } from './middleware/index.js';
import {
  articleRouter,
  userRouter,
  authRouter,
} from './routes/index.js';

const app = express();
app.use(helmet());
app.use(rateLimiter);
app.use(express.json());
app.use('/article', articleRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
