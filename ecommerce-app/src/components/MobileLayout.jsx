import React, { useState, useEffect } from 'react';
import { 
  MdMenu, 
  MdClose, 
  MdSearch, 
  MdShoppingCart, 
  MdFavorite, 
  MdPerson,
  MdHome,
  MdCategory,
  MdNotifications,
  MdSettings,
  MdArrowBack,
  MdMoreVert,
  MdTouchApp
} from 'react-icons/md';

// Mobile Navigation Component
const MobileNavigation = ({ isOpen, onClose, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: MdHome, path: '/' },
    { id: 'products', label: 'Products', icon: MdCategory, path: '/products' },
    { id: 'cart', label: 'Cart', icon: MdShoppingCart, path: '/cart' },
    { id: 'wishlist', label: 'Wishlist', icon: MdFavorite, path: '/wishlist' },
    { id: 'profile', label: 'Profile', icon: MdPerson, path: '/profile' },
    { id: 'settings', label: 'Settings', icon: MdSettings, path: '/settings' }
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative w-80 h-full bg-white shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className="w-full flex items-center space-x-4 p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icon className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-800 font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

// Mobile Header Component
const MobileHeader = ({ onMenuClick, onSearchClick, cartCount, wishlistCount }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MdMenu className="w-6 h-6 text-gray-700" />
        </button>

        <h1 className="text-lg font-semibold text-gray-800">E-commerce App</h1>

        <div className="flex items-center space-x-2">
          <button
            onClick={onSearchClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MdSearch className="w-6 h-6 text-gray-700" />
          </button>
          
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MdShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MdFavorite className="w-6 h-6 text-gray-700" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

// Mobile Search Component
const MobileSearch = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ${
      isOpen ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MdArrowBack className="w-6 h-6" />
          </button>
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </form>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h3>
          {['iPhone', 'Laptop', 'Headphones', 'Shoes'].map((term) => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                onSearch(term);
                onClose();
              }}
              className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mobile Product Card Component
const MobileProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onAddToWishlist(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="aspect-square bg-gray-100 relative">
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleLike}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          }`}
        >
          <MdFavorite className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg font-bold text-blue-600">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <MdShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

// Mobile Bottom Navigation Component
const MobileBottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: MdHome, label: 'Home' },
    { id: 'products', icon: MdCategory, label: 'Products' },
    { id: 'cart', icon: MdShoppingCart, label: 'Cart' },
    { id: 'wishlist', icon: MdFavorite, label: 'Wishlist' },
    { id: 'profile', icon: MdPerson, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// Mobile Gesture Handler Component
const MobileGestureHandler = ({ children, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="touch-pan-y"
    >
      {children}
    </div>
  );
};

// Main Mobile Layout Component
const MobileLayout = ({ children, cartCount = 0, wishlistCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  const handleNavigate = (path) => {
    console.log('Navigating to:', path);
    // Implement navigation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader
        onMenuClick={handleMenuClick}
        onSearchClick={handleSearchClick}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {/* Main Content */}
      <main className="pb-20 pt-16">
        <MobileGestureHandler
          onSwipeLeft={() => console.log('Swipe left')}
          onSwipeRight={() => console.log('Swipe right')}
        >
          {children}
        </MobileGestureHandler>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Mobile Search */}
      <MobileSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default MobileLayout;
export { 
  MobileNavigation, 
  MobileHeader, 
  MobileSearch, 
  MobileProductCard, 
  MobileBottomNav, 
  MobileGestureHandler 
};
