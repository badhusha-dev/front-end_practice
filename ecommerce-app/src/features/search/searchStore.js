import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSearchStore = create(
  persist(
    (set, get) => ({
      // Search state
      searchQuery: '',
      searchResults: [],
      searchSuggestions: [],
      recentSearches: [],
      popularSearches: [
        'smartphone', 'laptop', 'headphones', 'watch', 'camera',
        'gaming', 'fitness', 'home', 'kitchen', 'beauty'
      ],
      
      // Filter state
      filters: {
        category: '',
        priceRange: { min: 0, max: 10000 },
        brand: '',
        rating: 0,
        availability: 'all', // all, in-stock, out-of-stock
        sortBy: 'relevance', // relevance, price-low, price-high, rating, newest
        features: [],
        colors: [],
        sizes: []
      },
      
      // UI state
      isSearching: false,
      showSuggestions: false,
      showFilters: false,
      searchHistory: [],
      
      // Actions
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        if (query.length > 0) {
          get().generateSuggestions(query);
        }
      },
      
      generateSuggestions: (query) => {
        const { popularSearches, recentSearches } = get();
        const suggestions = [
          ...recentSearches.filter(search => 
            search.toLowerCase().includes(query.toLowerCase())
          ),
          ...popularSearches.filter(search => 
            search.toLowerCase().includes(query.toLowerCase())
          )
        ].slice(0, 8);
        
        set({ searchSuggestions: suggestions });
      },
      
      performSearch: async (query, filters = null) => {
        set({ isSearching: true });
        
        try {
          // Simulate API call with intelligent search
          const searchParams = {
            query,
            ...(filters || get().filters),
            timestamp: Date.now()
          };
          
          // Mock intelligent search results
          const mockResults = await get().mockIntelligentSearch(query, searchParams);
          
          set({ 
            searchResults: mockResults,
            isSearching: false,
            showSuggestions: false
          });
          
          // Add to search history
          get().addToSearchHistory(query);
          
        } catch (error) {
          console.error('Search error:', error);
          set({ isSearching: false });
        }
      },
      
      mockIntelligentSearch: async (query, params) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock products data
        const mockProducts = [
          {
            id: 1,
            name: 'iPhone 15 Pro',
            category: 'smartphone',
            brand: 'Apple',
            price: 999,
            rating: 4.8,
            image: '/api/placeholder/300/300',
            inStock: true,
            features: ['5G', 'Camera', 'Wireless Charging'],
            colors: ['Space Black', 'Natural Titanium', 'Blue Titanium'],
            description: 'Latest iPhone with advanced camera system'
          },
          {
            id: 2,
            name: 'MacBook Pro 16"',
            category: 'laptop',
            brand: 'Apple',
            price: 2499,
            rating: 4.9,
            image: '/api/placeholder/300/300',
            inStock: true,
            features: ['M3 Pro Chip', 'Retina Display', 'Touch Bar'],
            colors: ['Space Gray', 'Silver'],
            description: 'Professional laptop for creators'
          },
          {
            id: 3,
            name: 'Sony WH-1000XM5',
            category: 'headphones',
            brand: 'Sony',
            price: 399,
            rating: 4.7,
            image: '/api/placeholder/300/300',
            inStock: true,
            features: ['Noise Cancelling', 'Wireless', '30h Battery'],
            colors: ['Black', 'Silver'],
            description: 'Industry-leading noise cancelling headphones'
          }
        ];
        
        // Intelligent filtering based on query
        let results = mockProducts;
        
        if (query) {
          const queryLower = query.toLowerCase();
          results = results.filter(product => 
            product.name.toLowerCase().includes(queryLower) ||
            product.category.toLowerCase().includes(queryLower) ||
            product.brand.toLowerCase().includes(queryLower) ||
            product.description.toLowerCase().includes(queryLower) ||
            product.features.some(feature => 
              feature.toLowerCase().includes(queryLower)
            )
          );
        }
        
        // Apply filters
        if (params.category) {
          results = results.filter(p => p.category === params.category);
        }
        
        if (params.brand) {
          results = results.filter(p => p.brand === params.brand);
        }
        
        if (params.priceRange) {
          results = results.filter(p => 
            p.price >= params.priceRange.min && 
            p.price <= params.priceRange.max
          );
        }
        
        if (params.rating > 0) {
          results = results.filter(p => p.rating >= params.rating);
        }
        
        if (params.availability === 'in-stock') {
          results = results.filter(p => p.inStock);
        }
        
        // Sort results
        switch (params.sortBy) {
          case 'price-low':
            results.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            results.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            results.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            results.sort((a, b) => b.id - a.id);
            break;
          default:
            // Relevance scoring
            results.sort((a, b) => {
              const scoreA = get().calculateRelevanceScore(a, query);
              const scoreB = get().calculateRelevanceScore(b, query);
              return scoreB - scoreA;
            });
        }
        
        return results;
      },
      
      calculateRelevanceScore: (product, query) => {
        if (!query) return 0;
        
        const queryLower = query.toLowerCase();
        let score = 0;
        
        // Name match (highest weight)
        if (product.name.toLowerCase().includes(queryLower)) {
          score += 10;
        }
        
        // Brand match
        if (product.brand.toLowerCase().includes(queryLower)) {
          score += 8;
        }
        
        // Category match
        if (product.category.toLowerCase().includes(queryLower)) {
          score += 6;
        }
        
        // Feature match
        product.features.forEach(feature => {
          if (feature.toLowerCase().includes(queryLower)) {
            score += 3;
          }
        });
        
        // Description match
        if (product.description.toLowerCase().includes(queryLower)) {
          score += 2;
        }
        
        // Boost score for exact matches
        if (product.name.toLowerCase() === queryLower) {
          score += 15;
        }
        
        return score;
      },
      
      addToSearchHistory: (query) => {
        const { recentSearches } = get();
        const newHistory = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10);
        set({ recentSearches: newHistory });
      },
      
      clearSearchHistory: () => {
        set({ recentSearches: [] });
      },
      
      updateFilters: (newFilters) => {
        set(state => ({
          filters: { ...state.filters, ...newFilters }
        }));
      },
      
      resetFilters: () => {
        set({
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
          }
        });
      },
      
      toggleSuggestions: () => {
        set(state => ({ showSuggestions: !state.showSuggestions }));
      },
      
      toggleFilters: () => {
        set(state => ({ showFilters: !state.showFilters }));
      },
      
      clearSearch: () => {
        set({
          searchQuery: '',
          searchResults: [],
          searchSuggestions: [],
          showSuggestions: false
        });
      }
    }),
    {
      name: 'search-store',
      partialize: (state) => ({
        recentSearches: state.recentSearches,
        searchHistory: state.searchHistory
      })
    }
  )
);

export { useSearchStore };
