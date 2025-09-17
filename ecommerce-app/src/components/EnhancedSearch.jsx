import React, { useState, useEffect, useRef } from 'react';
import { MdSearch, MdClear, MdHistory, MdTrendingUp } from 'react-icons/md';
import { useProducts } from '../hooks/reduxHooks';

const EnhancedSearch = ({ onSearch, placeholder = "Search products..." }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([
    'laptop', 'smartphone', 'headphones', 'camera', 'tablet'
  ]);
  const searchRef = useRef(null);
  const { products } = useProducts();

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const generateSuggestions = (searchQuery) => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const suggestions = [];

    // Product name suggestions
    products.forEach(product => {
      if (product.name.toLowerCase().includes(query)) {
        suggestions.push({
          type: 'product',
          text: product.name,
          category: product.category,
          id: product.id
        });
      }
    });

    // Category suggestions
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(category => {
      if (category.toLowerCase().includes(query)) {
        suggestions.push({
          type: 'category',
          text: category,
          category: 'Category'
        });
      }
    });

    // Brand suggestions
    const brands = [...new Set(products.map(p => p.brand))];
    brands.forEach(brand => {
      if (brand.toLowerCase().includes(query)) {
        suggestions.push({
          type: 'brand',
          text: brand,
          category: 'Brand'
        });
      }
    });

    return suggestions.slice(0, 8);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      setSuggestions(generateSuggestions(value));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    // Add to recent searches
    const newRecentSearches = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

    // Perform search
    onSearch(searchQuery);
    setIsOpen(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handleRecentSearchClick = (search) => {
    setQuery(search);
    handleSearch(search);
  };

  const handleTrendingSearchClick = (search) => {
    setQuery(search);
    handleSearch(search);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    onSearch('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MdSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <MdClear className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900">{suggestion.text}</div>
                    <div className="text-sm text-gray-500">{suggestion.category}</div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {suggestion.type === 'product' ? 'Product' : suggestion.type}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && suggestions.length === 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center">
                <MdHistory className="w-3 h-3 mr-1" />
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Trending Searches */}
          {suggestions.length === 0 && recentSearches.length === 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center">
                <MdTrendingUp className="w-3 h-3 mr-1" />
                Trending Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrendingSearchClick(search)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {suggestions.length === 0 && recentSearches.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <MdSearch className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <div>Start typing to search products</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;
