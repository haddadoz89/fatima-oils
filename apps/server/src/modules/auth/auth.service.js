import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../core/config.js';
import { AuthenticationError, ConflictError, ValidationError } from '../../core/errors.js';
import { authRepository } from './auth.repository.js';

export const authService = {
  async signUp({ username, email, password }) {
    // Check if user exists
    const existingEmail = await authRepository.findUserByEmail(email);
    if (existingEmail) {
      throw new ConflictError('Email already registered');
    }

    const existingUsername = await authRepository.findUserByUsername(username);
    if (existingUsername) {
      throw new ConflictError('Username already taken');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await authRepository.createUser({
      username,
      email,
      passwordHash,
    });

    // Generate token
    const token = this.generateToken(user);

    return { user, token };
  },

  async signIn({ email, password }) {
    // Find user
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user);

    // Remove password from response
    const { passwordHash, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  },

  async getProfile(userId) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new AuthenticationError('User not found');
    }
    return user;
  },

  generateToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
  },
};
