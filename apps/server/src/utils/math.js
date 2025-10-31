// Jaccard similarity for mix comparison
export const jaccardSimilarity = (setA, setB) => {
  const intersection = setA.filter(x => setB.includes(x));
  const union = [...new Set([...setA, ...setB])];
  return union.length === 0 ? 0 : intersection.length / union.length;
};

// Calculate similarity between two mixes based on ingredients
export const calculateMixSimilarity = (mix1Ingredients, mix2Ingredients) => {
  const ingredients1 = mix1Ingredients.map(i => i.productId);
  const ingredients2 = mix2Ingredients.map(i => i.productId);
  return jaccardSimilarity(ingredients1, ingredients2);
};

// Find similar mixes
export const findSimilarMixes = (targetMix, allMixes, threshold = 0.5) => {
  return allMixes
    .map(mix => ({
      mix,
      similarity: calculateMixSimilarity(targetMix.ingredients, mix.ingredients),
    }))
    .filter(item => item.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity);
};
