import { Router } from 'express';
import {
  validEmail, validListFind, validNameParam, validSignUp,
} from '../middleware/validators/index.js';
import {
  findUser,
  getUserId,
  postUser,
  putUser,
  deleteUser,
} from '../controller/user.js';

const router = Router();

router.post('/find', validListFind, findUser);
router.get('/:name', validNameParam, getUserId);
router.post('/', validSignUp, postUser);
router.put('/', validEmail, putUser);
router.delete('/:name', validNameParam, deleteUser);

export default router;
