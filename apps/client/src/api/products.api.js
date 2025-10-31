import { http } from './http.js';

export const productsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return http.get(`/products?${query}`);
  },
  
  getById: (id) => http.get(`/products/${id}`),
  
  search: (query) => http.get(`/products/search?q=${query}`),
  
  create: (data) => http.post('/products', data),
  
  update: (id, data) => http.put(`/products/${id}`, data),
  
  delete: (id) => http.delete(`/products/${id}`),
};
