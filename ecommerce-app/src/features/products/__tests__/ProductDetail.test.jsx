import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import ProductDetail from '../ProductDetail';

// Mock the API
const mockProductsAPI = {
  getById: vi.fn()
};

vi.mock('../../../api/api', () => ({
  productsAPI: mockProductsAPI
}));

// Mock the cart store
vi.mock('../../cart/cartStore', () => ({
  useCartStore: () => ({
    addItem: vi.fn(),
    isInCart: vi.fn(() => false),
    getItemQuantity: vi.fn(() => 0)
  })
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => mockNavigate
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

const renderWithProviders = (component) => {
  const queryClient = createTestQueryClient();
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('ProductDetail', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    description: 'A great test product',
    price: 199.99,
    category: 'Electronics',
    image: 'test-image.jpg',
    stock: 10,
    rating: 4.5,
    reviews: 25,
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockProductsAPI.getById.mockResolvedValue({
      data: { product: mockProduct }
    });
  });

  it('renders loading state initially', () => {
    renderWithProviders(<ProductDetail />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders product details after loading', async () => {
    renderWithProviders(<ProductDetail />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('A great test product')).toBeInTheDocument();
      expect(screen.getByText('$199.99')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('(25 reviews)')).toBeInTheDocument();
    });
  });

  it('renders product image', async () => {
    renderWithProviders(<ProductDetail />);
    
    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'test-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test Product');
    });
  });

  it('renders product features', async () => {
    renderWithProviders(<ProductDetail />);
    
    await waitFor(() => {
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
      expect(screen.getByText('Feature 3')).toBeInTheDocument();
    });
  });

  it('renders back button', async () => {
    renderWithProviders(<ProductDetail />);
    
    await waitFor(() => {
      const backButton = screen.getByText('Back to Products');
      expect(backButton).toBeInTheDocument();
    });
  });

  it('navigates back when back button is clicked', async () => {
    renderWithProviders(<ProductDetail />);
    
    await waitFor(() => {
      const backButton = screen.getByText('Back to Products');
      fireEvent.click(backButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('renders add to cart button', async () => {
    renderWithProviders(<ProductDetail />);
    
    await waitFor(() => {
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });
  });

  it('calls addItem when add to cart is clicked', async () => {
    const mockAddItem = vi.fn();
    vi.mocked(require('../../cart/cartStore').useCartStore).mockReturnValue({
      addItem: mockAddItem,
      isInCart: vi.fn(() => false),
      getItemQuantity: vi.fn(() => 0)
    });

    renderWithProviders(<ProductDetail />);
    
    await waitFor(() => {
      const addButton = screen.getByText('Add to Cart');
      fireEvent.click(addButton);
    });

    expect(mockAddItem).toHaveBeenCalledWith(mockProduct, 1);
  });

  it('shows out of stock message when stock is 0', async () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    mockProductsAPI.getById.mockResolvedValue({
      data: { product: outOfStockProduct }
    });

    renderWithProviders(<ProductDetail />);
    
    await waitFor(() => {
      expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    });
  });

  it('shows low stock warning when stock is low', async () => {
    const lowStockProduct = { ...mockProduct, stock: 2 };
    mockProductsAPI.getById.mockResolvedValue({
      data: { product: lowStockProduct }
    });

    renderWithProviders(<ProductDetail />);
    
    await waitFor(() => {
      expect(screen.getByText('Only 2 left in stock')).toBeInTheDocument();
    });
  });

  it('renders error state when product not found', async () => {
    mockProductsAPI.getById.mockRejectedValue(new Error('Product not found'));
    
    renderWithProviders(<ProductDetail />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading product/i)).toBeInTheDocument();
    });
  });
});
