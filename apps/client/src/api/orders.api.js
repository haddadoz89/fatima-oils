import { http } from './http.js';

export const ordersAPI = {
  create: (data) => http.post('/orders/checkout', data),
  
  getMyOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return http.get(`/orders/my-orders?${query}`);
  },
  
  getById: (id) => http.get(`/orders/${id}`),
};
