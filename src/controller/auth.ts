import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../model/mongo/index.js';

const user = new User();

function signup(req: Request, res: Response): void {
  const { name, email, pass } = req.body;
  user.select({ name, email })
    .then((find) => {
      if (find) {
        res.status(409).json({ msg: 'The user exists' }).end();
      } else {
        const salt = bcrypt.genSaltSync();
        const passHash = bcrypt.hashSync(pass, salt);
        user.insert({
          name, email, pass: passHash, salt,
        });
      }
    })
    .then(() => res.status(201).json({ msg: 'created' }));
}

function login(req: Request, res: Response): void {
  res.status(200).json(req.body);
}

function logout(req: Request, res: Response): void {
  res.status(200).json(req.body);
}

export {
  signup,
  login,
  logout,
};
