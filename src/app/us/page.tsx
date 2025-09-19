'use client';
import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import Link from 'next/link';
import styles from '../page.module.css';

export default function USPage() {
  const {
    setLocale,
    products,
    loadMoreProducts,
    isLoadingMore,
    moreProductsError,
  } = useApp();

  useEffect(() => {
    // Set US locale when this page loads
    setLocale({
      currency: 'USD',
      currencySymbol: '$',
      region: 'US',
      language: 'en-US',
    });
  }, [setLocale]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Michael's Amazing Web Store - US</p>
        <div>
          <LocaleSwitcher />
          <Link href="/checkout">
            <Cart />
          </Link>
        </div>
      </div>

      <div className={styles.grid}>
        {Array.isArray(products) &&
          products.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
      </div>

      <div className={styles.loadMore}>
        <button
          onClick={loadMoreProducts}
          disabled={isLoadingMore}
          className={styles.loadMoreButton}
        >
          {isLoadingMore ? 'Loading...' : 'Load More Products'}
        </button>
        {moreProductsError && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            Error: {moreProductsError}
          </p>
        )}
      </div>
    </main>
  );
}
