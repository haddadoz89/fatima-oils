import { config } from '../core/config.js';
import { logger } from '../core/logger.js';
import { AppError } from '../core/errors.js';

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Log error details
  if (statusCode === 500) {
    logger.error('Server error:', err);
  } else {
    logger.warn(`${statusCode}: ${message}`);
  }

  // Prisma errors
  if (err.code === 'P2002') {
    statusCode = 409;
    message = 'Resource already exists';
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Validation errors (Zod)
  if (err.name === 'ZodError') {
    statusCode = 400;
    message = 'Validation failed';
    const errors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.isDev && { stack: err.stack }),
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
};
