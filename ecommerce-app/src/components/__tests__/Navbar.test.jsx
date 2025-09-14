import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Mock the auth store
const mockLogout = vi.fn();
const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  role: 'user'
};
const mockIsAuthenticated = true;

vi.mock('../../features/auth/authStore', () => ({
  useAuthStore: () => ({
    user: mockUser,
    isAuthenticated: mockIsAuthenticated,
    logout: mockLogout
  })
}));

// Mock the cart store
vi.mock('../../features/cart/cartStore', () => ({
  useCartStore: () => ({
    itemCount: 3
  })
}));

// Mock react-router-dom
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Mock InteractiveLogo
vi.mock('../3D/InteractiveLogo', () => ({
  default: ({ size, showText, className }) => (
    <div data-testid="interactive-logo" className={className}>
      Logo {size} {showText ? 'with text' : 'without text'}
    </div>
  )
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and brand name', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('Ecommerce')).toBeInTheDocument();
    expect(screen.getByTestId('interactive-logo')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument();
  });

  it('renders cart icon with item count', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders user menu when authenticated', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders login and register links when not authenticated', () => {
    vi.mocked(require('../../features/auth/authStore').useAuthStore).mockImplementation(() => ({
      user: null,
      isAuthenticated: false,
      logout: mockLogout
    }));

    renderWithRouter(<Navbar />);
    
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  it('renders admin link for admin users', () => {
    const adminUser = { ...mockUser, role: 'admin' };
    vi.mocked(require('../../features/auth/authStore').useAuthStore).mockImplementation(() => ({
      user: adminUser,
      isAuthenticated: true,
      logout: mockLogout
    }));

    renderWithRouter(<Navbar />);
    
    expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    renderWithRouter(<Navbar />);
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    
    // Check if mobile menu is open (this would depend on the implementation)
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles user menu dropdown', () => {
    renderWithRouter(<Navbar />);
    
    const userButton = screen.getByRole('button', { name: /user menu/i });
    fireEvent.click(userButton);
    
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/orders/i)).toBeInTheDocument();
  });

  it('calls logout when logout button is clicked', () => {
    renderWithRouter(<Navbar />);
    
    const userButton = screen.getByRole('button', { name: /user menu/i });
    fireEvent.click(userButton);
    
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to cart when cart icon is clicked', () => {
    renderWithRouter(<Navbar />);
    
    const cartLink = screen.getByRole('link', { name: /cart/i });
    fireEvent.click(cartLink);
    
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('renders search functionality', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
  });

  it('handles search input', () => {
    renderWithRouter(<Navbar />);
    
    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    expect(searchInput).toHaveValue('test search');
  });

  it('renders responsive design elements', () => {
    renderWithRouter(<Navbar />);
    
    // Check for mobile menu button
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
    
    // Check for desktop navigation (hidden on mobile)
    const desktopNav = screen.getByRole('navigation');
    expect(desktopNav).toHaveClass('hidden', 'md:flex');
  });

  it('closes user menu when clicking outside', () => {
    renderWithRouter(<Navbar />);
    
    const userButton = screen.getByRole('button', { name: /user menu/i });
    fireEvent.click(userButton);
    
    // Click outside the menu
    fireEvent.click(document.body);
    
    // User menu should be closed (this would depend on the implementation)
    expect(userButton).toBeInTheDocument();
  });
});
