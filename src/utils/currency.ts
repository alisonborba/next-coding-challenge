import { Locale } from '@/types/product';

export const formatPrice = (price: number, locale: Locale) =>
  new Intl.NumberFormat(locale.language, {
    style: 'currency',
    currency: locale.currency,
  }).format(price);

export const getProductPrice = (price: any, locale: Locale): number => {
  if (typeof price === 'number') {
    return price;
  }

  if (typeof price === 'object' && price !== null) {
    // Return the price based on the current locale
    if (locale.currency === 'USD') {
      return price.usd || price.gbp || 0;
    } else if (locale.currency === 'GBP') {
      return price.gbp || price.usd || 0;
    }
  }

  return 0;
};

export const getProductName = (name: any, locale: Locale): string => {
  if (typeof name === 'string') {
    return name;
  }

  if (typeof name === 'object' && name !== null) {
    // Return the name based on the current locale
    if (locale.language === 'en-US') {
      return name.us || name.uk || 'Unknown Product';
    } else if (locale.language === 'en-GB') {
      return name.uk || name.us || 'Unknown Product';
    }
  }

  return 'Unknown Product';
};
