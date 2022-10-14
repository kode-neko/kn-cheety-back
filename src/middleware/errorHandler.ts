import { Request, Response } from 'express';
import i18next from 'i18next';
import { ErrorServer } from '../config/index.js';

function errorHandler(err: ErrorServer, req: Request, res: Response) {
  res
    .status(err.code)
    .send({ name: err.message, msg: i18next.t(err.message) });
}

export default errorHandler;
