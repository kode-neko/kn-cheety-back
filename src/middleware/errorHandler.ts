import { Request, Response, NextFunction } from 'express';
import i18next from 'i18next';
import { ErrorServer } from '../config/errorInfo.js';
import console from '../utils/console.js';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const errorS = err as ErrorServer;
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  }
  if (res.headersSent) {
    next(err);
  } else {
    console.error('STACK', err.stack);
    res.status(errorS.code);
    res.json({ code: err.message, msg: i18next.t(`error.${err.message}`) });
  }
}

export default errorHandler;
