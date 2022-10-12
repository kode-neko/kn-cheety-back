import { NextFunction, Request, Response } from 'express';
import { Article } from '../model/mongo/index.js';

const article = new Article();

function findArticle(req: Request, res: Response, next: NextFunction): void {
  const { skip, limit, tags } = req.body;
  let params = {};
  if (tags && tags.length !== 0) {
    params = { tags: { $in: tags } };
  }
  article.select(params, skip && Number(skip), limit && Number(limit))
    .then((arts) => res.status(200).json(arts))
    .catch((err) => next(err));
}

function getArticleId(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;
  article.selectByid({ id })
    .then((art) => res.status(200).json(art))
    .catch((err) => next(err));
}

function postArticle(req: Request, res: Response, next: NextFunction): void {
  const newArt = req.body;
  article.insert(newArt)
    .then((art) => res.status(201).json(art))
    .catch((err) => next(err));
}

function putArticle(req: Request, res: Response, next: NextFunction): void {
  const { id, ...params } = req.body;
  article.update(params, { id })
    .then((count) => res.status(200).json({ affected: count }))
    .catch((err) => next(err));
}

function deleteArticle(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;
  article.delete({ id })
    .then((count) => res.status(200).json({ affected: count }))
    .catch((err) => next(err));
}

export {
  findArticle,
  getArticleId,
  postArticle,
  putArticle,
  deleteArticle,
};
