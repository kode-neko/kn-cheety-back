import { Router } from 'express';
import { verifyToken } from '../middleware/index.js';
import {
  errValHandler, validId, validListArticle, validListFind,
} from '../middleware/validators/index.js';
import {
  findArticle,
  getArticleId,
  postArticle,
  putArticle,
  deleteArticle,
} from '../controller/article.js';

const router = Router();

router.post('/find', verifyToken, findArticle);
router.get('/:id', verifyToken, getArticleId);
router.post('/', verifyToken, postArticle);
router.put('/', verifyToken, putArticle);
router.delete('/:id', verifyToken, deleteArticle);

export default router;
