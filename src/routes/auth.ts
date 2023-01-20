import { Router } from 'express';
import {
  signup,
  login,
} from '../controller/auth.js';

const router = Router();

router.post('/signup', signup);
router.put('/login', login);

export default router;
