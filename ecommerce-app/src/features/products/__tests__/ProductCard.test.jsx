import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../ProductCard';

// Mock the cart store
vi.mock('../../cart/cartStore', () => ({
  useCartStore: () => ({
    addItem: vi.fn(),
    isInCart: vi.fn(() => false),
    getItemQuantity: vi.fn(() => 0)
  })
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => (
    <span data-testid="link" data-to={to} {...props}>
      {children}
    </span>
  )
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg',
    category: 'Electronics',
    rating: 4.5,
    reviews: 10,
    stock: 5
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(10)')).toBeInTheDocument();
  });

  it('renders product image with correct src and alt', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Product');
  });

  it('shows out of stock message when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('shows low stock warning when stock is low', () => {
    const lowStockProduct = { ...mockProduct, stock: 2 };
    render(<ProductCard product={lowStockProduct} />);
    
    expect(screen.getByText('Only 2 left in stock')).toBeInTheDocument();
  });

  it('calls addItem when add to cart button is clicked', () => {
    const mockAddItem = vi.fn();
    vi.mocked(require('../../cart/cartStore').useCartStore).mockReturnValue({
      addItem: mockAddItem,
      isInCart: vi.fn(() => false),
      getItemQuantity: vi.fn(() => 0)
    });

    render(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);
    
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct, 1);
  });

  it('disables add to cart button when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);
    
    const addButton = screen.getByText('Add to Cart');
    expect(addButton).toBeDisabled();
  });

  it('shows quantity controls when item is in cart', () => {
    vi.mocked(require('../../cart/cartStore').useCartStore).mockReturnValue({
      addItem: vi.fn(),
      isInCart: vi.fn(() => true),
      getItemQuantity: vi.fn(() => 2)
    });

    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByText('−')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('renders link to product detail page', () => {
    render(<ProductCard product={mockProduct} />);
    
    const productLinks = screen.getAllByTestId('link');
    expect(productLinks[0]).toHaveAttribute('data-to', '/products/1');
  });
});
