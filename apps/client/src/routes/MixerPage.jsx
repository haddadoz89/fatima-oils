import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../api/products.api';
import { mixesAPI } from '../api/mixes.api';
import { useMixStore } from '../store/mix.store';
import { useAuthStore } from '../store/auth.store';
import { useUIStore } from '../store/ui.store';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Loading } from '../components/ui/Loading';

export const MixerPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [grams, setGrams] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [mixName, setMixName] = useState('');
  const [mixDescription, setMixDescription] = useState('');

  const ingredients = useMixStore((state) => state.ingredients);
  const addIngredient = useMixStore((state) => state.addIngredient);
  const removeIngredient = useMixStore((state) => state.removeIngredient);
  const clearMix = useMixStore((state) => state.clearMix);
  const getTotalWeight = useMixStore((state) => state.getTotalWeight);
  const getTotalPrice = useMixStore((state) => state.getTotalPrice);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const showNotification = useUIStore((state) => state.showNotification);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 50 });
      setProducts(response.data);
    } catch (error) {
      showNotification('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setGrams('');
  };

  const handleAddIngredient = () => {
    if (!grams || parseFloat(grams) <= 0) {
      showNotification('Please enter a valid amount', 'warning');
      return;
    }

    addIngredient({
      productId: selectedProduct.id,
      product: selectedProduct,
      gramsSelected: parseFloat(grams),
    });

    showNotification('Ingredient added!', 'success');
    setSelectedProduct(null);
    setGrams('');
  };

  const handleSaveMix = async () => {
    if (!isAuthenticated) {
      showNotification('Please sign in to save mixes', 'warning');
      navigate('/signin');
      return;
    }

    if (ingredients.length === 0) {
      showNotification('Please add at least one ingredient', 'warning');
      return;
    }

    setShowSaveModal(true);
  };

  const confirmSaveMix = async () => {
    try {
      await mixesAPI.create({
        name: mixName,
        description: mixDescription,
        ingredients: ingredients.map((ing) => ({
          productId: ing.productId,
          gramsSelected: ing.gramsSelected,
        })),
      });

      showNotification('Mix saved successfully!', 'success');
      clearMix();
      setShowSaveModal(false);
      setMixName('');
      setMixDescription('');
    } catch (error) {
      showNotification('Failed to save mix', 'error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('mixer.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products Selection */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">{t('mixer.selectIngredients')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
                <ProductCard product={product} onAddToCart={() => handleProductClick(product)} />
              </div>
            ))}
          </div>
        </div>

        {/* Mix Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h2 className="text-2xl font-semibold mb-4">{t('mixer.yourMix')}</h2>

            {ingredients.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No ingredients yet</p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {ingredients.map((ing) => (
                    <div
                      key={ing.productId}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{ing.product?.nameEn}</p>
                        <p className="text-sm text-gray-600">{ing.gramsSelected}g</p>
                      </div>
                      <button
                        onClick={() => removeIngredient(ing.productId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{t('mixer.totalWeight')}:</span>
                    <span>{getTotalWeight()}g</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">{t('mixer.estimatedPrice')}:</span>
                    <span className="text-xl font-bold text-primary-600">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="primary" className="w-full" onClick={handleSaveMix}>
                    {t('mixer.saveMix')}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={clearMix}>
                    Clear Mix
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* Add Ingredient Modal */}
      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title={t('mixer.enterGrams')}
      >
        {selectedProduct && (
          <div>
            <p className="mb-4">
              Adding: <strong>{selectedProduct.nameEn}</strong>
            </p>
            <Input
              type="number"
              label="Grams"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              placeholder="Enter grams"
              min="0"
              step="0.1"
            />
            <div className="mt-4 flex gap-2">
              <Button variant="primary" onClick={handleAddIngredient} className="flex-1">
                {t('mixer.addToMix')}
              </Button>
              <Button variant="outline" onClick={() => setSelectedProduct(null)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Save Mix Modal */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title={t('mixer.saveMix')}
      >
        <div className="space-y-4">
          <Input
            label={t('mixer.mixName')}
            value={mixName}
            onChange={(e) => setMixName(e.target.value)}
            placeholder="My Custom Blend"
          />
          <Input
            label={t('mixer.mixDescription')}
            value={mixDescription}
            onChange={(e) => setMixDescription(e.target.value)}
            placeholder="Description..."
          />
          <div className="flex gap-2">
            <Button variant="primary" onClick={confirmSaveMix} className="flex-1">
              Save
            </Button>
            <Button variant="outline" onClick={() => setShowSaveModal(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
