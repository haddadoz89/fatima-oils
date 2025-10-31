import { Router } from 'express';
import { mixesController } from './mixes.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = Router();

router.get('/public', mixesController.getPublicMixes);
router.get('/my-mixes', verifyToken, mixesController.getUserMixes);
router.get('/:id', mixesController.getById);
router.post('/', verifyToken, mixesController.create);
router.delete('/:id', verifyToken, mixesController.delete);

export default router;
