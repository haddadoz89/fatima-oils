export const calculateMixPrice = (ingredients) => {
  return ingredients.reduce((total, ingredient) => {
    return total + (ingredient.product.pricePerGram * ingredient.gramsSelected);
  }, 0);
};

export const calculateOrderTotal = (items) => {
  return items.reduce((total, item) => {
    return total + item.price;
  }, 0);
};

export const roundToTwo = (num) => {
  return Math.round(num * 100) / 100;
};
