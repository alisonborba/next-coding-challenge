import { render, screen, waitFor, act } from '@testing-library/react';
import Home from '@/app/page';
import { AppProvider } from '@/contexts/AppContext';

// Mock fetch for API calls
global.fetch = jest.fn();

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
}));

const mockProducts = [
  {
    id: '1',
    name: 'Test Product 1',
    description: 'Test Description 1',
    price: 10.99,
    currency: 'GBP',
  },
  {
    id: '2',
    name: 'Test Product 2',
    description: 'Test Description 2',
    price: 15.99,
    currency: 'GBP',
  },
];

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe('Home', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true,
          products: mockProducts,
        }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the store title', async () => {
    render(<Home />, { wrapper: TestWrapper });

    expect(screen.getByText("Michael's Amazing Web Store")).toBeInTheDocument();
  });

  it('renders locale switcher', async () => {
    render(<Home />, { wrapper: TestWrapper });

    expect(screen.getByText('UK (£)')).toBeInTheDocument();
    expect(screen.getByText('US ($)')).toBeInTheDocument();
  });

  it('renders an empty basket initially', async () => {
    render(<Home />, { wrapper: TestWrapper });

    await waitFor(() => {
      const basketButton = screen.getByRole('button', {
        name: /Basket: 0 items/i,
      });
      expect(basketButton).toBeInTheDocument();
    });
  });

  it('loads and displays products from API', async () => {
    await act(async () => {
      render(<Home />, { wrapper: TestWrapper });
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://v0-api-endpoint-request.vercel.app/api/products'
    );
  });

  it('shows load more button when no additional products are loaded', async () => {
    render(<Home />, { wrapper: TestWrapper });

    await waitFor(() => {
      expect(screen.getByText('Load More Products')).toBeInTheDocument();
    });
  });
});
