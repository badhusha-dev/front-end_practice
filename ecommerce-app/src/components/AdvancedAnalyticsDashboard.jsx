import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  MdTrendingUp, 
  MdTrendingDown, 
  MdShoppingCart, 
  MdPeople, 
  MdAttachMoney, 
  MdVisibility,
  MdRefresh,
  MdDownload,
  MdFilterList,
  MdDateRange,
  MdAnalytics,
  MdBarChart,
  MdPieChart,
  MdShowChart,
  MdClose
} from 'react-icons/md';

// Mock data for analytics
const generateMockData = () => {
  const salesData = [];
  const userData = [];
  const productData = [];
  const categoryData = [
    { name: 'Electronics', value: 35, color: '#8884d8' },
    { name: 'Clothing', value: 25, color: '#82ca9d' },
    { name: 'Home & Garden', value: 20, color: '#ffc658' },
    { name: 'Sports', value: 15, color: '#ff7300' },
    { name: 'Books', value: 5, color: '#00ff00' }
  ];

  // Generate sales data for last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    salesData.push({
      date: date.toISOString().split('T')[0],
      sales: Math.floor(Math.random() * 10000) + 5000,
      orders: Math.floor(Math.random() * 100) + 50,
      revenue: Math.floor(Math.random() * 50000) + 20000
    });
  }

  // Generate user data for last 12 months
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    userData.push({
      month: date.toLocaleString('default', { month: 'short' }),
      newUsers: Math.floor(Math.random() * 1000) + 500,
      activeUsers: Math.floor(Math.random() * 2000) + 1000,
      returningUsers: Math.floor(Math.random() * 800) + 400
    });
  }

  // Generate product performance data
  const products = ['iPhone 15', 'MacBook Pro', 'AirPods', 'iPad', 'Apple Watch', 'Samsung Galaxy', 'Dell Laptop', 'Sony Headphones'];
  products.forEach((product, index) => {
    productData.push({
      name: product,
      sales: Math.floor(Math.random() * 1000) + 100,
      revenue: Math.floor(Math.random() * 50000) + 10000,
      views: Math.floor(Math.random() * 5000) + 1000,
      conversion: Math.floor(Math.random() * 20) + 5
    });
  });

  return { salesData, userData, productData, categoryData };
};

// Metric Card Component
const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            {isPositive ? (
              <MdTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <MdTrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );
};

// Chart Component
const ChartCard = ({ title, children, onRefresh, onDownload }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRefresh}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Refresh"
          >
            <MdRefresh className="w-4 h-4" />
          </button>
          <button
            onClick={onDownload}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Download"
          >
            <MdDownload className="w-4 h-4" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

// Date Range Picker
const DateRangePicker = ({ value, onChange }) => {
  const ranges = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 3 months', value: '3m' },
    { label: 'Last year', value: '1y' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <MdDateRange className="w-5 h-5 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {ranges.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Main Analytics Dashboard Component
const AdvancedAnalyticsDashboard = ({ isOpen, onClose }) => {
  const [data, setData] = useState(null);
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, dateRange]);

  const loadData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(generateMockData());
      setLoading(false);
    }, 1000);
  };

  const handleRefresh = () => {
    loadData();
  };

  const handleDownload = (type) => {
    // Simulate download
    console.log(`Downloading ${type} data...`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: MdAnalytics },
    { id: 'sales', label: 'Sales', icon: MdShowChart },
    { id: 'users', label: 'Users', icon: MdPeople },
    { id: 'products', label: 'Products', icon: MdBarChart }
  ];

  if (!isOpen || !data) return null;

  const metrics = [
    {
      title: 'Total Sales',
      value: '$124,567',
      change: 12.5,
      icon: MdShoppingCart,
      color: 'blue'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: 8.2,
      icon: MdShoppingCart,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '5,678',
      change: -2.1,
      icon: MdPeople,
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: 15.7,
      icon: MdTrendingUp,
      color: 'orange'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <MdAnalytics className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Analytics Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                      <MetricCard key={index} {...metric} />
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChartCard
                      title="Sales Trend"
                      onRefresh={handleRefresh}
                      onDownload={() => handleDownload('sales')}
                    >
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data.salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard
                      title="Sales by Category"
                      onRefresh={handleRefresh}
                      onDownload={() => handleDownload('categories')}
                    >
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={data.categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {data.categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartCard>
                  </div>
                </div>
              )}

              {/* Sales Tab */}
              {activeTab === 'sales' && (
                <div className="space-y-6">
                  <ChartCard
                    title="Sales Performance"
                    onRefresh={handleRefresh}
                    onDownload={() => handleDownload('sales-performance')}
                  >
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={data.salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
                        <Line type="monotone" dataKey="revenue" stroke="#ffc658" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <ChartCard
                    title="User Growth"
                    onRefresh={handleRefresh}
                    onDownload={() => handleDownload('user-growth')}
                  >
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={data.userData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="newUsers" fill="#8884d8" />
                        <Bar dataKey="activeUsers" fill="#82ca9d" />
                        <Bar dataKey="returningUsers" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>
              )}

              {/* Products Tab */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <ChartCard
                    title="Product Performance"
                    onRefresh={handleRefresh}
                    onDownload={() => handleDownload('product-performance')}
                  >
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={data.productData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
