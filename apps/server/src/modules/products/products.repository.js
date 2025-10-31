import { prisma } from '../../core/db.js';

export const productsRepository = {
  async findAll({ page = 1, limit = 20, category }) {
    const skip = (page - 1) * limit;
    const where = category ? { category } : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return { products, total };
  },

  async findById(id) {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  async create(data) {
    return prisma.product.create({
      data,
    });
  },

  async update(id, data) {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  async delete(id) {
    return prisma.product.delete({
      where: { id },
    });
  },

  async updateStock(id, grams) {
    return prisma.product.update({
      where: { id },
      data: {
        stockGrams: {
          decrement: grams,
        },
      },
    });
  },

  async search(query) {
    return prisma.product.findMany({
      where: {
        OR: [
          { nameEn: { contains: query, mode: 'insensitive' } },
          { nameAr: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 10,
    });
  },
};
