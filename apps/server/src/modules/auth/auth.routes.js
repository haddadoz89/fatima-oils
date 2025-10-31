import { Router } from 'express';
import { authController } from './auth.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { authRateLimiter } from '../../middleware/security.js';

const router = Router();

router.post('/sign-up', authRateLimiter, authController.signUp);
router.post('/sign-in', authRateLimiter, authController.signIn);
router.get('/profile', verifyToken, authController.getProfile);

export default router;
