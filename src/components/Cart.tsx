import { useApp } from '@/contexts/AppContext';
import { formatPrice } from '@/utils/currency';

export default function Cart() {
  const { cart, locale } = useApp();
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

  return (
    <div className="btn-basket">
      Basket: {totalItems}
      {totalPrice > 0 && <span>&nbsp;({formatPrice(totalPrice, locale)})</span>}
    </div>
  );
}
