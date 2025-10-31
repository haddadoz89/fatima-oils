import { Router } from 'express';
import { cartController } from './cart.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = Router();

router.use(verifyToken);

router.get('/', cartController.get);
router.post('/add', cartController.add);
router.put('/update', cartController.update);
router.delete('/clear', cartController.clear);
router.delete('/:productId', cartController.remove);

export default router;
