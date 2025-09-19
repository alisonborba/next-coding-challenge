export interface Product {
  id: string | number;
  name: string | { us: string; uk: string };
  description?: string;
  price: number | { usd: number; gbp: number };
  currency?: string;
  image?: string;
  category?: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Locale {
  currency: string;
  currencySymbol: string;
  region: string;
  language: string;
}
