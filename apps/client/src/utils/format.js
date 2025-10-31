// Utility functions for formatting data

export const formatPrice = (price, currency = '$') => {
  return `${currency}${price.toFixed(2)}`;
};

export const formatWeight = (grams) => {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2)}kg`;
  }
  return `${grams}g`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
