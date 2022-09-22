import express from 'express';
import { routes } from './config';
import {
  articleRouter,
  userRouter,
  authRouter,
} from './routes/index';

const app = express();
app.use(routes.article.name, articleRouter);
app.use(routes.user.name, userRouter);
app.use(routes.auth.name, authRouter);
app.use(express.json());

export default app;
