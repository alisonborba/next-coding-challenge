import { useApp } from '@/contexts/AppContext';
import { formatPrice, getProductPrice } from '@/utils/currency';

export default function Cart() {
  const { cart, locale } = useApp();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const displayPrice = getProductPrice(item.product, locale);
    return sum + displayPrice * item.quantity;
  }, 0);

  return (
    <div className="btn-basket">
      Basket: {totalItems}
      {totalPrice > 0 && <span>&nbsp;({formatPrice(totalPrice, locale)})</span>}
    </div>
  );
}
