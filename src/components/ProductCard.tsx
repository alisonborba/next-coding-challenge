import { Product } from '@/types/product';
import { useApp } from '@/contexts/AppContext';
import { formatPrice, getProductPrice, getProductName } from '@/utils/currency';
import { useState } from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, locale } = useApp();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 2000);
  };

  // Get localized name and price based on current locale
  const productName = getProductName(product.name, locale);
  const productPrice = getProductPrice(product.price, locale);

  return (
    <div className="card">
      <h2>{productName}</h2>
      <p>{product.description || 'High-quality product'}</p>
      <div style={{ fontWeight: '600', fontSize: '1.1rem', marginTop: 'auto' }}>
        {formatPrice(productPrice, locale)}
      </div>
      <button
        className={`btn-outline ${isAdding ? 'btn-success' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  );
}
