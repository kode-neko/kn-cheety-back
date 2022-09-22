import { Router } from 'express';
import { routes } from '../../config';
import {
  getUser,
  getUserId,
  postUser,
  putUser,
  deleteUser,
} from '../controller/user';

const router = Router();

router.get(routes.gen.get, getUser);
router.get(routes.gen.getId, getUserId);
router.post(routes.gen.post, postUser);
router.put(routes.gen.put, putUser);
router.delete(routes.gen.delete, deleteUser);

export default router;
