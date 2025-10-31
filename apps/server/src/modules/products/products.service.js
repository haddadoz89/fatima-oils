import { NotFoundError, ValidationError } from '../../core/errors.js';
import { productsRepository } from './products.repository.js';

export const productsService = {
  async getAllProducts({ page, limit, category }) {
    const { products, total } = await productsRepository.findAll({
      page,
      limit,
      category,
    });

    return { products, total, page, limit };
  },

  async getProductById(id) {
    const product = await productsRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  },

  async createProduct(data) {
    return productsRepository.create(data);
  },

  async updateProduct(id, data) {
    const product = await this.getProductById(id);
    return productsRepository.update(id, data);
  },

  async deleteProduct(id) {
    const product = await this.getProductById(id);
    return productsRepository.delete(id);
  },

  async searchProducts(query) {
    if (!query || query.trim().length < 2) {
      throw new ValidationError('Search query must be at least 2 characters');
    }
    return productsRepository.search(query);
  },
};
