import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../model/mongo/index.js';
import { ErrorServer, ErrorCodes } from '../config/index.js';

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization || authorization.split(' ').length !== 2 || authorization.split(' ')[0] !== 'Bearer') {
    next(new ErrorServer(ErrorCodes.AUTHORIZATION_ERROR));
  } else {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.API_SECRET as jwt.Secret) as JwtPayload;
    if (payload) {
      const user = new User();
      const { name } = payload;
      const userFinded = await user.select({ name });
      if (userFinded && userFinded.length === 1) {
        next();
      } else {
        next(new ErrorServer(ErrorCodes.AUTHORIZATION_ERROR));
      }
    } else {
      next(new ErrorServer(ErrorCodes.AUTHORIZATION_ERROR));
    }
  }
}

export default verifyToken;
