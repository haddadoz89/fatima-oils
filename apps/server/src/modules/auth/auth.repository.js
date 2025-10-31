import { prisma } from '../../core/db.js';

export const authRepository = {
  async findUserByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async findUserByUsername(username) {
    return prisma.user.findUnique({
      where: { username },
    });
  },

  async createUser(data) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        points: true,
        createdAt: true,
      },
    });
  },

  async findUserById(id) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        points: true,
        createdAt: true,
      },
    });
  },
};
