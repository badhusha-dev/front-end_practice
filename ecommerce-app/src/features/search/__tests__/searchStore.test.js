import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSearchStore } from '../features/search/searchStore';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Search Store', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  it('should initialize with default values', () => {
    const store = useSearchStore.getState();
    
    expect(store.searchQuery).toBe('');
    expect(store.searchResults).toEqual([]);
    expect(store.searchSuggestions).toEqual([]);
    expect(store.recentSearches).toEqual([]);
    expect(store.filters).toEqual({
      category: '',
      priceRange: { min: 0, max: 10000 },
      brand: '',
      rating: 0,
      availability: 'all',
      sortBy: 'relevance',
      features: [],
      colors: [],
      sizes: []
    });
  });

  it('should set search query', () => {
    const { setSearchQuery } = useSearchStore.getState();
    
    setSearchQuery('test query');
    
    expect(useSearchStore.getState().searchQuery).toBe('test query');
  });

  it('should generate suggestions based on query', () => {
    const { setSearchQuery, generateSuggestions } = useSearchStore.getState();
    
    setSearchQuery('smartphone');
    generateSuggestions('smartphone');
    
    const state = useSearchStore.getState();
    expect(state.searchSuggestions.length).toBeGreaterThan(0);
  });

  it('should perform search', async () => {
    const { performSearch } = useSearchStore.getState();
    
    await performSearch('test');
    
    const state = useSearchStore.getState();
    expect(state.searchResults).toBeDefined();
    expect(state.isSearching).toBe(false);
  });

  it('should update filters', () => {
    const { updateFilters } = useSearchStore.getState();
    
    updateFilters({ category: 'electronics' });
    
    expect(useSearchStore.getState().filters.category).toBe('electronics');
  });

  it('should reset filters', () => {
    const { updateFilters, resetFilters } = useSearchStore.getState();
    
    updateFilters({ category: 'electronics', brand: 'apple' });
    resetFilters();
    
    const state = useSearchStore.getState();
    expect(state.filters.category).toBe('');
    expect(state.filters.brand).toBe('');
  });

  it('should add to search history', () => {
    const { addToSearchHistory } = useSearchStore.getState();
    
    addToSearchHistory('test search');
    
    expect(useSearchStore.getState().recentSearches).toContain('test search');
  });

  it('should clear search history', () => {
    const { addToSearchHistory, clearSearchHistory } = useSearchStore.getState();
    
    addToSearchHistory('test search');
    clearSearchHistory();
    
    expect(useSearchStore.getState().recentSearches).toEqual([]);
  });
});
