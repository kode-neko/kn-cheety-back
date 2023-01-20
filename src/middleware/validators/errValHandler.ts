import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ErrorCodes, ErrorServer } from '../../config/index.js';

function errValHandler(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    throw new ErrorServer(ErrorCodes.PARAMS_NOT_VALID);
  }
}

export default errValHandler;
