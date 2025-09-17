import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MdShoppingCart,
  MdPerson,
  MdMenu,
  MdClose,
  MdSettings,
  MdSearch,
  MdFavorite,
  MdCompare,
  MdMic
} from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';
import { useAuth, useCart, useWishlist, useComparison } from '../hooks/reduxHooks';
import InteractiveLogo from './3D/InteractiveLogo';
import ThemeToggle from './ThemeToggle';
import SearchAutocomplete from './SearchAutocomplete';
import CartPreview3D from './3D/CartPreview3D';
import VoiceSearch from './VoiceSearch';
import NotificationCenter from './NotificationCenter';
import AdvancedSearch from '../features/search/AdvancedSearch';
import SearchFilters from '../features/search/SearchFilters';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, dispatch: authDispatch } = useAuth();
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { items: comparisonItems } = useComparison();
  
  const wishlistCount = wishlistItems.length;
  const comparisonCount = comparisonItems.length;
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [show3DCart, setShow3DCart] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showSearchFilters, setShowSearchFilters] = useState(false);

  const handleLogout = () => {
    authDispatch({ type: 'auth/logoutAsync' });
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <InteractiveLogo size="small" showText={false} className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-800">Ecommerce</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              Products
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Advanced Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            {showAdvancedSearch ? (
              <AdvancedSearch 
                onSearch={(query) => {
                  navigate(`/products?search=${encodeURIComponent(query)}`);
                  setShowAdvancedSearch(false);
                }}
                className="w-full"
              />
            ) : (
              <div className="relative w-full">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products, brands, or categories..."
                  onFocus={() => setShowAdvancedSearch(true)}
                  className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button
                    onClick={() => setShowSearchFilters(true)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Advanced Filters"
                  >
                    <MdSettings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowVoiceSearch(true)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Voice search"
                  >
                    <MdMic className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <NotificationCenter />

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              title="Wishlist"
            >
              <MdFavorite className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Comparison */}
            <Link 
              to="/compare" 
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              title="Compare Products"
            >
              <MdCompare className="w-6 h-6" />
              {comparisonCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {comparisonCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button 
              onClick={() => setShow3DCart(true)}
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              title="3D Shopping Cart Preview"
            >
              <MdShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  <MdPerson className="w-6 h-6" />
                  <span className="hidden md:block">{user?.firstName}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <MdPerson className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <MdSettings className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <MdSettings className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <IoLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isMenuOpen ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              
              {/* Mobile search */}
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3D Cart Preview */}
      {show3DCart && (
        <CartPreview3D
          isOpen={show3DCart}
          onClose={() => setShow3DCart(false)}
        />
      )}

      {/* Search Filters */}
      <SearchFilters
        isOpen={showSearchFilters}
        onClose={() => setShowSearchFilters(false)}
      />
    </nav>
  );
};

export default Navbar;
