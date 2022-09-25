import express from 'express';
import {
  articleRouter,
  userRouter,
  authRouter,
} from './routes/index';

const app = express();
app.use('/article', articleRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(express.json());

export default app;
