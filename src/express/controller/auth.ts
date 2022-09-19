import { Request, Response } from 'express';

function signup(req: Request, res: Response): void {
  res.status(200).json(req.body);
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
