import { http } from './http.js';

export const mixesAPI = {
  create: (data) => http.post('/mixes', data),
  
  getMyMixes: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return http.get(`/mixes/my-mixes?${query}`);
  },
  
  getPublicMixes: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return http.get(`/mixes/public?${query}`);
  },
  
  getById: (id) => http.get(`/mixes/${id}`),
  
  delete: (id) => http.delete(`/mixes/${id}`),
};
