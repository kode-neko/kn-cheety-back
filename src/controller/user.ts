import { NextFunction, Request, Response } from 'express';
import { User } from '../model/mongo/index.js';

const user = new User();

function findUser(req: Request, res: Response, next: NextFunction): void {
  const { skip, limit, name } = req.body;
  let params = {};
  if (name) {
    params = { name: { $in: name } };
  }
  user.select(params, skip && Number(skip), limit && Number(limit))
    .then((usrs) => res.status(200).json(usrs))
    .catch((err) => next(err));
}

function getUserId(req: Request, res: Response, next: NextFunction): void {
  const { name } = req.params;
  user.selectByid({ name })
    .then((usr) => res.status(200).json(usr))
    .catch((err) => next(err));
}

function postUser(req: Request, res: Response, next: NextFunction): void {
  const newArt = req.body;
  user.insert(newArt)
    .then((usr) => res.status(201).json(usr))
    .catch((err) => next(err));
}

function putUser(req: Request, res: Response, next: NextFunction): void {
  const { name, ...params } = req.body;
  user.update(params, { name })
    .then((count) => res.status(200).json({ affected: count }))
    .catch((err) => next(err));
}

function deleteUser(req: Request, res: Response, next: NextFunction): void {
  const { name } = req.params;
  user.delete({ name })
    .then((count) => res.status(200).json({ affected: count }))
    .catch((err) => next(err));
}

export {
  findUser,
  getUserId,
  postUser,
  putUser,
  deleteUser,
};
