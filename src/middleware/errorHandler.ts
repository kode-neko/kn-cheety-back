import {
  ErrorRequestHandler, Request, Response,
} from 'express';

function errorHandler(err: ErrorRequestHandler, req: Request, res: Response) {
  res
    .status(404)
    .send({ error: err });
}

export default errorHandler;
