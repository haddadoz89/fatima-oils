import { productsService } from './products.service.js';
import { success, paginated } from '../../core/http.js';
import { config } from '../../core/config.js';

export const productsController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || config.pagination.defaultPage;
      const limit = Math.min(
        parseInt(req.query.limit) || config.pagination.defaultLimit,
        config.pagination.maxLimit
      );
      const category = req.query.category?.toUpperCase();

      const result = await productsService.getAllProducts({
        page,
        limit,
        category,
      });

      res.json(paginated(result.products, page, limit, result.total));
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const product = await productsService.getProductById(req.params.id);
      res.json(success({ product }, 'Product retrieved successfully'));
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const product = await productsService.createProduct(req.body);
      res.status(201).json(success({ product }, 'Product created successfully'));
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const product = await productsService.updateProduct(req.params.id, req.body);
      res.json(success({ product }, 'Product updated successfully'));
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await productsService.deleteProduct(req.params.id);
      res.json(success(null, 'Product deleted successfully'));
    } catch (error) {
      next(error);
    }
  },

  async search(req, res, next) {
    try {
      const products = await productsService.searchProducts(req.query.q);
      res.json(success({ products }, 'Search results'));
    } catch (error) {
      next(error);
    }
  },
};
