import express from 'express';
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

export default app;
