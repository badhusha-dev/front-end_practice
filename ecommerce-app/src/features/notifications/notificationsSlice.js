import { createSlice } from '@reduxjs/toolkit';

// Notifications slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    unreadCount: 0,
    settings: {
      enabled: true,
      orderUpdates: true,
      priceDrops: true,
      newProducts: false,
      soundEnabled: true,
    },
  },
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload,
      };
      
      state.items.unshift(notification);
      state.unreadCount += 1;
      
      // Keep only last 50 notifications
      if (state.items.length > 50) {
        state.items = state.items.slice(0, 50);
      }
    },
    
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.items.find(n => n.id === notificationId);
      
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    
    markAllAsRead: (state) => {
      state.items.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      const notification = state.items.find(n => n.id === notificationId);
      
      if (notification) {
        if (!notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.items = state.items.filter(n => n.id !== notificationId);
      }
    },
    
    clearAllNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    },
    
    updateNotificationSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

// Export actions
export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
  updateNotificationSettings,
} = notificationsSlice.actions;

// Selectors
export const selectNotifications = (state) => state.notifications.items;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectNotificationSettings = (state) => state.notifications.settings;

export default notificationsSlice.reducer;
