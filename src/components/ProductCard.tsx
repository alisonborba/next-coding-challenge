import { Product } from '@/types/product';
import { useApp } from '@/contexts/AppContext';
import { formatPrice, getProductName, getProductPrice } from '@/utils/currency';
import { useState } from 'react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, locale } = useApp();
  const [isAdding, setIsAdding] = useState(false);

  const productName = getProductName(product, locale);
  const productPrice = getProductPrice(product, locale);
  const formattedPrice = formatPrice(
    productPrice,
    locale || {
      currency: 'GBP',
      currencySymbol: '£',
      region: 'UK',
      language: 'en-GB',
    }
  );

  const handleAddToCart = async () => {
    if (isAdding) return;

    setIsAdding(true);
    addToCart(product);

    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className={styles.card}>
      <h2>{productName}</h2>
      <p>{product.description || 'High-quality product'}</p>
      <div className={styles.price}>{formattedPrice}</div>
      <button
        className={`${styles.addButton} ${isAdding ? styles.added : ''}`}
        onClick={handleAddToCart}
        disabled={isAdding}
        aria-label={`Add ${productName} to basket`}
      >
        {isAdding ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  );
}
