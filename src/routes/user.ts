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

router.post('/find', findUser);
router.get('/:name', getUserId);
router.post('/', postUser);
router.put('/', putUser);
router.delete('/:name', deleteUser);

export default router;
