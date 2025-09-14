import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductList from '../ProductList';

// Mock the API
const mockProductsAPI = {
  getAll: vi.fn(),
  getCategories: vi.fn()
};

vi.mock('../../../api/api', () => ({
  productsAPI: mockProductsAPI
}));

// Mock ProductCard component
vi.mock('../ProductCard', () => ({
  default: ({ product }) => (
    <div data-testid={`product-card-${product.id}`}>
      {product.name}
    </div>
  )
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

const renderWithQueryClient = (component) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('ProductList', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Product 1',
      price: 99.99,
      category: 'Electronics',
      image: 'image1.jpg'
    },
    {
      id: '2',
      name: 'Product 2',
      price: 149.99,
      category: 'Clothing',
      image: 'image2.jpg'
    }
  ];

  const mockCategories = ['Electronics', 'Clothing', 'Books'];

  beforeEach(() => {
    vi.clearAllMocks();
    mockProductsAPI.getAll.mockResolvedValue({
      data: { products: mockProducts }
    });
    mockProductsAPI.getCategories.mockResolvedValue({
      data: { categories: mockCategories }
    });
  });

  it('renders loading state initially', () => {
    renderWithQueryClient(<ProductList />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    renderWithQueryClient(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    });
  });

  it('renders search input', async () => {
    renderWithQueryClient(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
    });
  });

  it('filters products by search term', async () => {
    renderWithQueryClient(<ProductList />);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/search products/i);
      fireEvent.change(searchInput, { target: { value: 'Product 1' } });
    });

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card-2')).not.toBeInTheDocument();
  });

  it('renders category filter', async () => {
    renderWithQueryClient(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Clothing')).toBeInTheDocument();
    });
  });

  it('filters products by category', async () => {
    renderWithQueryClient(<ProductList />);
    
    await waitFor(() => {
      const electronicsCategory = screen.getByText('Electronics');
      fireEvent.click(electronicsCategory);
    });

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card-2')).not.toBeInTheDocument();
  });

  it('renders sort options', async () => {
    renderWithQueryClient(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('name')).toBeInTheDocument();
    });
  });

  it('renders view mode toggle', async () => {
    renderWithQueryClient(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByTestId('grid-view')).toBeInTheDocument();
      expect(screen.getByTestId('list-view')).toBeInTheDocument();
    });
  });

  it('renders empty state when no products match filters', async () => {
    renderWithQueryClient(<ProductList />);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/search products/i);
      fireEvent.change(searchInput, { target: { value: 'Non-existent product' } });
    });

    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it('renders error state when API fails', async () => {
    mockProductsAPI.getAll.mockRejectedValue(new Error('API Error'));
    
    renderWithQueryClient(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading products/i)).toBeInTheDocument();
    });
  });
});
