import { PrismaClient } from '@prisma/client';
import { logger } from './logger.js';

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  logger.info('Database connection closed');
});

export { prisma };
