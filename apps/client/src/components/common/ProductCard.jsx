import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const ProductCard = ({ product, onAddToCart }) => {
  const { i18n } = useTranslation();
  const name = i18n.language === 'ar' ? product.nameAr : product.nameEn;
  const description = i18n.language === 'ar' ? product.descriptionAr : product.descriptionEn;

  return (
    <Card className="flex flex-col h-full">
      <div className="aspect-square bg-gradient-to-br from-primary-50 to-gold-50 rounded-lg mb-4 flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-6xl">🌿</div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      
      {description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
      )}

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600">
            ${product.pricePerGram}
          </span>
          <span className="text-sm text-gray-500">/g</span>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          Stock: {product.stockGrams}g
        </div>

        <Button
          variant="primary"
          className="w-full"
          onClick={() => onAddToCart(product)}
          disabled={product.stockGrams === 0}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};
