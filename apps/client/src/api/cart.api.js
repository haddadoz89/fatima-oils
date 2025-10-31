import { http } from './http.js';

export const cartAPI = {
  get: () => http.get('/cart'),
  
  add: (productId, grams) => http.post('/cart/add', { productId, grams }),
  
  update: (productId, grams) => http.put('/cart/update', { productId, grams }),
  
  remove: (productId) => http.delete(`/cart/${productId}`),
  
  clear: () => http.delete('/cart/clear'),
};
