import { Request, Response, NextFunction } from 'express';
import { ErrorCodes, ErrorServer } from '../config/index.js';
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
    .catch(() => { next(new ErrorServer(ErrorCodes.SERVER_ERROR)); });
}

function getUserId(req: Request, res: Response, next: NextFunction): void {
  const { name } = req.params;
  user.selectByid({ name })
    .then((usr) => res.status(200).json(usr))
    .catch(() => { next(new ErrorServer(ErrorCodes.SERVER_ERROR)); });
}

function postUser(req: Request, res: Response, next: NextFunction): void {
  const newArt = req.body;
  user.insert(newArt)
    .then((usr) => res.status(201).json(usr))
    .catch(() => { next(new ErrorServer(ErrorCodes.SERVER_ERROR)); });
}

function putUser(req: Request, res: Response, next: NextFunction): void {
  const { name, ...params } = req.body;
  user.update(params, { name })
    .then((count) => res.status(200).json({ affected: count }))
    .catch(() => { next(new ErrorServer(ErrorCodes.SERVER_ERROR)); });
}

function deleteUser(req: Request, res: Response, next: NextFunction): void {
  const { name } = req.params;
  user.delete({ name })
    .then((count) => res.status(200).json({ affected: count }))
    .catch(() => { next(new ErrorServer(ErrorCodes.SERVER_ERROR)); });
}

export {
  findUser,
  getUserId,
  postUser,
  putUser,
  deleteUser,
};
