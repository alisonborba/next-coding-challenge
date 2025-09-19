import { Product } from '@/types/product';
import { useApp } from '@/contexts/AppContext';
import { formatPrice } from '@/utils/currency';
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

  // Safely extract name and price, handling both string and object formats
  const productName =
    typeof product.name === 'string'
      ? product.name
      : (product.name as any)?.us ||
        (product.name as any)?.uk ||
        'Unknown Product';

  const productPrice =
    typeof product.price === 'number'
      ? product.price
      : (product.price as any)?.usd || (product.price as any)?.gbp || 0;

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
