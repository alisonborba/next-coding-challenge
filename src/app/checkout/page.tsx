'use client';
import { useApp } from '@/contexts/AppContext';
import { formatPrice, getProductName, getProductPrice } from '@/utils/currency';
import Link from 'next/link';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { cart, locale, clearCart } = useApp();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const displayPrice = getProductPrice(item.product, locale);
    return sum + displayPrice * item.quantity;
  }, 0);

  const handleCheckout = () => {
    alert(`Order placed! Total: ${formatPrice(totalPrice, locale)}`);
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.empty}>
          <h1 className={styles.emptyTitle}>Your basket is empty</h1>
          <p className={styles.emptyDescription}>
            Add some items to your basket to checkout
          </p>
          <Link href="/" className={styles.backButton}>
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>

        <div className={styles.cartItems}>
          {cart.map((item) => {
            const displayPrice = getProductPrice(item.product, locale);
            const itemTotal = displayPrice * item.quantity;
            const productName = getProductName(item.product, locale);

            return (
              <div key={item.product.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <h3>{productName}</h3>
                  <p>{item.product.description || 'High-quality product'}</p>
                </div>

                <span className={styles.quantity}>{item.quantity}</span>

                <div className={styles.itemTotal}>
                  {formatPrice(itemTotal, locale)}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Total Price:</span>
            <span className={styles.totalPrice}>
              {formatPrice(totalPrice, locale)}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.backButton}>
            Continue Shopping
          </Link>
          <button onClick={handleCheckout} className={styles.checkoutButton}>
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
