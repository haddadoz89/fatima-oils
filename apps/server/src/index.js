import app from './app.js';
import { config } from './core/config.js';
import { logger } from './core/logger.js';
import { prisma } from './core/db.js';

const PORT = config.port;

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect();
    logger.success('✓ Database connected successfully');
  } catch (error) {
    logger.error('✗ Database connection failed:', error.message);
    if (config.isDev) {
      logger.warn('Starting server without database connection (development mode)');
    } else {
      process.exit(1);
    }
  }
}

// Start server
async function start() {
  await testConnection();

  app.listen(PORT, () => {
    logger.success(`
╔═══════════════════════════════════════════════╗
║         🌿 Fatima Oils API Server 🌿         ║
╠═══════════════════════════════════════════════╣
║  Port: ${PORT}                                    ║
║  Env:  ${config.env}                        ║
║  URL:  http://localhost:${PORT}                  ║
╚═══════════════════════════════════════════════╝
    `);
  });
}

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

start().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
