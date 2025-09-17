import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdHistory, MdTrendingUp } from 'react-icons/md';
import { productsAPI } from '../api/api';

const SearchAutocomplete = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches] = useState([
    'Wireless Headphones',
    'Smart Watch',
    'Laptop',
    'Phone Case',
    'Bluetooth Speaker'
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const cacheRef = useRef(new Map()); // key: query -> { data, ts }
  const productsRef = useRef(null); // cache full product list

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Fetch search suggestions with simple in-memory cache (5 min TTL)
  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const normalized = searchQuery.trim().toLowerCase();
    const cached = cacheRef.current.get(normalized);
    const now = Date.now();
    if (cached && now - cached.ts < 5 * 60 * 1000) {
      setSuggestions(cached.data);
      return;
    }

    setIsLoading(true);
    try {
      // Fetch once and reuse
      if (!productsRef.current) {
        const response = await productsAPI.getAll();
        productsRef.current = response.data.products || [];
      }
      const products = productsRef.current;
      
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

      setSuggestions(filtered);
      cacheRef.current.set(normalized, { data: filtered, ts: now });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(query);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;

    // Save to recent searches
    const newRecentSearches = [
      searchTerm,
      ...recentSearches.filter(item => item !== searchTerm)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

    // Navigate to search results
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    setShowSuggestions(false);
    onClose?.();
  };

  // Handle suggestion click
  const handleSuggestionClick = (product) => {
    navigate(`/products/${product.id}`);
    setShowSuggestions(false);
    onClose?.();
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      onClose?.();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MdSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyPress}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          autoFocus
        />
        {query && (
          <button
            onClick={() => handleSearch(query)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <span className="bg-primary-600 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-primary-700">
              Search
            </span>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {query ? (
            // Search Suggestions
            <div>
              {isLoading ? (
                <div className="px-4 py-3 text-gray-500">Searching...</div>
              ) : suggestions.length > 0 ? (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                    Products
                  </div>
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">${product.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-3 text-gray-500">No products found</div>
              )}
              
              {/* Search All Results */}
              <div className="border-t">
                <button
                  onClick={() => handleSearch(query)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 text-primary-600"
                >
                  <MdSearch className="w-4 h-4" />
                  <span>Search for "{query}"</span>
                </button>
              </div>
            </div>
          ) : (
            // No query - show recent and trending
            <div>
              {recentSearches.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b flex items-center">
                    <MdHistory className="w-3 h-3 mr-1" />
                    Recent Searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}
              
              <div>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t flex items-center">
                  <MdTrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </div>
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default SearchAutocomplete;
