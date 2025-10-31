import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateSignUp = (data) => signUpSchema.parse(data);
export const validateSignIn = (data) => signInSchema.parse(data);
