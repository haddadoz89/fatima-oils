import { ordersService } from './orders.service.js';
import { success, paginated } from '../../core/http.js';
import { config } from '../../core/config.js';

export const ordersController = {
  async create(req, res, next) {
    try {
      const order = await ordersService.createOrder(req.user.id, req.body);
      res.status(201).json(success({ order }, 'Order created successfully'));
    } catch (error) {
      next(error);
    }
  },

  async getUserOrders(req, res, next) {
    try {
      const page = parseInt(req.query.page) || config.pagination.defaultPage;
      const limit = Math.min(
        parseInt(req.query.limit) || config.pagination.defaultLimit,
        config.pagination.maxLimit
      );

      const result = await ordersService.getUserOrders(req.user.id, {
        page,
        limit,
      });

      res.json(paginated(result.orders, page, limit, result.total));
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const order = await ordersService.getOrderById(req.params.id, req.user.id);
      res.json(success({ order }, 'Order retrieved successfully'));
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const { status } = req.body;
      const order = await ordersService.updateOrderStatus(req.params.id, status);
      res.json(success({ order }, 'Order status updated'));
    } catch (error) {
      next(error);
    }
  },
};
