import { create } from 'zustand';

// Simple persistence helper
const persistMiddleware = (config) => (set, get, api) => {
  const storageKey = config.name;
  
  // Load initial state from localStorage
  const storedValue = localStorage.getItem(storageKey);
  let initialState = {};
  if (storedValue) {
    try {
      initialState = JSON.parse(storedValue).state;
    } catch (e) {
      console.error('Failed to parse stored state');
    }
  }

  const newSet = (partial) => {
    set(partial);
    const state = get();
    localStorage.setItem(storageKey, JSON.stringify({ state }));
  };

  return config.initializer(newSet, get, api, initialState);
};

export const useAuthStore = create((set, get, api) => {
  const config = {
    name: 'auth-storage',
    initializer: (set, get, api, initialState = {}) => ({
      user: initialState.user || null,
      token: initialState.token || null,
      isAuthenticated: initialState.isAuthenticated || false,

      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
  };

  return persistMiddleware(config)(set, get, api);
});
