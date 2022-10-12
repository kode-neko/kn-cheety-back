import express from 'express';
import { errorHandler, notFound } from './middleware/index.js';
import {
  articleRouter,
  userRouter,
  authRouter,
} from './routes/index.js';

const app = express();
app.use(express.json());
app.use('/article', articleRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
