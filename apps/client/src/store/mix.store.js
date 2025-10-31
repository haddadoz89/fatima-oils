import { create } from 'zustand';

export const useMixStore = create((set, get) => ({
  ingredients: [],
  mixName: '',
  mixDescription: '',
  isPublic: false,

  addIngredient: (ingredient) => {
    const ingredients = get().ingredients;
    const existing = ingredients.find((i) => i.productId === ingredient.productId);

    if (existing) {
      set({
        ingredients: ingredients.map((i) =>
          i.productId === ingredient.productId
            ? { ...i, gramsSelected: i.gramsSelected + ingredient.gramsSelected }
            : i
        ),
      });
    } else {
      set({ ingredients: [...ingredients, ingredient] });
    }
  },

  updateIngredient: (productId, grams) => {
    set({
      ingredients: get().ingredients.map((ing) =>
        ing.productId === productId ? { ...ing, gramsSelected: grams } : ing
      ),
    });
  },

  removeIngredient: (productId) => {
    set({
      ingredients: get().ingredients.filter((ing) => ing.productId !== productId),
    });
  },

  clearMix: () => {
    set({
      ingredients: [],
      mixName: '',
      mixDescription: '',
      isPublic: false,
    });
  },

  setMixInfo: (name, description, isPublic) => {
    set({
      mixName: name,
      mixDescription: description,
      isPublic,
    });
  },

  getTotalWeight: () => {
    return get().ingredients.reduce((sum, ing) => sum + ing.gramsSelected, 0);
  },

  getTotalPrice: () => {
    return get().ingredients.reduce((sum, ing) => {
      return sum + (ing.product?.pricePerGram || 0) * ing.gramsSelected;
    }, 0);
  },
}));
