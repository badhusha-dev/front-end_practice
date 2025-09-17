import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { 
  MdNotifications, 
  MdNotificationsActive, 
  MdClose, 
  MdSettings, 
  MdCheckCircle, 
  MdError, 
  MdInfo, 
  MdWarning,
  MdShoppingCart,
  MdFavorite,
  MdStar,
  MdLocalShipping,
  MdPayment,
  MdDiscount,
  MdSecurity,
  MdTrendingUp
} from 'react-icons/md';

// Notification Types
const NOTIFICATION_TYPES = {
  ORDER: 'order',
  CART: 'cart',
  WISHLIST: 'wishlist',
  REVIEW: 'review',
  SHIPPING: 'shipping',
  PAYMENT: 'payment',
  DISCOUNT: 'discount',
  SECURITY: 'security',
  TRENDING: 'trending',
  GENERAL: 'general'
};

// Notification Icons
const NOTIFICATION_ICONS = {
  [NOTIFICATION_TYPES.ORDER]: MdShoppingCart,
  [NOTIFICATION_TYPES.CART]: MdShoppingCart,
  [NOTIFICATION_TYPES.WISHLIST]: MdFavorite,
  [NOTIFICATION_TYPES.REVIEW]: MdStar,
  [NOTIFICATION_TYPES.SHIPPING]: MdLocalShipping,
  [NOTIFICATION_TYPES.PAYMENT]: MdPayment,
  [NOTIFICATION_TYPES.DISCOUNT]: MdDiscount,
  [NOTIFICATION_TYPES.SECURITY]: MdSecurity,
  [NOTIFICATION_TYPES.TRENDING]: MdTrendingUp,
  [NOTIFICATION_TYPES.GENERAL]: MdInfo
};

// Notification Severity Colors
const SEVERITY_COLORS = {
  success: 'text-green-600 bg-green-50 border-green-200',
  error: 'text-red-600 bg-red-50 border-red-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200'
};

// Individual Notification Component
const NotificationItem = ({ notification, onDismiss, onAction }) => {
  const [isVisible, setIsVisible] = useState(false);
  const IconComponent = NOTIFICATION_ICONS[notification.type] || MdInfo;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(notification.id), 300);
  };

  const handleAction = () => {
    if (notification.action) {
      onAction(notification);
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`p-4 rounded-lg border-l-4 shadow-lg mb-3 ${SEVERITY_COLORS[notification.severity]}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <IconComponent className="w-5 h-5 mt-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold mb-1">{notification.title}</h4>
              <p className="text-sm opacity-90 mb-2">{notification.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-75">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </span>
                {notification.action && (
                  <button
                    onClick={handleAction}
                    className="text-xs font-medium hover:underline"
                  >
                    {notification.actionText || 'View'}
                  </button>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors"
          >
            <MdClose className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Notification Settings Component
const NotificationSettings = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Enable Notifications</h3>
                <p className="text-sm text-gray-600">Receive real-time notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.enabled}
                  onChange={(e) => handleSettingChange('enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Order Updates</h3>
                <p className="text-sm text-gray-600">Get notified about order status</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.orderUpdates}
                  onChange={(e) => handleSettingChange('orderUpdates', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Price Drops</h3>
                <p className="text-sm text-gray-600">Alert when wishlist items go on sale</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.priceDrops}
                  onChange={(e) => handleSettingChange('priceDrops', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">New Products</h3>
                <p className="text-sm text-gray-600">Discover new arrivals</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.newProducts}
                  onChange={(e) => handleSettingChange('newProducts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Sound Notifications</h3>
                <p className="text-sm text-gray-600">Play sound for notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.soundEnabled}
                  onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSettingsChange(localSettings);
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Real-time Notifications Component
const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    enabled: true,
    orderUpdates: true,
    priceDrops: true,
    newProducts: false,
    soundEnabled: true
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationSoundRef = useRef(null);

  // Simulate real-time notifications
  useEffect(() => {
    if (!settings.enabled) return;

    const notificationTemplates = [
      {
        type: NOTIFICATION_TYPES.ORDER,
        title: 'Order Confirmed!',
        message: 'Your order #12345 has been confirmed and is being processed.',
        severity: 'success',
        action: () => console.log('View order'),
        actionText: 'Track Order'
      },
      {
        type: NOTIFICATION_TYPES.CART,
        title: 'Item Added to Cart',
        message: 'Wireless Headphones has been added to your cart.',
        severity: 'info',
        action: () => console.log('View cart'),
        actionText: 'View Cart'
      },
      {
        type: NOTIFICATION_TYPES.DISCOUNT,
        title: 'Special Offer!',
        message: 'Get 20% off on all electronics. Limited time offer!',
        severity: 'warning',
        action: () => console.log('View offer'),
        actionText: 'Shop Now'
      },
      {
        type: NOTIFICATION_TYPES.SHIPPING,
        title: 'Order Shipped',
        message: 'Your order #12345 has been shipped and will arrive tomorrow.',
        severity: 'info',
        action: () => console.log('Track shipment'),
        actionText: 'Track Shipment'
      },
      {
        type: NOTIFICATION_TYPES.TRENDING,
        title: 'Trending Product',
        message: 'Smart Watch is trending now with 95% positive reviews!',
        severity: 'info',
        action: () => console.log('View product'),
        actionText: 'View Product'
      }
    ];

    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
        const notification = {
          ...template,
          id: Date.now() + Math.random(),
          timestamp: new Date().toISOString(),
          read: false
        };

        setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep only 10 notifications
        setUnreadCount(prev => prev + 1);

        // Play notification sound
        if (settings.soundEnabled && notificationSoundRef.current) {
          notificationSoundRef.current.play().catch(() => {});
        }

        // Show toast notification
        toast.info(notification.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [settings.enabled, settings.soundEnabled]);

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleNotificationAction = (notification) => {
    if (notification.action) {
      notification.action();
    }
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <>
      {/* Notification Sound */}
      <audio ref={notificationSoundRef} preload="auto">
        <source src="/notification-sound.mp3" type="audio/mpeg" />
      </audio>

      {/* Notification Bell */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          {unreadCount > 0 ? (
            <MdNotificationsActive className="w-6 h-6 text-blue-600" />
          ) : (
            <MdNotifications className="w-6 h-6 text-gray-600" />
          )}
          
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notifications Panel */}
      {isOpen && (
        <div className="fixed top-16 right-4 w-80 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title="Settings"
                >
                  <MdSettings className="w-4 h-4" />
                </button>
                {notifications.length > 0 && (
                  <>
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Mark all read
                    </button>
                    <button
                      onClick={clearAllNotifications}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Clear all
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <MdNotifications className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No notifications yet</p>
                <p className="text-sm">We'll notify you when something important happens!</p>
              </div>
            ) : (
              <div className="p-4">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onDismiss={dismissNotification}
                    onAction={handleNotificationAction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <NotificationSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </>
  );
};

export default RealTimeNotifications;
