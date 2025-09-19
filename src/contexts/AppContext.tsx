'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product, CartItem, Locale } from '@/types/product';
import { LOCALES, getDefaultLocale } from '@/constants/locales';

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  products: Product[];
  isLoadingMore: boolean;
  loadMoreProducts: () => Promise<void>;
  moreProductsError: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Pre-load products for immediate display
const loadProductsSync = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      'https://v0-api-endpoint-request.vercel.app/api/products'
    );
    const data = await response.json();

    if (data.success && Array.isArray(data.products)) {
      return data.products;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      console.error('API returned unexpected data format:', data);
      return [];
    }
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [locale, setLocale] = useState<Locale>(getDefaultLocale());
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [moreProductsError, setMoreProductsError] = useState<string | null>(
    null
  );

  // Load products immediately on component mount
  useEffect(() => {
    loadProductsSync().then(setProducts);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const loadMoreProducts = async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    setMoreProductsError(null);

    try {
      // Use Next.js API proxy to avoid CORS issues
      const response = await fetch('/api/more-products');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch more products');
      }

      // Handle API response format: {success: true, products: [...]}
      let newProducts: Product[] = [];
      if (data.success && Array.isArray(data.products)) {
        newProducts = data.products;
      } else if (Array.isArray(data)) {
        // Fallback for direct array response
        newProducts = data;
      } else {
        console.error(
          'More products API returned unexpected data format:',
          data
        );
        newProducts = [];
      }

      // Append new products to existing products list
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    } catch (error) {
      console.error('Failed to load more products:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load more products';
      setMoreProductsError(errorMessage);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const value = {
    cart,
    addToCart,
    clearCart,
    locale,
    setLocale,
    products,
    isLoadingMore,
    loadMoreProducts,
    moreProductsError,
  };

  // Debug logging
  console.log('AppContext - locale:', locale);
  console.log('AppContext - products:', products);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
