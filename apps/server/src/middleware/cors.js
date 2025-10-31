import cors from 'cors';
import { config } from '../core/config.js';

export const corsMiddleware = cors({
  origin: config.cors.origin,
  credentials: config.cors.credentials,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
