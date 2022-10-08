import { Router } from 'express';
import {
  signup,
  login,
  logout,
} from '../controller/auth.js';

const router = Router();

router.post('/signup', signup);
router.put('/login', login);
router.put('/logout', logout);

export default router;
