import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import CartPage from '../CartPage';

// Mock the cart store
const mockItems = [
  {
    id: '1',
    name: 'Test Product 1',
    price: 99.99,
    quantity: 2,
    maxStock: 10,
    image: 'image1.jpg'
  },
  {
    id: '2',
    name: 'Test Product 2',
    price: 149.99,
    quantity: 1,
    maxStock: 5,
    image: 'image2.jpg'
  }
];

const mockCartStore = {
  items: mockItems,
  total: 349.97,
  itemCount: 3,
  updateQuantity: vi.fn(),
  removeItem: vi.fn(),
  clearCart: vi.fn()
};

vi.mock('../cartStore', () => ({
  useCartStore: () => mockCartStore
}));

// Mock react-router-dom
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('CartPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders cart items', () => {
    renderWithRouter(<CartPage />);
    
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('renders item prices and quantities', () => {
    renderWithRouter(<CartPage />);
    
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('renders total price', () => {
    renderWithRouter(<CartPage />);
    
    expect(screen.getByText('$349.97')).toBeInTheDocument();
  });

  it('renders cart summary', () => {
    renderWithRouter(<CartPage />);
    
    expect(screen.getByText(/cart summary/i)).toBeInTheDocument();
    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/shipping/i)).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();
  });

  it('calls updateQuantity when quantity is changed', () => {
    renderWithRouter(<CartPage />);
    
    const quantityInput = screen.getByDisplayValue('2');
    fireEvent.change(quantityInput, { target: { value: '3' } });
    
    expect(mockCartStore.updateQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('calls removeItem when remove button is clicked', () => {
    renderWithRouter(<CartPage />);
    
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    fireEvent.click(removeButtons[0]);
    
    expect(mockCartStore.removeItem).toHaveBeenCalledWith('1');
  });

  it('calls clearCart when clear cart button is clicked', () => {
    renderWithRouter(<CartPage />);
    
    const clearButton = screen.getByRole('button', { name: /clear cart/i });
    fireEvent.click(clearButton);
    
    expect(mockCartStore.clearCart).toHaveBeenCalled();
  });

  it('navigates to checkout when checkout button is clicked', () => {
    renderWithRouter(<CartPage />);
    
    const checkoutButton = screen.getByRole('button', { name: /proceed to checkout/i });
    fireEvent.click(checkoutButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });

  it('shows empty cart message when no items', () => {
    vi.mocked(require('../cartStore').useCartStore).mockReturnValue({
      items: [],
      total: 0,
      itemCount: 0,
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      clearCart: vi.fn()
    });

    renderWithRouter(<CartPage />);
    
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/continue shopping/i)).toBeInTheDocument();
  });

  it('navigates to products when continue shopping is clicked', () => {
    vi.mocked(require('../cartStore').useCartStore).mockReturnValue({
      items: [],
      total: 0,
      itemCount: 0,
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      clearCart: vi.fn()
    });

    renderWithRouter(<CartPage />);
    
    const continueButton = screen.getByRole('button', { name: /continue shopping/i });
    fireEvent.click(continueButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  it('disables checkout button when cart is empty', () => {
    vi.mocked(require('../cartStore').useCartStore).mockReturnValue({
      items: [],
      total: 0,
      itemCount: 0,
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      clearCart: vi.fn()
    });

    renderWithRouter(<CartPage />);
    
    const checkoutButton = screen.getByRole('button', { name: /proceed to checkout/i });
    expect(checkoutButton).toBeDisabled();
  });

  it('renders product images', () => {
    renderWithRouter(<CartPage />);
    
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Test Product 1');
    expect(images[1]).toHaveAttribute('src', 'image2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Test Product 2');
  });

  it('shows quantity controls', () => {
    renderWithRouter(<CartPage />);
    
    const decreaseButtons = screen.getAllByRole('button', { name: /decrease quantity/i });
    const increaseButtons = screen.getAllByRole('button', { name: /increase quantity/i });
    
    expect(decreaseButtons).toHaveLength(2);
    expect(increaseButtons).toHaveLength(2);
  });

  it('calls updateQuantity when decrease button is clicked', () => {
    renderWithRouter(<CartPage />);
    
    const decreaseButtons = screen.getAllByRole('button', { name: /decrease quantity/i });
    fireEvent.click(decreaseButtons[0]);
    
    expect(mockCartStore.updateQuantity).toHaveBeenCalledWith('1', 1);
  });

  it('calls updateQuantity when increase button is clicked', () => {
    renderWithRouter(<CartPage />);
    
    const increaseButtons = screen.getAllByRole('button', { name: /increase quantity/i });
    fireEvent.click(increaseButtons[0]);
    
    expect(mockCartStore.updateQuantity).toHaveBeenCalledWith('1', 3);
  });
});
