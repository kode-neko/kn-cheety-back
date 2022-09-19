import { Request, Response } from 'express';

function getUser(req: Request, res: Response): void {
  res.status(200).json(req.body);
}

function getUserId(req: Request, res: Response): void {
  res.status(200).json(req.body);
}

function postUser(req: Request, res: Response): void {
  res.status(200).json(req.body);
}

function putUser(req: Request, res: Response): void {
  res.status(200).json(req.body);
}

function deleteUser(req: Request, res: Response): void {
  res.status(200).json(req.body);
}

export {
  getUser,
  getUserId,
  postUser,
  putUser,
  deleteUser,
};
