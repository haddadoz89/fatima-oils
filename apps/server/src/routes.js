import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import productsRoutes from './modules/products/products.routes.js';
import mixesRoutes from './modules/mixes/mixes.routes.js';
import cartRoutes from './modules/cart/cart.routes.js';
import ordersRoutes from './modules/orders/orders.routes.js';
import pointsRoutes from './modules/points/points.routes.js';
import uploadsRoutes from './modules/uploads/uploads.routes.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
router.use('/auth', authRoutes);
router.use('/products', productsRoutes);
router.use('/mixes', mixesRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', ordersRoutes);
router.use('/points', pointsRoutes);
router.use('/uploads', uploadsRoutes);

export default router;
