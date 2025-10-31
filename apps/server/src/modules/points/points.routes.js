import { Router } from 'express';
import { pointsController } from './points.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = Router();

router.use(verifyToken);

router.get('/', pointsController.getPoints);

export default router;
