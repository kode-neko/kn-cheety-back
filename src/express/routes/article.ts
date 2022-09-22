import { Router } from 'express';
import { routes } from '../../config';
import {
  getArticle,
  getArticleId,
  postArticle,
  putArticle,
  deleteArticle,
} from '../controller/article';

const router = Router();

router.get(routes.gen.get, getArticle);
router.get(routes.gen.getId, getArticleId);
router.post(routes.gen.post, postArticle);
router.put(routes.gen.put, putArticle);
router.delete(routes.gen.delete, deleteArticle);

export default router;
