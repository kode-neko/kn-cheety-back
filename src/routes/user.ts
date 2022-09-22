import { Router } from 'express';
import {
  getUser,
  getUserId,
  postUser,
  putUser,
  deleteUser,
} from '../controller/user';

const router = Router();

router.get('/', getUser);
router.get('/:id', getUserId);
router.post('/', postUser);
router.put('/', putUser);
router.delete('/', deleteUser);

export default router;
