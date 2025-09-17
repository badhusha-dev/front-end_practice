import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/reduxHooks';
import ProtectedRoute from '../components/ProtectedRoute';

// Lazy load 3D components
const AnimatedBackground = lazy(() => import('../components/3D/AnimatedBackground'));
const PageTransition3D = lazy(() => import('../components/3D/PageTransition3D'));
const ThreeDShowcase = lazy(() => import('../components/3D/ThreeDShowcase'));
const ProductViewer3D = lazy(() => import('../components/3D/ProductViewer3D'));
const CartPreview3D = lazy(() => import('../components/3D/CartPreview3D'));
const InteractiveLogo = lazy(() => import('../components/3D/InteractiveLogo'));

// Import pages
import HomePage from '../app/HomePage';
import ProductList from '../features/products/ProductList';
import ProductDetail from '../features/products/ProductDetail';
import CartPage from '../features/cart/CartPage';
import CheckoutPage from '../features/checkout/CheckoutPage';
import WishlistPage from '../features/wishlist/WishlistPage';
import ComparisonPage from '../features/comparison/ComparisonPage';
import ProfilePage from '../features/profile/ProfilePage';
import UserDashboard3D from './UserDashboard3D';
import AdvancedCartFeatures from '../components/AdvancedCartFeatures';

// 3D User Navigation Component
const UserNav3D = () => {
  const { user } = useAuth();
  
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 3D Logo */}
          <div className="flex items-center space-x-4">
            <Suspense fallback={<div className="w-8 h-8 bg-white rounded" />}>
              <InteractiveLogo className="w-8 h-8" />
            </Suspense>
            <span className="text-white font-bold text-xl">Shop3D</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-blue-200 transition-colors">Home</a>
            <a href="/products" className="text-white hover:text-blue-200 transition-colors">Products</a>
            <a href="/wishlist" className="text-white hover:text-blue-200 transition-colors">Wishlist</a>
            <a href="/comparison" className="text-white hover:text-blue-200 transition-colors">Compare</a>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Suspense fallback={<div className="w-8 h-8 bg-white rounded" />}>
              <CartPreview3D />
            </Suspense>
            {user && (
              <div className="text-white">
                Welcome, {user.firstName || user.name}!
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// 3D User Layout
const UserLayout3D = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <AnimatedBackground className="absolute inset-0 -z-10 opacity-30" />
      </Suspense>
      
      {/* 3D Navigation */}
      <UserNav3D />
      
      {/* Main Content with 3D Transitions */}
      <main className="relative z-10">
        <Suspense fallback={<div className="h-64 bg-white animate-pulse" />}>
          <PageTransition3D isActive={false}>
            {children}
          </PageTransition3D>
        </Suspense>
      </main>
    </div>
  );
};

// Enhanced Home Page with 3D Features
const UserHomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Product Viewer */}
      <section className="relative text-white overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to
                <span className="block text-yellow-300">3D Shopping</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Experience shopping like never before with interactive 3D products, 
                immersive galleries, and cutting-edge technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/products"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Explore 3D Products
                </a>
                <a
                  href="/products"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  View Gallery
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <Suspense fallback={<div className="w-full h-96 bg-white rounded-lg animate-pulse" />}>
                <ProductViewer3D className="w-full h-96 rounded-lg overflow-hidden shadow-2xl" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Features Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Experience 3D Shopping
          </h2>
          <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse" />}>
            <ThreeDShowcase />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

// Main User App Component
const UserApp = () => {
  return (
    <UserLayout3D>
      <Routes>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<UserDashboard3D />} />
        <Route path="/advanced-cart" element={<AdvancedCartFeatures />} />
      </Routes>
    </UserLayout3D>
  );
};

export default UserApp;
