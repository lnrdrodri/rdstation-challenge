const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  const selectedPreferences = new Set(formData.selectedPreferences);
  const selectedFeatures = new Set(formData.selectedFeatures);
  const selectedRecommendationType = formData.selectedRecommendationType || 'SingleProduct';

  const filteredProducts = products.filter(product => 
    product.preferences.some(preference => selectedPreferences.has(preference))
    || product.features.some(feature => selectedFeatures.has(feature))
  );

  if(filteredProducts.length === 0) {
    return [];
  }

  const productsMatch = filteredProducts.map(product => {
    const score = (
      product.preferences.filter(preference => selectedPreferences.has(preference)).length +
      product.features.filter(feature => selectedFeatures.has(feature)).length
    );

    return {
      ...product,
      score
    }
  });

  productsMatch.sort((a, b) => b.score - a.score || b.id - a.id);

  if(selectedRecommendationType === 'SingleProduct') {
    return [productsMatch[0]];
  }

  return productsMatch;
};

export default { getRecommendations };
