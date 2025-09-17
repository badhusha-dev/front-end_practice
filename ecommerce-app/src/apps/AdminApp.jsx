import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/reduxHooks';
import ProtectedRoute from '../components/ProtectedRoute';
import { logoutAsync } from '../features/auth/authSlice';
import { 
  MdDashboard, 
  MdInventory, 
  MdShoppingCart, 
  MdPeople, 
  MdAnalytics, 
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose
} from 'react-icons/md';

// Lazy load 3D components
const AnimatedBackground = lazy(() => import('../components/3D/AnimatedBackground'));
const PageTransition3D = lazy(() => import('../components/3D/PageTransition3D'));
const InteractiveLogo = lazy(() => import('../components/3D/InteractiveLogo'));
const Loading3D = lazy(() => import('../components/3D/Loading3D'));

// Import admin components
import AdminDashboard from '../features/admin/AdminDashboard';

// 3D Admin Sidebar Component
const AdminSidebar3D = ({ isOpen, onClose }) => {
  const { user, dispatch } = useAuth();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard, path: '/admin' },
    { id: 'products', label: 'Products', icon: MdInventory, path: '/admin/products' },
    { id: 'orders', label: 'Orders', icon: MdShoppingCart, path: '/admin/orders' },
    { id: 'customers', label: 'Customers', icon: MdPeople, path: '/admin/customers' },
    { id: 'analytics', label: 'Analytics', icon: MdAnalytics, path: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: MdSettings, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 
        shadow-2xl transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Suspense fallback={<div className="w-8 h-8 bg-white rounded" />}>
                <InteractiveLogo className="w-8 h-8 text-white" />
              </Suspense>
              <span className="text-white font-bold text-xl">Admin3D</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <p className="text-white font-medium">
                {user?.firstName || user?.name || 'Admin'}
              </p>
              <p className="text-gray-400 text-sm">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900 bg-opacity-20 rounded-lg transition-all duration-200 w-full group"
          >
            <MdLogout className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

// 3D Admin Header Component
const AdminHeader3D = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <MdMenu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Welcome back, Administrator
          </div>
        </div>
      </div>
    </header>
  );
};

// Enhanced 3D Admin Dashboard
const AdminDashboard3D = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <Suspense fallback={<div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse" />}>
          <Loading3D type="dna" />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Suspense fallback={<div className="h-64 bg-white rounded-lg animate-pulse" />}>
        <PageTransition3D isActive={false}>
          <AdminDashboard />
        </PageTransition3D>
      </Suspense>
    </div>
  );
};

// 3D Admin Layout
const AdminLayout3D = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <AnimatedBackground className="absolute inset-0 -z-10 opacity-20" />
      </Suspense>

      <div className="flex h-screen">
        {/* Sidebar */}
        <AdminSidebar3D isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Header */}
          <AdminHeader3D onMenuClick={() => setSidebarOpen(true)} />
          
          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            <Suspense fallback={<div className="h-64 bg-white animate-pulse" />}>
              <PageTransition3D isActive={false}>
                {children}
              </PageTransition3D>
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
};

// Main Admin App Component
const AdminApp = () => {
  return (
    <AdminLayout3D>
      <Routes>
        <Route path="/" element={<AdminDashboard3D />} />
        <Route path="/products" element={<div className="p-8"><h2 className="text-2xl font-bold">Products Management</h2></div>} />
        <Route path="/orders" element={<div className="p-8"><h2 className="text-2xl font-bold">Orders Management</h2></div>} />
        <Route path="/customers" element={<div className="p-8"><h2 className="text-2xl font-bold">Customers Management</h2></div>} />
        <Route path="/analytics" element={<div className="p-8"><h2 className="text-2xl font-bold">Analytics Dashboard</h2></div>} />
        <Route path="/settings" element={<div className="p-8"><h2 className="text-2xl font-bold">Settings</h2></div>} />
      </Routes>
    </AdminLayout3D>
  );
};

export default AdminApp;
