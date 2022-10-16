import bcrypt from 'bcrypt';
import basicAuth from 'basic-auth';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ErrorCodes, ErrorServer } from '../config/index.js';
import { IUser, User } from '../model/mongo/index.js';

const user = new User();

function signup(req: Request, res: Response, next: NextFunction) {
  const { name, email, pass } = req.body;
  user.select({ name, email })
    .then((find): Promise<IUser> => {
      if (find.length !== 0) {
        res.status(409).json({ msg: 'The user exists' });
        next();
      }
      const salt = bcrypt.genSaltSync();
      const passHash = bcrypt.hashSync(pass, salt);
      return user.insert({
        name, email, pass: passHash, salt,
      });
    })
    .then(() => res.status(201).json({ msg: 'created' }))
    .catch(() => { throw new ErrorServer(ErrorCodes.SERVER_ERROR); });
}

async function login(req: Request, res: Response) {
  const credentials = basicAuth(req);
  if (!credentials) {
    throw new ErrorServer(ErrorCodes.ATHENTICATION_ERROR);
  }
  const { name, pass } = credentials;
  const userCheck = await user.select({ name });
  const hash = bcrypt.hashSync(pass, userCheck[0].salt);
  if (hash === userCheck[0].pass) {
    const token = jwt.sign(
      { id: userCheck[0].name },
      process.env.API_SECRET as jwt.Secret,
      { expiresIn: 86400 },
    );
    res
      .status(200)
      .json({
        user: { name, email: userCheck[0].email },
        message: 'Logins successfull',
        accessToken: token,
      });
  } else {
    throw new ErrorServer(ErrorCodes.ATHENTICATION_ERROR);
  }
}

export {
  signup,
  login,
};
