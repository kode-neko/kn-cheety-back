import { Request, Response } from 'express';
import { ErrorCodes, ErrorServer } from '../config/index.js';
import { Article } from '../model/mongo/index.js';

const article = new Article();

function findArticle(req: Request, res: Response): void {
  const { skip, limit, tags } = req.body;
  let params = {};
  if (tags && tags.length !== 0) {
    params = { tags: { $in: tags } };
  }
  article.select(params, skip && Number(skip), limit && Number(limit))
    .then((arts) => res.status(200).json(arts))
    .catch(() => { throw new ErrorServer(ErrorCodes.SERVER_ERROR); });
}

function getArticleId(req: Request, res: Response): void {
  const { id } = req.params;
  article.selectByid({ id })
    .then((art) => res.status(200).json(art))
    .catch(() => { throw new ErrorServer(ErrorCodes.SERVER_ERROR); });
}

function postArticle(req: Request, res: Response): void {
  const newArt = req.body;
  article.insert(newArt)
    .then((art) => res.status(201).json(art))
    .catch(() => { throw new ErrorServer(ErrorCodes.SERVER_ERROR); });
}

function putArticle(req: Request, res: Response): void {
  const { id, ...params } = req.body;
  article.update(params, { id })
    .then((count) => res.status(200).json({ affected: count }))
    .catch(() => { throw new ErrorServer(ErrorCodes.SERVER_ERROR); });
}

function deleteArticle(req: Request, res: Response): void {
  const { id } = req.params;
  article.delete({ id })
    .then((count) => res.status(200).json({ affected: count }))
    .catch(() => { throw new ErrorServer(ErrorCodes.SERVER_ERROR); });
}

export {
  findArticle,
  getArticleId,
  postArticle,
  putArticle,
  deleteArticle,
};
