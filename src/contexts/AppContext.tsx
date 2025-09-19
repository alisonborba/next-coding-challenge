'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product, CartItem, Locale } from '@/types/product';
import { getDefaultLocale } from '@/constants/locales';

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  products: Product[];
  isLoadingMore: boolean;
  loadMoreProducts: () => Promise<void>;
  moreProductsError: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const loadProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      'https://v0-api-endpoint-request.vercel.app/api/products'
    );
    const data = await response.json();

    // Ensure we return a flat array of products
    if (data.success && Array.isArray(data.products)) {
      return data.products;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      return [];
    }
  } catch {
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

  useEffect(() => {
    loadProducts().then(setProducts);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      return existing
        ? prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { product, quantity: 1 }];
    });
  };

  const loadMoreProducts = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setMoreProductsError(null);

    try {
      const response = await fetch('/api/more-products');
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || 'Failed to fetch more products');
      setProducts((prev) => [
        ...prev,
        ...(data.success ? data.products : data),
      ]);
    } catch (error) {
      setMoreProductsError(
        error instanceof Error ? error.message : 'Failed to load more products'
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        clearCart: () => setCart([]),
        locale,
        setLocale,
        products,
        isLoadingMore,
        loadMoreProducts,
        moreProductsError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
