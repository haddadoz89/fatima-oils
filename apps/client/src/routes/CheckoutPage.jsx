import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../store/cart.store';
import { useAuthStore } from '../store/auth.store';
import { useUIStore } from '../store/ui.store';
import { ordersAPI } from '../api/orders.api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const showNotification = useUIStore((state) => state.showNotification);

  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Please Sign In</h2>
        <Button onClick={() => navigate('/signin')}>Sign In</Button>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      showNotification('Please enter shipping address', 'warning');
      return;
    }

    try {
      setLoading(true);
      await ordersAPI.create({
        address,
        notes,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.grams,
          price: (item.product?.pricePerGram || 0) * item.grams,
        })),
      });

      showNotification('Order placed successfully!', 'success');
      clearCart();
      navigate('/');
    } catch (error) {
      showNotification('Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('checkout.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-2xl font-semibold mb-4">{t('checkout.shippingAddress')}</h2>
            <Input
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your shipping address"
            />
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold mb-4">{t('checkout.notes')}</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows="4"
            />
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h2 className="text-2xl font-semibold mb-4">{t('checkout.orderSummary')}</h2>

            <div className="space-y-2 mb-6">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>{item.product?.nameEn} ({item.grams}g)</span>
                  <span>${((item.product?.pricePerGram || 0) * item.grams).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>{t('cart.total')}:</span>
                <span className="text-primary-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? 'Processing...' : t('checkout.placeOrder')}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
