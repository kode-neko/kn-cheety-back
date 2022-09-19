import { Request, Response } from 'express';

function getArticle(req: Request, res: Response): void {
  res.status(200).json([]);
}

function getArticleId(req: Request, res: Response): void {
  res.status(200).json({});
}

function postArticle(req: Request, res: Response): void {
  res.status(201).json({});
}

function putArticle(req: Request, res: Response): void {
  res.status(200).json({});
}

function deleteArticle(req: Request, res: Response): void {
  res.status(200).json({});
}

export {
  getArticle,
  getArticleId,
  postArticle,
  putArticle,
  deleteArticle,
};
