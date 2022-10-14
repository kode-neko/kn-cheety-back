import { Router } from 'express';
import { validId, validListArticle, validListFind } from '../middleware/validators/index.js';
import {
  findArticle,
  getArticleId,
  postArticle,
  putArticle,
  deleteArticle,
} from '../controller/article.js';

const router = Router();

router.post('/find', validListFind, findArticle);
router.get('/:id', validId, getArticleId);
router.post('/', validListArticle, postArticle);
router.put('/', validListArticle, putArticle);
router.delete('/:id', validId, deleteArticle);

export default router;
