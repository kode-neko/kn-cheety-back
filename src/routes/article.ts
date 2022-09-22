import { Router } from 'express';
import {
  getArticle,
  getArticleId,
  postArticle,
  putArticle,
  deleteArticle,
} from '../controller/article';

const router = Router();

router.get('/', getArticle);
router.get('/:id', getArticleId);
router.post('/', postArticle);
router.put('/', putArticle);
router.delete('/', deleteArticle);

export default router;
