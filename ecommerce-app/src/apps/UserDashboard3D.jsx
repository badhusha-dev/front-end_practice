import React, { Suspense, lazy, useState } from 'react';
import { useAuth } from '../hooks/reduxHooks';
import { useQuery } from '@tanstack/react-query';
import { 
  MdShoppingCart, 
  MdFavorite, 
  MdHistory, 
  MdAccountCircle,
  MdSettings,
  MdNotifications,
  MdTrendingUp,
  MdStar,
  MdLocalShipping,
  MdPayment,
  MdSecurity
} from 'react-icons/md';
import { productsAPI, ordersAPI } from '../api/api';

// Lazy load 3D components
const AnimatedBackground = lazy(() => import('../components/3D/AnimatedBackground'));
const PageTransition3D = lazy(() => import('../components/3D/PageTransition3D'));
const InteractiveLogo = lazy(() => import('../components/3D/InteractiveLogo'));
const Loading3D = lazy(() => import('../components/3D/Loading3D'));
import { IconButton3D, Card3D } from '../components/3D/InteractiveButton3D';

// 3D Stats Card Component
const StatsCard3D = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <Card3D className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card3D>
  );
};

// 3D Quick Actions Component
const QuickActions3D = () => {
  const actions = [
    { icon: MdShoppingCart, label: 'Continue Shopping', href: '/products', color: 'blue' },
    { icon: MdFavorite, label: 'View Wishlist', href: '/wishlist', color: 'red' },
    { icon: MdHistory, label: 'Order History', href: '/orders', color: 'green' },
    { icon: MdAccountCircle, label: 'Profile Settings', href: '/profile', color: 'purple' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Suspense key={index} fallback={<div className="h-20 bg-gray-200 rounded-lg animate-pulse" />}>
            <Card3D className="p-4 text-center hover:scale-105 transition-all duration-300">
              <div className={`w-12 h-12 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-900">{action.label}</p>
            </Card3D>
          </Suspense>
        );
      })}
    </div>
  );
};

// 3D Recent Orders Component
const RecentOrders3D = ({ orders }) => {
  return (
    <Card3D className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <a href="/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </a>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <MdShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No orders yet</p>
          <a href="/products" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.slice(0, 3).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-medium text-gray-900">Order #{order.id}</p>
                <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card3D>
  );
};

// 3D Recommendations Component
const Recommendations3D = ({ products }) => {
  return (
    <Card3D className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recommended for You</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{product.name}</p>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <MdStar
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({product.reviews})</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </Card3D>
  );
};

// Main 3D User Dashboard Component
const UserDashboard3D = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch user data
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['user-orders'],
    queryFn: () => ordersAPI.getAll(),
    select: (response) => response.data.orders.filter(order => order.userId === user?.id),
  });

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['recommended-products'],
    queryFn: () => productsAPI.getAll(),
    select: (response) => response.data.products.slice(0, 8),
  });

  const orders = ordersData || [];
  const products = productsData || [];

  // Calculate stats
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter(order => order.status === 'completed').length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: MdTrendingUp },
    { id: 'orders', label: 'Orders', icon: MdHistory },
    { id: 'wishlist', label: 'Wishlist', icon: MdFavorite },
    { id: 'settings', label: 'Settings', icon: MdSettings },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName || user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your account</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard3D
          icon={MdShoppingCart}
          title="Total Orders"
          value={totalOrders}
          subtitle="All time"
          color="blue"
        />
        <StatsCard3D
          icon={MdPayment}
          title="Total Spent"
          value={`$${totalSpent.toFixed(2)}`}
          subtitle="Lifetime value"
          color="green"
        />
        <StatsCard3D
          icon={MdStar}
          title="Completed Orders"
          value={completedOrders}
          subtitle="Success rate"
          color="purple"
        />
        <StatsCard3D
          icon={MdFavorite}
          title="Wishlist Items"
          value="0"
          subtitle="Saved for later"
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <QuickActions3D />
      </div>

      {/* Recent Orders and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentOrders3D orders={orders} />
        <Recommendations3D products={products} />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'orders':
        return <div className="text-center py-8"><h2 className="text-2xl font-bold">Order History</h2></div>;
      case 'wishlist':
        return <div className="text-center py-8"><h2 className="text-2xl font-bold">Wishlist</h2></div>;
      case 'settings':
        return <div className="text-center py-8"><h2 className="text-2xl font-bold">Settings</h2></div>;
      default:
        return renderOverview();
    }
  };

  if (ordersLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <Suspense fallback={<div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse" />}>
          <Loading3D type="dna" />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <AnimatedBackground className="absolute inset-0 -z-10 opacity-20" />
      </Suspense>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Suspense fallback={<div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse" />}>
              <InteractiveLogo className="w-8 h-8 text-blue-600" />
            </Suspense>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <Suspense fallback={<div className="h-64 bg-white rounded-lg animate-pulse" />}>
          <PageTransition3D isActive={false}>
            {renderContent()}
          </PageTransition3D>
        </Suspense>
      </div>
    </div>
  );
};

export default UserDashboard3D;
