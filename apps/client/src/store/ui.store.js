import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isLoading: false,
  notification: null,
  modalOpen: false,
  modalContent: null,

  setLoading: (isLoading) => set({ isLoading }),

  showNotification: (message, type = 'info') => {
    set({ notification: { message, type } });
    setTimeout(() => {
      set({ notification: null });
    }, 3000);
  },

  openModal: (content) => {
    set({ modalOpen: true, modalContent: content });
  },

  closeModal: () => {
    set({ modalOpen: false, modalContent: null });
  },
}));
