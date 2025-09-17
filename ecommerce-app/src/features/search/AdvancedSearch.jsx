import React, { useState, useEffect, useRef } from 'react';
import { useSearchStore } from './searchStore';
import { FiSearch, FiX, FiFilter, FiTrendingUp, FiClock, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AdvancedSearch = ({ onSearch, className = '' }) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [showQuickFilters, setShowQuickFilters] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  
  const {
    searchQuery,
    searchSuggestions,
    recentSearches,
    popularSearches,
    isSearching,
    showSuggestions,
    filters,
    setSearchQuery,
    performSearch,
    toggleSuggestions,
    clearSearch,
    addToSearchHistory
  } = useSearchStore();

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;
    
    await performSearch(query);
    if (onSearch) {
      onSearch(query);
    }
    navigate('/products');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const quickFilters = [
    { label: 'Under $100', filter: { priceRange: { min: 0, max: 100 } } },
    { label: 'Top Rated', filter: { rating: 4.5 } },
    { label: 'In Stock', filter: { availability: 'in-stock' } },
    { label: 'New Arrivals', filter: { sortBy: 'newest' } },
    { label: 'Best Deals', filter: { sortBy: 'price-low' } }
  ];

  const categories = [
    'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty'
  ];

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Main Search Input */}
      <div className="relative" ref={searchRef}>
        <div className="flex items-center bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center px-4 py-3 text-gray-400">
            <FiSearch className="w-5 h-5" />
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for products, brands, or categories..."
            className="flex-1 px-2 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
          />
          
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={() => handleSearch()}
            disabled={isSearching || !searchQuery.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </div>

        {/* Quick Filters */}
        {isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Quick Filters</h3>
              <button
                onClick={() => setShowQuickFilters(!showQuickFilters)}
                className="flex items-center text-xs text-blue-600 hover:text-blue-700"
              >
                <FiFilter className="w-3 h-3 mr-1" />
                {showQuickFilters ? 'Hide' : 'Show'} Filters
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {quickFilters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Apply quick filter logic here
                    console.log('Apply filter:', filter.filter);
                  }}
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Categories */}
            <div className="mb-3">
              <h4 className="text-xs font-medium text-gray-600 mb-2">Popular Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(category)}
                    className="px-2 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {(showSuggestions || (isFocused && searchSuggestions.length > 0)) && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
        >
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center mb-2">
                <FiClock className="w-4 h-4 text-gray-400 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
              </div>
              <div className="space-y-1">
                {recentSearches.slice(0, 3).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Suggestions */}
          {searchSuggestions.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center mb-2">
                <FiTrendingUp className="w-4 h-4 text-gray-400 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">Suggestions</h3>
              </div>
              <div className="space-y-1">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="p-4">
            <div className="flex items-center mb-2">
              <FiStar className="w-4 h-4 text-gray-400 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Popular Searches</h3>
            </div>
            <div className="space-y-1">
              {popularSearches.slice(0, 5).map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
