import { Router } from 'express';

import {
  signup,
  login,
  logout,
} from '../controller/auth';

const router = Router();

router.post('/', signup);
router.put('/', login);
router.put('/:', logout);

export default router;
