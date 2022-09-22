import { Request, Response } from 'express';

function getUser(req: Request, res: Response): void {
  res.status(200).json(req.body);
}

function getUserId(req: Request, res: Response): void {
  res.status(200).json({});
}

function postUser(req: Request, res: Response): void {
  res.status(201).json({});
}

function putUser(req: Request, res: Response): void {
  res.status(200).json({});
}

function deleteUser(req: Request, res: Response): void {
  res.status(200).json({});
}

export {
  getUser,
  getUserId,
  postUser,
  putUser,
  deleteUser,
};
