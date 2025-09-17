import React, { useState, useEffect } from 'react';
import { useSubscriptionStore } from './subscriptionStore';
import { 
  MdSubscriptions, 
  MdClose, 
  MdAdd, 
  MdEdit, 
  MdDelete,
  MdPause,
  MdPlayArrow,
  MdCalendarToday,
  MdLocalShipping,
  MdPayment,
  MdSettings,
  MdStar,
  MdTrendingUp,
  MdTrendingDown,
  MdCheckCircle,
  MdCancel,
  MdSchedule,
  MdNotifications,
  MdShoppingCart,
  MdFavorite,
  MdRefresh,
  MdInfo,
  MdWarning,
  MdDone
} from 'react-icons/md';
import { FiPackage, FiClock, FiDollarSign, FiUsers, FiBarChart } from 'react-icons/fi';

const SubscriptionWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  
  const {
    subscriptions,
    activeSubscriptions,
    plans,
    categories,
    preferences,
    deliverySchedule,
    nextDelivery,
    analytics,
    createSubscription,
    cancelSubscription,
    pauseSubscription,
    resumeSubscription,
    updateSubscriptionPreferences,
    getUpcomingDeliveries,
    getDeliveryHistory,
    getSubscriptionStats,
    generateMockSubscriptions,
    updateAnalytics
  } = useSubscriptionStore();

  const upcomingDeliveries = getUpcomingDeliveries();
  const deliveryHistory = getDeliveryHistory();

  useEffect(() => {
    if (isOpen && subscriptions.length === 0) {
      generateMockSubscriptions();
    }
  }, [isOpen, subscriptions.length, generateMockSubscriptions]);

  const handleCreateSubscription = () => {
    if (selectedPlan && selectedCategories.length > 0) {
      createSubscription(selectedPlan.id, selectedCategories.map(c => c.id), preferences);
      setShowCreateModal(false);
      setSelectedPlan(null);
      setSelectedCategories([]);
    }
  };

  const handleCancelSubscription = (subscriptionId) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      cancelSubscription(subscriptionId, 'User requested cancellation');
    }
  };

  const handlePauseSubscription = (subscriptionId) => {
    const pauseUntil = new Date();
    pauseUntil.setMonth(pauseUntil.getMonth() + 1);
    pauseSubscription(subscriptionId, pauseUntil.getTime());
  };

  const handleResumeSubscription = (subscriptionId) => {
    resumeSubscription(subscriptionId);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <MdCheckCircle className="w-4 h-4" />;
      case 'paused': return <MdPause className="w-4 h-4" />;
      case 'cancelled': return <MdCancel className="w-4 h-4" />;
      default: return <MdInfo className="w-4 h-4" />;
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-40 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <MdSubscriptions className="w-6 h-6" />
          <span className="hidden sm:block font-medium">Subscriptions</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <MdSubscriptions className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Subscription Service</h2>
              <p className="text-sm text-green-100">
                {activeSubscriptions.length} active subscriptions
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              title="Create Subscription"
            >
              <MdAdd className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: FiBarChart },
              { id: 'subscriptions', label: 'My Subscriptions', icon: MdSubscriptions },
              { id: 'deliveries', label: 'Deliveries', icon: MdLocalShipping },
              { id: 'plans', label: 'Plans', icon: MdPayment }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Subscriptions</p>
                      <p className="text-2xl font-bold text-green-600">{analytics.activeSubscriptions}</p>
                    </div>
                    <MdSubscriptions className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(analytics.monthlyRevenue)}</p>
                    </div>
                    <FiDollarSign className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Order Value</p>
                      <p className="text-2xl font-bold text-purple-600">{formatCurrency(analytics.averageOrderValue)}</p>
                    </div>
                    <FiBarChart className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Customer LTV</p>
                      <p className="text-2xl font-bold text-yellow-600">{formatCurrency(analytics.customerLifetimeValue)}</p>
                    </div>
                    <FiUsers className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Next Delivery */}
              {nextDelivery && (
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Delivery</h3>
                      <p className="text-gray-700 mb-1">
                        Scheduled for <strong>{formatDate(nextDelivery)}</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                        {Math.ceil((nextDelivery - Date.now()) / (24 * 60 * 60 * 1000))} days remaining
                      </p>
                    </div>
                    <div className="text-right">
                      <MdLocalShipping className="w-12 h-12 text-green-600 mx-auto mb-2" />
                      <button
                        onClick={() => setShowDeliveryModal(true)}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Track Delivery
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {deliveryHistory.slice(0, 3).map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <MdCheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Delivery Completed</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(delivery.actualDelivery)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {delivery.products?.length || 0} items
                        </p>
                        <p className="text-xs text-gray-500">
                          {delivery.trackingNumber}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">My Subscriptions</h3>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MdAdd className="w-4 h-4 mr-2" />
                  New Subscription
                </button>
              </div>
              
              <div className="space-y-4">
                {subscriptions.map((subscription) => {
                  const stats = getSubscriptionStats(subscription.id);
                  return (
                    <div key={subscription.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {subscription.plan.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{subscription.plan.name}</h4>
                            <p className="text-sm text-gray-600">{subscription.plan.description}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                                <span className="flex items-center space-x-1">
                                  {getStatusIcon(subscription.status)}
                                  <span className="capitalize">{subscription.status}</span>
                                </span>
                              </span>
                              {subscription.plan.popular && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(subscription.plan.price)}
                          </p>
                          <p className="text-sm text-gray-500">per {subscription.plan.interval}</p>
                          {subscription.plan.discount > 0 && (
                            <p className="text-sm text-green-600 font-medium">
                              {subscription.plan.discount}% off
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Categories</h5>
                        <div className="flex flex-wrap gap-2">
                          {subscription.categories.map((category) => (
                            <span
                              key={category.id}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {category.icon} {category.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{stats.totalDeliveries}</p>
                          <p className="text-sm text-gray-500">Deliveries</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalSpent)}</p>
                          <p className="text-sm text-gray-500">Total Spent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{stats.daysActive}</p>
                          <p className="text-sm text-gray-500">Days Active</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <MdStar className="w-4 h-4 text-yellow-400" />
                            <span className="text-2xl font-bold text-gray-900">{subscription.rating}</span>
                          </div>
                          <p className="text-sm text-gray-500">Rating</p>
                        </div>
                      </div>

                      {/* Next Delivery */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900">Next Delivery</h5>
                            <p className="text-sm text-gray-600">
                              {formatDate(subscription.nextDelivery)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              {Math.ceil((subscription.nextDelivery - Date.now()) / (24 * 60 * 60 * 1000))} days
                            </p>
                            <button
                              onClick={() => {
                                setSelectedSubscription(subscription);
                                setShowDeliveryModal(true);
                              }}
                              className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                              Track
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedSubscription(subscription)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            title="Edit Subscription"
                          >
                            <MdEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedSubscription(subscription)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            title="Settings"
                          >
                            <MdSettings className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {subscription.status === 'active' ? (
                            <>
                              <button
                                onClick={() => handlePauseSubscription(subscription.id)}
                                className="px-4 py-2 border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors"
                              >
                                <MdPause className="w-4 h-4 mr-1" />
                                Pause
                              </button>
                              <button
                                onClick={() => handleCancelSubscription(subscription.id)}
                                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          ) : subscription.status === 'paused' ? (
                            <button
                              onClick={() => handleResumeSubscription(subscription.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <MdPlayArrow className="w-4 h-4 mr-1" />
                              Resume
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Deliveries Tab */}
          {activeTab === 'deliveries' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Schedule</h3>
              
              {/* Upcoming Deliveries */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Upcoming Deliveries</h4>
                <div className="space-y-3">
                  {upcomingDeliveries.map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <MdSchedule className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Scheduled Delivery</p>
                          <p className="text-sm text-gray-600">
                            {formatDate(delivery.scheduledDate)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {delivery.products?.length || 0} items
                        </p>
                        <p className="text-xs text-gray-500">
                          {Math.ceil((delivery.scheduledDate - Date.now()) / (24 * 60 * 60 * 1000))} days
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery History */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Delivery History</h4>
                <div className="space-y-3">
                  {deliveryHistory.map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <MdCheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Delivered</p>
                          <p className="text-sm text-gray-600">
                            {formatDate(delivery.actualDelivery)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {delivery.products?.length || 0} items
                        </p>
                        <p className="text-xs text-gray-500">
                          {delivery.trackingNumber}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Plans Tab */}
          {activeTab === 'plans' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Subscription Plans</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow ${
                      plan.popular ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="text-center mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h4>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{formatCurrency(plan.price)}</span>
                        <span className="text-gray-500">/{plan.interval}</span>
                      </div>
                      {plan.discount > 0 && (
                        <p className="text-sm text-green-600 font-medium">
                          Save {plan.discount}% on your first order
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <MdCheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedPlan(plan);
                        setShowPlanModal(true);
                      }}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        plan.popular
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Create Subscription Modal */}
        {showCreateModal && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Create New Subscription</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <MdClose className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Choose a Plan</label>
                  <div className="space-y-2">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan)}
                        className={`w-full p-3 text-left border rounded-lg transition-colors ${
                          selectedPlan?.id === plan.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{plan.name}</h4>
                            <p className="text-sm text-gray-600">{formatCurrency(plan.price)}/{plan.interval}</p>
                          </div>
                          {plan.popular && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Select Categories</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          if (selectedCategories.find(c => c.id === category.id)) {
                            setSelectedCategories(selectedCategories.filter(c => c.id !== category.id));
                          } else {
                            setSelectedCategories([...selectedCategories, category]);
                          }
                        }}
                        className={`p-3 text-left border rounded-lg transition-colors ${
                          selectedCategories.find(c => c.id === category.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{category.icon}</span>
                          <div>
                            <h5 className="font-medium text-gray-900">{category.name}</h5>
                            <p className="text-xs text-gray-500">{category.subscribers} subscribers</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateSubscription}
                    disabled={!selectedPlan || selectedCategories.length === 0}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Create Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionWidget;
