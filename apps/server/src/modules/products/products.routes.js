import { Router } from 'express';
import { productsController } from './products.controller.js';
import { verifyToken, verifyAdmin } from '../../middleware/verifyToken.js';

const router = Router();

router.get('/', productsController.getAll);
router.get('/search', productsController.search);
router.get('/:id', productsController.getById);
router.post('/', verifyToken, verifyAdmin, productsController.create);
router.put('/:id', verifyToken, verifyAdmin, productsController.update);
router.delete('/:id', verifyToken, verifyAdmin, productsController.delete);

export default router;
