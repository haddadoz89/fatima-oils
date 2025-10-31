import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  REDIS_URL: process.env.REDIS_URL,
};

// Basic validation
if (!ENV.DATABASE_URL && ENV.NODE_ENV !== 'test') {
  console.warn('⚠️  DATABASE_URL is not set. Please configure your database.');
}

if (ENV.JWT_SECRET === 'dev-secret-change-in-production' && ENV.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be set in production!');
}
