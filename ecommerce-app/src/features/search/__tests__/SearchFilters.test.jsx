import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchFilters from '../SearchFilters';

// Mock the search store
const mockSearchStore = {
  filters: {
    category: '',
    priceRange: { min: 0, max: 10000 },
    brand: '',
    rating: 0,
    availability: 'all',
    sortBy: 'relevance',
    features: [],
    colors: [],
    sizes: []
  },
  updateFilters: vi.fn(),
  resetFilters: vi.fn(),
  applyFilters: vi.fn()
};

vi.mock('../searchStore', () => ({
  useSearchStore: () => mockSearchStore
}));

describe('SearchFilters Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render when open', () => {
    render(<SearchFilters isOpen={true} onClose={vi.fn()} />);
    
    expect(screen.getByText(/filters/i)).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(<SearchFilters isOpen={false} onClose={vi.fn()} />);
    
    expect(screen.queryByText(/filters/i)).not.toBeInTheDocument();
  });

  it('should render all filter sections', () => {
    render(<SearchFilters isOpen={true} onClose={vi.fn()} />);
    
    expect(screen.getByText(/price range/i)).toBeInTheDocument();
    expect(screen.getByText(/category/i)).toBeInTheDocument();
    expect(screen.getByText(/brand/i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/availability/i)).toBeInTheDocument();
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
  });

  it('should handle price range changes', async () => {
    const user = userEvent.setup();
    render(<SearchFilters isOpen={true} onClose={vi.fn()} />);
    
    const minPriceInput = screen.getByLabelText(/min price/i);
    await user.type(minPriceInput, '100');
    
    expect(minPriceInput.value).toBe('100');
  });

  it('should handle category selection', async () => {
    const user = userEvent.setup();
    render(<SearchFilters isOpen={true} onClose={vi.fn()} />);
    
    const categorySelect = screen.getByLabelText(/category/i);
    await user.selectOptions(categorySelect, 'electronics');
    
    expect(categorySelect.value).toBe('electronics');
  });

  it('should handle brand selection', async () => {
    const user = userEvent.setup();
    render(<SearchFilters isOpen={true} onClose={vi.fn()} />);
    
    const brandSelect = screen.getByLabelText(/brand/i);
    await user.selectOptions(brandSelect, 'apple');
    
    expect(brandSelect.value).toBe('apple');
  });

  it('should handle rating selection', async () => {
    const user = userEvent.setup();
    render(<SearchFilters isOpen={true} onClose={vi.fn()} />);
    
    const ratingSelect = screen.getByLabelText(/rating/i);
    await user.selectOptions(ratingSelect, '4');
    
    expect(ratingSelect.value).toBe('4');
  });

  it('should handle availability selection', async () => {
    const user = userEvent.setup();
    render(<SearchFilters isOpen={true} onClose={vi.fn()} />);
    
    const availabilitySelect = screen.getByLabelText(/availability/i);
    await user.selectOptions(availabilitySelect, 'in-stock');
    
    expect(availabilitySelect.value).toBe('in-stock');
  });

  it('should handle sort by selection', async () => {
    const user = userEvent.setup();
    render(<SearchFilters isOpen={true} onClose={vi.fn()} />);
    
    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.selectOptions(sortSelect, 'price-low-high');
    
    expect(sortSelect.value).toBe('price-low-high');
  });

  it('should handle apply filters button', async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    render(<SearchFilters isOpen={true} onClose={mockOnClose} />);
    
    const applyButton = screen.getByRole('button', { name: /apply filters/i });
    await user.click(applyButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should handle reset filters button', async () => {
    const user = userEvent.setup();
    render(<SearchFilters isOpen={true} onClose={vi.fn()} />);
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);
    
    // Reset should clear all form values
    expect(screen.getByLabelText(/min price/i).value).toBe('0');
    expect(screen.getByLabelText(/max price/i).value).toBe('10000');
  });

  it('should handle close button', async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    render(<SearchFilters isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should handle escape key to close', async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    render(<SearchFilters isOpen={true} onClose={mockOnClose} />);
    
    await user.keyboard('{Escape}');
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});
