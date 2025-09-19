'use client';
import { useApp } from '@/contexts/AppContext';
import { formatPrice } from '@/utils/currency';
import Link from 'next/link';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { cart, locale, clearCart } = useApp();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const price =
      typeof item.product.price === 'number'
        ? item.product.price
        : (item.product.price as any)?.usd ||
          (item.product.price as any)?.gbp ||
          0;
    return sum + price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <main className="main">
        <div className={styles.empty}>
          <h1>Your basket is empty</h1>
          <p>Add some items to your basket to checkout</p>
          <Link href="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles.cartItems}>
          {cart.map((item) => {
            const productName =
              typeof item.product.name === 'string'
                ? item.product.name
                : (item.product.name as any)?.us ||
                  (item.product.name as any)?.uk ||
                  'Unknown Product';
            const productPrice =
              typeof item.product.price === 'number'
                ? item.product.price
                : (item.product.price as any)?.usd ||
                  (item.product.price as any)?.gbp ||
                  0;

            return (
              <div key={item.product.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.quantity}>
                    {item.quantity} - {productName}
                  </span>
                </div>
                <div>{formatPrice(productPrice * item.quantity, locale)}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Total Items: {totalItems}</span>
            <span>Total Price: {formatPrice(totalPrice, locale)}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <Link
            href={locale.language === 'en-gb' ? '/' : `/int/en-us`}
            className="btn-secondary"
          >
            Continue Shopping
          </Link>
          <button
            className="btn-success"
            onClick={() => {
              alert(`Order placed! Total: ${formatPrice(totalPrice, locale)}`);
              clearCart();
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
