import { NotFoundError, ValidationError, AuthorizationError } from '../../core/errors.js';
import { mixesRepository } from './mixes.repository.js';
import { productsRepository } from '../products/products.repository.js';
import { calculateMixPrice } from '../../utils/pricing.js';

export const mixesService = {
  async createMix(userId, data) {
    // Validate ingredients
    if (!data.ingredients || data.ingredients.length === 0) {
      throw new ValidationError('Mix must have at least one ingredient');
    }

    // Verify all products exist and have sufficient stock
    for (const ingredient of data.ingredients) {
      const product = await productsRepository.findById(ingredient.productId);
      if (!product) {
        throw new NotFoundError(`Product ${ingredient.productId} not found`);
      }
      if (product.stockGrams < ingredient.gramsSelected) {
        throw new ValidationError(
          `Insufficient stock for ${product.nameEn}. Available: ${product.stockGrams}g`
        );
      }
    }

    const mix = await mixesRepository.create(userId, data);
    return mix;
  },

  async getUserMixes(userId, pagination) {
    return mixesRepository.findByUserId(userId, pagination);
  },

  async getMixById(id, userId) {
    const mix = await mixesRepository.findById(id);
    if (!mix) {
      throw new NotFoundError('Mix not found');
    }

    // Check if user has access to view this mix
    if (!mix.isPublic && mix.userId !== userId) {
      throw new AuthorizationError('You do not have access to this mix');
    }

    return mix;
  },

  async getPublicMixes(pagination) {
    return mixesRepository.findPublicMixes(pagination);
  },

  async deleteMix(id, userId) {
    const mix = await mixesRepository.findById(id);
    if (!mix) {
      throw new NotFoundError('Mix not found');
    }

    if (mix.userId !== userId) {
      throw new AuthorizationError('You can only delete your own mixes');
    }

    return mixesRepository.delete(id);
  },

  calculateMixPrice(mix) {
    return calculateMixPrice(mix.ingredients);
  },
};
