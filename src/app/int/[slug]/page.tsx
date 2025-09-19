'use client';
import { useApp } from '@/contexts/AppContext';
import ProductCard from '@/components/ProductCard';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import Cart from '@/components/Cart';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { useEffect } from 'react';
import { getLocaleBySlug, isValidLocale } from '@/constants/locales';
import styles from '../page.module.css';

export default function InternationalPage() {
  const params = useParams();
  const slug = params.slug as string;
  const {
    setLocale,
    products,
    loadMoreProducts,
    isLoadingMore,
    moreProductsError,
  } = useApp();

  if (!isValidLocale(slug)) notFound();

  const locale = getLocaleBySlug(slug);
  useEffect(() => {
    if (locale) setLocale(locale);
  }, [locale, setLocale]);

  if (!locale) return <div>Loading...</div>;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Michael&apos;s Amazing Web Store</p>
        <div style={{ display: 'flex' }}>
          <Link href="/checkout" style={{ textDecoration: 'none' }}>
            <Cart />
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
      <div className={styles.grid}>
        {products.map((product, index) => (
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
