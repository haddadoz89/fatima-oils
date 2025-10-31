import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../store/cart.store';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const CartPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { items, total, removeItem, updateItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-3xl font-bold mb-4">{t('cart.empty')}</h2>
        <Button onClick={() => navigate('/products')}>
          {t('cart.continueShopping')}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('cart.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const name = i18n.language === 'ar' ? item.product?.nameAr : item.product?.nameEn;
            return (
              <Card key={item.productId}>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-50 to-gold-50 rounded-lg flex items-center justify-center">
                    {item.product?.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-3xl">🌿</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-gray-600">
                      ${item.product?.pricePerGram} × {item.grams}g
                    </p>
                    <p className="text-xl font-bold text-primary-600">
                      ${((item.product?.pricePerGram || 0) * item.grams).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      type="number"
                      value={item.grams}
                      onChange={(e) => updateItem(item.productId, parseFloat(e.target.value))}
                      className="w-24 px-3 py-2 border rounded-lg"
                      min="0"
                      step="0.1"
                    />
                    <Button
                      variant="ghost"
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 text-sm"
                    >
                      {t('cart.removeItem')}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-xl font-bold">
                  <span>{t('cart.total')}:</span>
                  <span className="text-primary-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate('/checkout')}
              >
                {t('cart.proceedToCheckout')}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/products')}
              >
                {t('cart.continueShopping')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
