import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import MirageJS server
import { makeServer } from './mocks/server';

// Import components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Import pages
import HomePage from './app/HomePage';
import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import CartPage from './features/cart/CartPage';
import CheckoutPage from './features/checkout/CheckoutPage';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import AdminDashboard from './features/admin/AdminDashboard';
import WishlistPage from './features/wishlist/WishlistPage';
import ComparisonPage from './features/comparison/ComparisonPage';
import ProfilePage from './features/profile/ProfilePage';
import TestPage from './components/TestPage';
import ThreeDShowcase from './components/3D/ThreeDShowcase';

// Import 3D Components
import Background3D from './components/3D/Background3D';
import PageTransition3D from './components/3D/PageTransition3D';

// Import Advanced Features
import ChatWidget from './components/ChatWidget';
import GamificationWidget from './components/GamificationWidget';

// Import stores
import { useAuthStore } from './features/auth/authStore';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Initialize MirageJS server in development
if (import.meta.env.MODE === 'development') {
  makeServer();
}

// Auth initialization component
const AuthInitializer = ({ children }) => {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer>
          <Router>
            <div className="App relative">
              {/* 3D Background */}
              <Background3D type="particles" intensity="low" />
              
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="products" element={<ProductList />} />
                  <Route path="products/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="wishlist" element={<WishlistPage />} />
                  <Route path="compare" element={<ComparisonPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="test" element={<TestPage />} />
                  <Route path="3d-showcase" element={<ThreeDShowcase />} />
                  
                  {/* Protected Routes */}
                  <Route path="checkout" element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } />
                  <Route path="profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  
                  {/* Admin Routes */}
                  <Route path="admin" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                </Route>
              </Routes>
              
              {/* Toast Notifications */}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </Router>
        </AuthInitializer>
        <ChatWidget />
        <GamificationWidget />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;