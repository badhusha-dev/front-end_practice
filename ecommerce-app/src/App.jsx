import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux store
import { store, persistor } from './store/store';

// Import MirageJS server
import { makeServer } from './mocks/server';

// Import components
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import PageTransition3D from './components/3D/PageTransition3D';

// Lazy load separate apps
const UserApp = lazy(() => import('./apps/UserApp'));
const AdminApp = lazy(() => import('./apps/AdminApp'));
const Auth3D = lazy(() => import('./apps/Auth3D'));

// Import Advanced Features
import ChatWidget from './components/ChatWidget';
import GamificationWidget from './components/GamificationWidget';
import RealTimeNotifications from './components/RealTimeNotifications';
import AdvancedAnalyticsDashboard from './components/AdvancedAnalyticsDashboard';
import SocialSharing, { FloatingShareButton } from './components/SocialSharing';
import PWAManagerComponent from './components/PWAManager';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Initialize MirageJS server
if (process.env.NODE_ENV === 'development') {
  makeServer();
}

// Role-based routing component
import { useAuth } from './hooks/reduxHooks';
const RoleBasedRouter = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // simulate brief boot to allow persisted state rehydrate
    const t = setTimeout(() => setIsBooting(false), 100);
    return () => clearTimeout(t);
  }, []);

  if (authLoading || isBooting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <Suspense fallback={<div className="w-16 h-16 bg-white rounded-full animate-pulse" />}>
          <PageTransition3D isActive={true}>
            <div className="text-white text-center">
              <div className="text-2xl font-bold mb-4">Loading...</div>
              <div className="w-32 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          </PageTransition3D>
        </Suspense>
      </div>
    );
  }

  // If user is authenticated, route based on role
  if (user) {
    if (user.role === 'admin') {
      return <AdminApp />;
    } else {
      return <UserApp />;
    }
  }

  // If not authenticated, show auth form
  return <Auth3D />;
};

function App() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <Router>
              <div className="min-h-screen">
                {/* Role-based routing with 3D features */}
                <Suspense fallback={
                  <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold mb-4">Loading...</div>
                      <div className="w-32 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>
                }>
                  <RoleBasedRouter />
                </Suspense>
                
                {/* Global Widgets */}
                <ChatWidget />
                <GamificationWidget />
                <RealTimeNotifications />
                <PWAManagerComponent />
                
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
                />
              </div>
            </Router>
          </QueryClientProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default App;