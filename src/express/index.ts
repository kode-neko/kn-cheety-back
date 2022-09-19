import dotenv from 'dotenv';
import express from 'express';
import {
  articleRouter,
  userRouter,
  authRouter,
} from './routes/index';

dotenv.config();

const app = express();
app.use('/article', articleRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(express.json());
app.listen(process.env.SERVER_PORT);
