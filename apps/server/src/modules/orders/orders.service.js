import { prisma } from '../../core/db.js';
import { NotFoundError, ValidationError, AuthorizationError } from '../../core/errors.js';
import { cartService } from '../cart/cart.service.js';
import { productsRepository } from '../products/products.repository.js';

export const ordersService = {
  async createOrder(userId, data) {
    const { address, notes, items } = data;

    if (!items || items.length === 0) {
      throw new ValidationError('Order must have at least one item');
    }

    // Verify stock and calculate total
    let totalPrice = 0;
    for (const item of items) {
      const product = await productsRepository.findById(item.productId);
      if (!product) {
        throw new NotFoundError(`Product ${item.productId} not found`);
      }
      if (product.stockGrams < item.quantity) {
        throw new ValidationError(
          `Insufficient stock for ${product.nameEn}. Available: ${product.stockGrams}g`
        );
      }
      totalPrice += product.pricePerGram * item.quantity;
    }

    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalPrice,
          address,
          notes,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price || 0,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Deduct stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockGrams: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    // Clear cart after successful order
    await cartService.clearCart(userId);

    return order;
  },

  async getUserOrders(userId, { page = 1, limit = 20 }) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return { orders, total };
  },

  async getOrderById(id, userId) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if (order.userId !== userId) {
      throw new AuthorizationError('You do not have access to this order');
    }

    return order;
  },

  async updateOrderStatus(id, status) {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
  },
};
