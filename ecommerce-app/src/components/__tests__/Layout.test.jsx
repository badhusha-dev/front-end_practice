import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter, Outlet } from 'react-router-dom';
import Layout from '../Layout';

// Mock child components
vi.mock('../Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>
}));

vi.mock('../Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>
}));

vi.mock('../DebugInfo', () => ({
  default: () => <div data-testid="debug-info">Debug Info</div>
}));

// Mock Outlet
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <main data-testid="outlet">Page Content</main>
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Layout', () => {
  it('renders navbar', () => {
    renderWithRouter(<Layout />);
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders main content area with outlet', () => {
    renderWithRouter(<Layout />);
    
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderWithRouter(<Layout />);
    
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders debug info component', () => {
    renderWithRouter(<Layout />);
    
    expect(screen.getByTestId('debug-info')).toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    renderWithRouter(<Layout />);
    
    const container = screen.getByTestId('navbar').parentElement;
    expect(container).toHaveClass('min-h-screen', 'flex', 'flex-col');
  });

  it('has main content area with flex-grow class', () => {
    renderWithRouter(<Layout />);
    
    const main = screen.getByTestId('outlet');
    expect(main).toHaveClass('flex-grow');
  });

  it('renders all components in correct order', () => {
    renderWithRouter(<Layout />);
    
    const container = screen.getByTestId('navbar').parentElement;
    const children = Array.from(container.children);
    
    expect(children[0]).toHaveAttribute('data-testid', 'navbar');
    expect(children[1]).toHaveAttribute('data-testid', 'outlet');
    expect(children[2]).toHaveAttribute('data-testid', 'footer');
    expect(children[3]).toHaveAttribute('data-testid', 'debug-info');
  });
});
