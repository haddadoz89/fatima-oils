import { prisma } from '../../core/db.js';

export const mixesRepository = {
  async create(userId, data) {
    return prisma.mix.create({
      data: {
        userId,
        name: data.name,
        description: data.description,
        isPublic: data.isPublic || false,
        ingredients: {
          create: data.ingredients.map(ing => ({
            productId: ing.productId,
            gramsSelected: ing.gramsSelected,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  async findByUserId(userId, { page = 1, limit = 20 }) {
    const skip = (page - 1) * limit;

    const [mixes, total] = await Promise.all([
      prisma.mix.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          ingredients: {
            include: {
              product: true,
            },
          },
        },
      }),
      prisma.mix.count({ where: { userId } }),
    ]);

    return { mixes, total };
  },

  async findById(id) {
    return prisma.mix.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  },

  async findPublicMixes({ page = 1, limit = 20 }) {
    const skip = (page - 1) * limit;

    const [mixes, total] = await Promise.all([
      prisma.mix.findMany({
        where: { isPublic: true },
        skip,
        take: limit,
        orderBy: { timesOrdered: 'desc' },
        include: {
          ingredients: {
            include: {
              product: true,
            },
          },
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }),
      prisma.mix.count({ where: { isPublic: true } }),
    ]);

    return { mixes, total };
  },

  async incrementTimesOrdered(id) {
    return prisma.mix.update({
      where: { id },
      data: {
        timesOrdered: {
          increment: 1,
        },
      },
    });
  },

  async delete(id) {
    return prisma.mix.delete({
      where: { id },
    });
  },
};
