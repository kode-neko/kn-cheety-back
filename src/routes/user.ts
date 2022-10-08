import { Router } from 'express';
import {
  getUser,
  getUserId,
  postUser,
  putUser,
  deleteUser,
} from '../controller/user.js';

const router = Router();

router.get('/', getUser);
router.get('/:id', getUserId);
router.post('/', postUser);
router.put('/', putUser);
router.delete('/:id', deleteUser);

export default router;
