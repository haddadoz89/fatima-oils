import { Router } from 'express';
import { ordersController } from './orders.controller.js';
import { verifyToken, verifyAdmin } from '../../middleware/verifyToken.js';

const router = Router();

router.use(verifyToken);

router.post('/checkout', ordersController.create);
router.get('/my-orders', ordersController.getUserOrders);
router.get('/:id', ordersController.getById);
router.patch('/:id/status', verifyAdmin, ordersController.updateStatus);

export default router;
