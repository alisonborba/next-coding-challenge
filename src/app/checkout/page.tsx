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
      <main className={styles.main}>
        <div className={styles.empty}>
          <h1>Your basket is empty</h1>
          <p>Add some items to your basket to checkout</p>
          <Link href="/">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Checkout</h1>
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
                  <h3>{productName}</h3>
                  <p>{item.product.description || 'High-quality product'}</p>
                </div>
                <span className={styles.quantity}>{item.quantity}</span>
                <div className={styles.itemTotal}>
                  {formatPrice(productPrice * item.quantity, locale)}
                </div>
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
          <Link href="/">Continue Shopping</Link>
          <button
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
