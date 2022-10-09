import { Request, Response } from 'express';
import { ArticleModel } from '../model/mongo/index.js';

const article = new ArticleModel();

function getArticle(req: Request, res: Response): void {
  res.status(200).json(req.body);
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
