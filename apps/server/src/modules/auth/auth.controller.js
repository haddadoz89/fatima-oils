import { authService } from './auth.service.js';
import { validateSignUp, validateSignIn } from './auth.validators.js';
import { success } from '../../core/http.js';

export const authController = {
  async signUp(req, res, next) {
    try {
      const data = validateSignUp(req.body);
      const result = await authService.signUp(data);
      res.status(201).json(success(result, 'User registered successfully'));
    } catch (error) {
      next(error);
    }
  },

  async signIn(req, res, next) {
    try {
      const data = validateSignIn(req.body);
      const result = await authService.signIn(data);
      res.json(success(result, 'Signed in successfully'));
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      res.json(success({ user }, 'Profile retrieved successfully'));
    } catch (error) {
      next(error);
    }
  },
};
