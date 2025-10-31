import { mixesService } from './mixes.service.js';
import { success, paginated } from '../../core/http.js';
import { config } from '../../core/config.js';

export const mixesController = {
  async create(req, res, next) {
    try {
      const mix = await mixesService.createMix(req.user.id, req.body);
      const price = mixesService.calculateMixPrice(mix);
      
      res.status(201).json(
        success({ mix, price }, 'Mix created successfully')
      );
    } catch (error) {
      next(error);
    }
  },

  async getUserMixes(req, res, next) {
    try {
      const page = parseInt(req.query.page) || config.pagination.defaultPage;
      const limit = Math.min(
        parseInt(req.query.limit) || config.pagination.defaultLimit,
        config.pagination.maxLimit
      );

      const result = await mixesService.getUserMixes(req.user.id, {
        page,
        limit,
      });

      res.json(paginated(result.mixes, page, limit, result.total));
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const mix = await mixesService.getMixById(req.params.id, req.user?.id);
      const price = mixesService.calculateMixPrice(mix);
      
      res.json(success({ mix, price }, 'Mix retrieved successfully'));
    } catch (error) {
      next(error);
    }
  },

  async getPublicMixes(req, res, next) {
    try {
      const page = parseInt(req.query.page) || config.pagination.defaultPage;
      const limit = Math.min(
        parseInt(req.query.limit) || config.pagination.defaultLimit,
        config.pagination.maxLimit
      );

      const result = await mixesService.getPublicMixes({ page, limit });
      res.json(paginated(result.mixes, page, limit, result.total));
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await mixesService.deleteMix(req.params.id, req.user.id);
      res.json(success(null, 'Mix deleted successfully'));
    } catch (error) {
      next(error);
    }
  },
};
