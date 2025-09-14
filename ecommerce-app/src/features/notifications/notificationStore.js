import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Notification Store for push notifications and alerts
export const useNotificationStore = create(
  persist(
    (set, get) => ({
      // Notification settings
      settings: {
        pushEnabled: false,
        emailEnabled: true,
        smsEnabled: false,
        orderUpdates: true,
        promotions: true,
        newProducts: true,
        priceDrops: true,
        recommendations: true
      },
      
      // Notification history
      notifications: [],
      unreadCount: 0,
      
      // Web push subscription
      subscription: null,
      isSupported: 'serviceWorker' in navigator && 'PushManager' in window,

      // Update settings
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }));
      },

      // Add notification
      addNotification: (notification) => {
        const newNotification = {
          id: Date.now().toString(),
          ...notification,
          timestamp: new Date().toISOString(),
          read: false
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(-100), // Keep last 100
          unreadCount: state.unreadCount + 1
        }));

        // Show browser notification if enabled
        if (get().settings.pushEnabled && notification.showBrowser) {
          get().showBrowserNotification(newNotification);
        }

        return newNotification;
      },

      // Mark notification as read
      markAsRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map(n => 
            n.id === notificationId ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
        }));
      },

      // Mark all as read
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0
        }));
      },

      // Remove notification
      removeNotification: (notificationId) => {
        set((state) => {
          const notification = state.notifications.find(n => n.id === notificationId);
          return {
            notifications: state.notifications.filter(n => n.id !== notificationId),
            unreadCount: notification && !notification.read 
              ? Math.max(0, state.unreadCount - 1) 
              : state.unreadCount
          };
        });
      },

      // Request push permission
      requestPermission: async () => {
        if (!get().isSupported) return false;

        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            set((state) => ({
              settings: { ...state.settings, pushEnabled: true }
            }));
            await get().subscribeToPush();
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error requesting notification permission:', error);
          return false;
        }
      },

      // Subscribe to push notifications
      subscribeToPush: async () => {
        if (!get().isSupported) return false;

        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: get().getVapidKey()
          });

          set({ subscription });
          
          // In a real app, you would send this subscription to your server
          console.log('Push subscription:', subscription);
          
          return true;
        } catch (error) {
          console.error('Error subscribing to push:', error);
          return false;
        }
      },

      // Get VAPID key (in a real app, this would come from your server)
      getVapidKey: () => {
        // This is a dummy key for demo purposes
        return 'BEl62iUYgUivxIkv69yViEuiBIa40HI8L7Lw0Ztq7hQJ6j0vK7J4l8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z5';
      },

      // Show browser notification
      showBrowserNotification: (notification) => {
        if (!get().settings.pushEnabled || Notification.permission !== 'granted') return;

        const browserNotification = new Notification(notification.title, {
          body: notification.message,
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
          tag: notification.id,
          data: notification.data
        });

        browserNotification.onclick = () => {
          window.focus();
          get().markAsRead(notification.id);
          browserNotification.close();
        };

        // Auto close after 5 seconds
        setTimeout(() => {
          browserNotification.close();
        }, 5000);
      },

      // Notification templates
      createOrderNotification: (orderData) => {
        return get().addNotification({
          type: 'order',
          title: 'Order Confirmed!',
          message: `Your order #${orderData.id} has been confirmed and will be processed soon.`,
          data: { orderId: orderData.id },
          showBrowser: true
        });
      },

      createShippingNotification: (orderData) => {
        return get().addNotification({
          type: 'shipping',
          title: 'Order Shipped!',
          message: `Your order #${orderData.id} has been shipped and is on its way!`,
          data: { orderId: orderData.id },
          showBrowser: true
        });
      },

      createPriceDropNotification: (product) => {
        return get().addNotification({
          type: 'price_drop',
          title: 'Price Drop Alert!',
          message: `${product.name} is now ${product.newPrice} (was ${product.oldPrice})`,
          data: { productId: product.id },
          showBrowser: true
        });
      },

      createPromotionNotification: (promo) => {
        return get().addNotification({
          type: 'promotion',
          title: 'Special Offer!',
          message: `${promo.title} - ${promo.description}`,
          data: { promotionId: promo.id },
          showBrowser: true
        });
      },

      createRecommendationNotification: (product) => {
        return get().addNotification({
          type: 'recommendation',
          title: 'Recommended for You',
          message: `Based on your interests, you might like ${product.name}`,
          data: { productId: product.id },
          showBrowser: false
        });
      },

      // Clear all notifications
      clearAllNotifications: () => {
        set({
          notifications: [],
          unreadCount: 0
        });
      },

      // Get notification by type
      getNotificationsByType: (type) => {
        return get().notifications.filter(n => n.type === type);
      },

      // Get unread notifications
      getUnreadNotifications: () => {
        return get().notifications.filter(n => !n.read);
      }
    }),
    {
      name: 'notification-storage',
      partialize: (state) => ({
        settings: state.settings,
        notifications: state.notifications.slice(-50), // Keep only recent notifications
        unreadCount: state.unreadCount
      })
    }
  )
);
