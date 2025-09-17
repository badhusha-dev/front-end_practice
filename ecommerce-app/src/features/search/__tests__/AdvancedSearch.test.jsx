import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdvancedSearch from '../AdvancedSearch';

// Mock the search store
const mockSearchStore = {
  searchQuery: '',
  searchSuggestions: ['smartphone', 'laptop', 'headphones'],
  recentSearches: ['recent search 1', 'recent search 2'],
  popularSearches: ['popular search 1', 'popular search 2'],
  isSearching: false,
  showSuggestions: false,
  setSearchQuery: vi.fn(),
  performSearch: vi.fn(),
  toggleSuggestions: vi.fn(),
  clearSearch: vi.fn(),
  addToSearchHistory: vi.fn()
};

vi.mock('../searchStore', () => ({
  useSearchStore: () => mockSearchStore
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}));

describe('AdvancedSearch Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search input', () => {
    render(<AdvancedSearch />);
    
    expect(screen.getByPlaceholderText(/search for products/i)).toBeInTheDocument();
  });

  it('should render search button', () => {
    render(<AdvancedSearch />);
    
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should show suggestions when focused', async () => {
    const user = userEvent.setup();
    render(<AdvancedSearch />);
    
    const input = screen.getByPlaceholderText(/search for products/i);
    await user.click(input);
    
    await waitFor(() => {
      expect(screen.getByText(/recent searches/i)).toBeInTheDocument();
    });
  });

  it('should handle search input change', async () => {
    const user = userEvent.setup();
    render(<AdvancedSearch />);
    
    const input = screen.getByPlaceholderText(/search for products/i);
    await user.type(input, 'test query');
    
    expect(input.value).toBe('test query');
  });

  it('should handle search submission', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<AdvancedSearch onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search for products/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    await user.type(input, 'test query');
    await user.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('should handle enter key press', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<AdvancedSearch onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search for products/i);
    await user.type(input, 'test query');
    await user.keyboard('{Enter}');
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('should show quick filters when focused', async () => {
    const user = userEvent.setup();
    render(<AdvancedSearch />);
    
    const input = screen.getByPlaceholderText(/search for products/i);
    await user.click(input);
    
    await waitFor(() => {
      expect(screen.getByText(/quick filters/i)).toBeInTheDocument();
    });
  });

  it('should show categories in quick filters', async () => {
    const user = userEvent.setup();
    render(<AdvancedSearch />);
    
    const input = screen.getByPlaceholderText(/search for products/i);
    await user.click(input);
    
    await waitFor(() => {
      expect(screen.getByText(/electronics/i)).toBeInTheDocument();
    });
  });
});
