import { Request, Response, NextFunction } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';
import { User } from '../model/mongo/index.js';
import { ErrorServer, ErrorCodes } from '../config/index.js';

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization || authorization.length !== 2 || authorization[0] !== 'Bearer') {
    throw new ErrorServer(ErrorCodes.AUTHORIZATION_ERROR);
  }
  const token = authorization[1];
  const info = jwt.verify(token, process.env.API_SECRET as jwt.Secret) as Jwt;
  if (info) {
    const user = new User();
    const payload = info.payload as jwt.JwtPayload;
    const name = payload.name as string;
    const userFinded = await user.select({ name });
    if (userFinded && userFinded.length === 1) {
      next();
    } else {
      throw new ErrorServer(ErrorCodes.AUTHORIZATION_ERROR);
    }
  } else {
    throw new ErrorServer(ErrorCodes.AUTHORIZATION_ERROR);
  }
}

export default verifyToken;
