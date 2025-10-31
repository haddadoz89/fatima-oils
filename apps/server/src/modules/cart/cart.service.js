import { prisma } from '../../core/db.js';
import { NotFoundError, ValidationError } from '../../core/errors.js';
import { productsRepository } from '../products/products.repository.js';

export const cartService = {
  async addToCart(userId, productId, grams) {
    const product = await productsRepository.findById(productId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (grams <= 0) {
      throw new ValidationError('Grams must be greater than 0');
    }

    if (product.stockGrams < grams) {
      throw new ValidationError(
        `Insufficient stock. Available: ${product.stockGrams}g`
      );
    }

    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: { userId, productId },
      },
      create: {
        userId,
        productId,
        grams,
      },
      update: {
        grams: {
          increment: grams,
        },
      },
      include: {
        product: true,
      },
    });

    return cartItem;
  },

  async getCart(userId) {
    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    const total = items.reduce((sum, item) => {
      return sum + item.product.pricePerGram * item.grams;
    }, 0);

    return { items, total };
  },

  async updateCartItem(userId, productId, grams) {
    if (grams <= 0) {
      return this.removeFromCart(userId, productId);
    }

    const product = await productsRepository.findById(productId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (product.stockGrams < grams) {
      throw new ValidationError(
        `Insufficient stock. Available: ${product.stockGrams}g`
      );
    }

    const cartItem = await prisma.cartItem.update({
      where: {
        userId_productId: { userId, productId },
      },
      data: { grams },
      include: {
        product: true,
      },
    });

    return cartItem;
  },

  async removeFromCart(userId, productId) {
    await prisma.cartItem.delete({
      where: {
        userId_productId: { userId, productId },
      },
    });
  },

  async clearCart(userId) {
    await prisma.cartItem.deleteMany({
      where: { userId },
    });
  },
};
