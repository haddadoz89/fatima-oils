import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { productsAPI } from '../api/products.api';
import { useCartStore } from '../store/cart.store';
import { useUIStore } from '../store/ui.store';
import { ProductCard } from '../components/common/ProductCard';
import { Loading } from '../components/ui/Loading';
import { Button } from '../components/ui/Button';

export const ProductPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const addItem = useCartStore((state) => state.addItem);
  const showNotification = useUIStore((state) => state.showNotification);

  useEffect(() => {
    loadProducts();
  }, [category, page]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll({ category, page, limit: 12 });
      setProducts(response.data);
      setHasMore(response.pagination?.hasNext || false);
    } catch (error) {
      showNotification('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addItem({
      productId: product.id,
      product,
      grams: 10, // Default 10g
    });
    showNotification('Added to cart!', 'success');
  };

  const categories = [
    { value: '', label: t('products.all') },
    { value: 'OIL', label: t('products.oils') },
    { value: 'HERB', label: t('products.herbs') },
    { value: 'SEED', label: t('products.seeds') },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('common.products')}</h1>

      {/* Category Filter */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={category === cat.value ? 'primary' : 'outline'}
            onClick={() => {
              setCategory(cat.value);
              setPage(1);
            }}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* Pagination */}
          {hasMore && (
            <div className="text-center">
              <Button onClick={() => setPage(page + 1)}>Load More</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
