import { Locale } from '@/types/product';

export const formatPrice = (price: number, locale: Locale) =>
  new Intl.NumberFormat(locale.language, {
    style: 'currency',
    currency: locale.currency,
  }).format(price);
