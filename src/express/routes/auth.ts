import { Router } from 'express';
import { routes } from '../../config';
import {
  signup,
  login,
  logout,
} from '../controller/auth';

const router = Router();

router.post(routes.auth.signup, signup);
router.put(routes.auth.login, login);
router.put(routes.auth.logout, logout);

export default router;
