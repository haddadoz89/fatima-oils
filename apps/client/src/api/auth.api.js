import { http } from './http.js';

export const authAPI = {
  signUp: (data) => http.post('/auth/sign-up', data),
  
  signIn: (data) => http.post('/auth/sign-in', data),
  
  getProfile: () => http.get('/auth/profile'),
};
