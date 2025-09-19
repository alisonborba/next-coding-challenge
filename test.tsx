import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InternationalPage from './src/app/int/[slug]/page';
import { AppProvider } from './src/contexts/AppContext';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useParams: () => ({ slug: 'en-gb' }),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/int/en-gb',
  notFound: jest.fn(),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe('International Page', () => {
  it('renders the store title', async () => {
    render(<InternationalPage />, { wrapper: TestWrapper });

    await waitFor(() => {
      expect(
        screen.getByText("Michael's Amazing Web Store")
      ).toBeInTheDocument();
    });
  });

  it('renders locale switcher', async () => {
    render(<InternationalPage />, { wrapper: TestWrapper });

    await waitFor(() => {
      expect(screen.getByTitle('United Kingdom')).toBeInTheDocument();
      expect(screen.getByTitle('United States')).toBeInTheDocument();
    });
  });

  it('renders an empty basket initially', async () => {
    render(<InternationalPage />, { wrapper: TestWrapper });

    await waitFor(() => {
      const basketButton = screen.getByText(/Basket: 0/);
      expect(basketButton).toBeInTheDocument();
    });
  });

  it('loads and displays products from API', async () => {
    // Mock fetch for products
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true,
          products: [
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
          ],
        }),
    });

    render(<InternationalPage />, { wrapper: TestWrapper });

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  it('shows load more button when no additional products are loaded', async () => {
    render(<InternationalPage />, { wrapper: TestWrapper });

    await waitFor(() => {
      expect(screen.getByText('Load More Products')).toBeInTheDocument();
    });
  });
});
