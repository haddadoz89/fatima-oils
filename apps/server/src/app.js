import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { securityMiddleware, rateLimiter } from './middleware/security.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import routes from './routes.js';
import { logger } from './core/logger.js';

const app = express();

// Global middleware
app.use(securityMiddleware);
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Request logging in development
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api', routes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
