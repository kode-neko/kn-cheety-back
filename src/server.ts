import express from 'express';
import helmet from 'helmet';
// import i18nextHttpMiddleware from 'i18next-http-middleware';
// import i18next from 'i18next';
import { errorHandler, notFound, rateLimiter } from './middleware/index.js';
import {
  articleRouter,
  userRouter,
  authRouter,
} from './routes/index.js';

const app = express();

// json
app.use(express.json());

// Security
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    'base-uri': ['self', 'localhost:3000'],
  },
}));
app.use(rateLimiter);
helmet.permittedCrossDomainPolicies({});
// i18n
// app.use(i18nextHttpMiddleware.handle(i18next, {}));

// Routes
app.use('/article', articleRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(notFound);

// Rrror handler
app.use(errorHandler);

export default app;
