import { prisma } from '../../core/db.js';
import { success } from '../../core/http.js';

export const pointsController = {
  async getPoints(req, res, next) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { points: true },
      });

      const logs = await prisma.pointsLog.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
        take: 20,
      });

      res.json(success({ points: user.points, logs }, 'Points retrieved'));
    } catch (error) {
      next(error);
    }
  },

  async addPoints(userId, points, reason) {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          points: {
            increment: points,
          },
        },
      }),
      prisma.pointsLog.create({
        data: {
          userId,
          pointsChange: points,
          reason,
        },
      }),
    ]);
  },
};
