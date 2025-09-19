import { Locale, Product } from '@/types/product';

export function formatPrice(price: number, locale: Locale): string {
  return new Intl.NumberFormat(locale.language, {
    style: 'currency',
    currency: locale.currency,
  }).format(price);
}

export function getProductName(product: Product, locale: Locale): string {
  if (typeof product.name === 'string') {
    return product.name;
  }

  // Handle localized names
  if (typeof product.name === 'object' && product.name !== null) {
    return locale.region === 'UK' ? product.name.uk : product.name.us;
  }

  return 'Unknown Product';
}

export function getProductPrice(product: Product, locale: Locale): number {
  if (typeof product.price === 'number') {
    return product.price;
  }

  // Handle localized prices
  if (typeof product.price === 'object' && product.price !== null) {
    return locale.region === 'UK' ? product.price.gbp : product.price.usd;
  }

  return 0;
}

export function convertCurrency(price: number, fromCurrency: string, toCurrency: string): number {
  // Simple conversion rates - in a real app, these would come from an API
  const rates: Record<string, Record<string, number>> = {
    GBP: { USD: 1.27, EUR: 1.17 },
    USD: { GBP: 0.79, EUR: 0.92 },
    EUR: { GBP: 0.85, USD: 1.09 }
  };

  if (fromCurrency === toCurrency) return price;

  const rate = rates[fromCurrency]?.[toCurrency];
  return rate ? price * rate : price;
}
