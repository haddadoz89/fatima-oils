import jwt from 'jsonwebtoken';
import { config } from '../core/config.js';
import { AuthenticationError } from '../core/errors.js';

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided');
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, config.jwt.secret);
    
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AuthenticationError('Invalid token'));
    } else if (error.name === 'TokenExpiredError') {
      next(new AuthenticationError('Token expired'));
    } else {
      next(error);
    }
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return next(new AuthenticationError('Admin access required'));
  }
  next();
};
