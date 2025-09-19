export interface Product {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  currency?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Locale {
  currency: string;
  currencySymbol: string;
  language: string;
  country: string;
  countryCode: string;
  icon: string;
}
