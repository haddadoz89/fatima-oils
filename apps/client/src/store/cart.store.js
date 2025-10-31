import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i) => i.productId === item.productId);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.productId === item.productId
            ? { ...i, grams: i.grams + item.grams }
            : i
        ),
      });
    } else {
      set({ items: [...items, item] });
    }

    get().calculateTotal();
  },

  updateItem: (productId, grams) => {
    set({
      items: get().items.map((item) =>
        item.productId === productId ? { ...item, grams } : item
      ),
    });
    get().calculateTotal();
  },

  removeItem: (productId) => {
    set({
      items: get().items.filter((item) => item.productId !== productId),
    });
    get().calculateTotal();
  },

  clearCart: () => {
    set({ items: [], total: 0 });
  },

  calculateTotal: () => {
    const total = get().items.reduce((sum, item) => {
      return sum + (item.product?.pricePerGram || 0) * item.grams;
    }, 0);
    set({ total });
  },

  setCart: (items, total) => {
    set({ items, total });
  },
}));
