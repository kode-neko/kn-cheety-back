import { Router } from 'express';
import {
  findArticle,
  getArticleId,
  postArticle,
  putArticle,
  deleteArticle,
} from '../controller/article.js';

const router = Router();

router.post('/find', findArticle);
router.get('/:id', getArticleId);
router.post('/', postArticle);
router.put('/', putArticle);
router.delete('/:id', deleteArticle);

export default router;
