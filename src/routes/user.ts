import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';
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

router.post('/find', verifyToken, findUser);
router.get('/:name', verifyToken, getUserId);
router.post('/', verifyToken, postUser);
router.put('/', verifyToken, putUser);
router.delete('/:name', verifyToken, deleteUser);

export default router;
