import { ENV } from '../env.js';

export const config = {
  env: ENV.NODE_ENV,
  port: ENV.PORT,
  isDev: ENV.NODE_ENV === 'development',
  isProd: ENV.NODE_ENV === 'production',
  
  jwt: {
    secret: ENV.JWT_SECRET,
    expiresIn: ENV.JWT_EXPIRES_IN,
  },
  
  cors: {
    origin: ENV.CLIENT_URL,
    credentials: true,
  },
  
  cloudinary: {
    cloudName: ENV.CLOUDINARY_CLOUD_NAME,
    apiKey: ENV.CLOUDINARY_API_KEY,
    apiSecret: ENV.CLOUDINARY_API_SECRET,
  },
  
  stripe: {
    secretKey: ENV.STRIPE_SECRET_KEY,
    publishableKey: ENV.STRIPE_PUBLISHABLE_KEY,
  },
  
  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
  },
};
