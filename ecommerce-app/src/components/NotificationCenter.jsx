import React, { useState } from 'react';
import { MdNotifications, MdNotificationsNone, MdClose, MdSettings, MdMarkAsUnread } from 'react-icons/md';
import { useNotificationStore } from '../features/notifications/notificationStore';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    notifications,
    unreadCount,
    settings,
    updateSettings,
    markAsRead,
    markAllAsRead,
    removeNotification,
    requestPermission
  } = useNotificationStore();

  const unreadNotifications = notifications.filter(n => !n.read);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return '🛍️';
      case 'shipping': return '🚚';
      case 'price_drop': return '💰';
      case 'promotion': return '🎉';
      case 'recommendation': return '⭐';
      default: return '📢';
    }
  };

  const handleEnablePush = async () => {
    const enabled = await requestPermission();
    if (enabled) {
      alert('Push notifications enabled successfully!');
    } else {
      alert('Failed to enable push notifications. Please check your browser settings.');
    }
  };

  return (
    <>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
        title="Notifications"
      >
        {unreadCount > 0 ? (
          <MdNotifications className="w-6 h-6" />
        ) : (
          <MdNotificationsNone className="w-6 h-6" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md h-5/6 overflow-hidden">
            {/* Header */}
            <div className="bg-primary-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MdNotifications className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white hover:text-gray-300 transition-colors"
                    title="Settings"
                  >
                    <MdSettings className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <MdClose className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <div className="mt-4 p-4 bg-primary-500 rounded-lg">
                  <h3 className="font-semibold mb-3">Notification Settings</h3>
                  <div className="space-y-2">
                    {Object.entries(settings).map(([key, value]) => (
                      <label key={key} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => updateSettings({ [key]: e.target.checked })}
                          className="rounded"
                        />
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                      </label>
                    ))}
                  </div>
                  {!settings.pushEnabled && (
                    <button
                      onClick={handleEnablePush}
                      className="mt-3 w-full bg-white text-primary-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Enable Push Notifications
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="p-4">
                  {/* Mark All Read Button */}
                  {unreadNotifications.length > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="w-full mb-4 flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <MdMarkAsUnread className="w-4 h-4" />
                      <span>Mark all as read</span>
                    </button>
                  )}

                  {/* Notification Items */}
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          notification.read 
                            ? 'bg-gray-50 border-gray-200' 
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">
                            {getNotificationIcon(notification.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-medium ${
                                notification.read ? 'text-gray-700' : 'text-gray-900'
                              }`}>
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                            <p className={`text-sm mt-1 ${
                              notification.read ? 'text-gray-600' : 'text-gray-700'
                            }`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-primary-600 hover:text-primary-700"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button
                                onClick={() => removeNotification(notification.id)}
                                className="text-xs text-red-600 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <MdNotificationsNone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                    <p className="text-gray-600">
                      You're all caught up! We'll notify you when something important happens.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationCenter;
