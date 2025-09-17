import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSubscriptionStore = create(
  persist(
    (set, get) => ({
      // Subscription state
      subscriptions: [],
      activeSubscriptions: [],
      cancelledSubscriptions: [],
      
      // Subscription plans
      plans: [
        {
          id: 'basic',
          name: 'Basic Subscription',
          description: 'Essential products delivered monthly',
          price: 29.99,
          interval: 'monthly',
          features: [
            '3-5 curated products',
            'Free shipping',
            'Cancel anytime',
            'Basic customer support'
          ],
          discount: 0,
          popular: false
        },
        {
          id: 'premium',
          name: 'Premium Subscription',
          description: 'Premium products with exclusive access',
          price: 49.99,
          interval: 'monthly',
          features: [
            '5-7 premium products',
            'Free shipping',
            'Exclusive early access',
            'Priority customer support',
            'Personal shopper consultation',
            'Cancel anytime'
          ],
          discount: 10,
          popular: true
        },
        {
          id: 'luxury',
          name: 'Luxury Subscription',
          description: 'High-end products and VIP treatment',
          price: 99.99,
          interval: 'monthly',
          features: [
            '7-10 luxury products',
            'Free express shipping',
            'VIP early access',
            '24/7 concierge service',
            'Personal stylist',
            'Exclusive events access',
            'Cancel anytime'
          ],
          discount: 15,
          popular: false
        }
      ],
      
      // Subscription categories
      categories: [
        {
          id: 'beauty',
          name: 'Beauty & Skincare',
          description: 'Curated beauty products and skincare essentials',
          icon: '💄',
          products: 150,
          subscribers: 2500
        },
        {
          id: 'fashion',
          name: 'Fashion & Accessories',
          description: 'Trendy clothing and stylish accessories',
          icon: '👗',
          products: 300,
          subscribers: 3200
        },
        {
          id: 'home',
          name: 'Home & Lifestyle',
          description: 'Home decor and lifestyle products',
          icon: '🏠',
          products: 200,
          subscribers: 1800
        },
        {
          id: 'tech',
          name: 'Tech & Gadgets',
          description: 'Latest technology and innovative gadgets',
          icon: '📱',
          products: 100,
          subscribers: 1200
        },
        {
          id: 'fitness',
          name: 'Fitness & Wellness',
          description: 'Health and fitness related products',
          icon: '💪',
          products: 80,
          subscribers: 900
        },
        {
          id: 'food',
          name: 'Food & Beverages',
          description: 'Gourmet foods and specialty beverages',
          icon: '🍽️',
          products: 120,
          subscribers: 1500
        }
      ],
      
      // User preferences
      preferences: {
        categories: [],
        priceRange: { min: 0, max: 200 },
        frequency: 'monthly', // monthly, bi-weekly, weekly
        deliveryDay: 15, // day of month
        deliveryTime: 'morning', // morning, afternoon, evening
        notifications: {
          deliveryReminder: true,
          newProducts: true,
          subscriptionUpdates: true,
          promotions: true
        }
      },
      
      // Delivery schedule
      deliverySchedule: [],
      nextDelivery: null,
      
      // Subscription analytics
      analytics: {
        totalSubscriptions: 0,
        activeSubscriptions: 0,
        monthlyRevenue: 0,
        averageOrderValue: 0,
        churnRate: 0,
        customerLifetimeValue: 0
      },
      
      // Actions
      createSubscription: (planId, categoryIds, preferences) => {
        const plan = get().plans.find(p => p.id === planId);
        const categories = get().categories.filter(c => categoryIds.includes(c.id));
        
        const subscription = {
          id: Date.now(),
          planId,
          plan: plan,
          categories: categories,
          preferences: preferences || get().preferences,
          status: 'active',
          startDate: Date.now(),
          nextDelivery: get().calculateNextDelivery(preferences?.frequency || 'monthly'),
          totalDeliveries: 0,
          totalSpent: 0,
          paymentMethod: 'card', // Mock payment method
          billingAddress: null,
          shippingAddress: null,
          customizations: [],
          reviews: [],
          rating: 0
        };
        
        set(state => ({
          subscriptions: [subscription, ...state.subscriptions],
          activeSubscriptions: [subscription, ...state.activeSubscriptions]
        }));
        
        get().updateAnalytics();
        get().scheduleNextDelivery(subscription);
        
        return subscription;
      },
      
      cancelSubscription: (subscriptionId, reason) => {
        set(state => ({
          subscriptions: state.subscriptions.map(sub => 
            sub.id === subscriptionId 
              ? { ...sub, status: 'cancelled', cancellationDate: Date.now(), cancellationReason: reason }
              : sub
          ),
          activeSubscriptions: state.activeSubscriptions.filter(sub => sub.id !== subscriptionId),
          cancelledSubscriptions: [
            ...state.cancelledSubscriptions,
            state.subscriptions.find(sub => sub.id === subscriptionId)
          ]
        }));
        
        get().updateAnalytics();
      },
      
      pauseSubscription: (subscriptionId, pauseUntil) => {
        set(state => ({
          subscriptions: state.subscriptions.map(sub => 
            sub.id === subscriptionId 
              ? { ...sub, status: 'paused', pauseUntil }
              : sub
          )
        }));
      },
      
      resumeSubscription: (subscriptionId) => {
        set(state => ({
          subscriptions: state.subscriptions.map(sub => 
            sub.id === subscriptionId 
              ? { 
                  ...sub, 
                  status: 'active', 
                  pauseUntil: null,
                  nextDelivery: get().calculateNextDelivery(sub.preferences.frequency)
                }
              : sub
          )
        }));
      },
      
      updateSubscriptionPreferences: (subscriptionId, preferences) => {
        set(state => ({
          subscriptions: state.subscriptions.map(sub => 
            sub.id === subscriptionId 
              ? { ...sub, preferences: { ...sub.preferences, ...preferences } }
              : sub
          )
        }));
      },
      
      addCustomization: (subscriptionId, customization) => {
        set(state => ({
          subscriptions: state.subscriptions.map(sub => 
            sub.id === subscriptionId 
              ? { ...sub, customizations: [...sub.customizations, customization] }
              : sub
          )
        }));
      },
      
      removeCustomization: (subscriptionId, customizationId) => {
        set(state => ({
          subscriptions: state.subscriptions.map(sub => 
            sub.id === subscriptionId 
              ? { 
                  ...sub, 
                  customizations: sub.customizations.filter(c => c.id !== customizationId) 
                }
              : sub
          )
        }));
      },
      
      calculateNextDelivery: (frequency) => {
        const now = new Date();
        const nextDelivery = new Date(now);
        
        switch (frequency) {
          case 'weekly':
            nextDelivery.setDate(now.getDate() + 7);
            break;
          case 'bi-weekly':
            nextDelivery.setDate(now.getDate() + 14);
            break;
          case 'monthly':
          default:
            nextDelivery.setMonth(now.getMonth() + 1);
            break;
        }
        
        return nextDelivery.getTime();
      },
      
      scheduleNextDelivery: (subscription) => {
        const delivery = {
          id: Date.now(),
          subscriptionId: subscription.id,
          scheduledDate: subscription.nextDelivery,
          status: 'scheduled',
          products: [],
          trackingNumber: null,
          estimatedDelivery: null,
          actualDelivery: null
        };
        
        set(state => ({
          deliverySchedule: [...state.deliverySchedule, delivery]
        }));
      },
      
      processDelivery: (deliveryId, products, trackingNumber) => {
        set(state => ({
          deliverySchedule: state.deliverySchedule.map(delivery => 
            delivery.id === deliveryId 
              ? { 
                  ...delivery, 
                  status: 'shipped',
                  products,
                  trackingNumber,
                  estimatedDelivery: Date.now() + (3 * 24 * 60 * 60 * 1000) // 3 days
                }
              : delivery
          )
        }));
      },
      
      markDelivered: (deliveryId) => {
        set(state => ({
          deliverySchedule: state.deliverySchedule.map(delivery => 
            delivery.id === deliveryId 
              ? { ...delivery, status: 'delivered', actualDelivery: Date.now() }
              : delivery
          ),
          subscriptions: state.subscriptions.map(sub => {
            const delivery = state.deliverySchedule.find(d => d.id === deliveryId);
            if (delivery && delivery.subscriptionId === sub.id) {
              return {
                ...sub,
                totalDeliveries: sub.totalDeliveries + 1,
                totalSpent: sub.totalSpent + sub.plan.price,
                nextDelivery: get().calculateNextDelivery(sub.preferences.frequency)
              };
            }
            return sub;
          })
        }));
        
        get().updateAnalytics();
      },
      
      updateAnalytics: () => {
        const { subscriptions, activeSubscriptions } = get();
        
        const analytics = {
          totalSubscriptions: subscriptions.length,
          activeSubscriptions: activeSubscriptions.length,
          monthlyRevenue: activeSubscriptions.reduce((sum, sub) => sum + sub.plan.price, 0),
          averageOrderValue: subscriptions.length > 0 
            ? subscriptions.reduce((sum, sub) => sum + sub.totalSpent, 0) / subscriptions.length 
            : 0,
          churnRate: subscriptions.length > 0 
            ? (subscriptions.filter(sub => sub.status === 'cancelled').length / subscriptions.length) * 100 
            : 0,
          customerLifetimeValue: subscriptions.length > 0 
            ? subscriptions.reduce((sum, sub) => sum + sub.totalSpent, 0) / subscriptions.length 
            : 0
        };
        
        set({ analytics });
      },
      
      getUpcomingDeliveries: () => {
        const { deliverySchedule } = get();
        const now = Date.now();
        
        return deliverySchedule
          .filter(delivery => delivery.scheduledDate > now)
          .sort((a, b) => a.scheduledDate - b.scheduledDate);
      },
      
      getDeliveryHistory: () => {
        const { deliverySchedule } = get();
        
        return deliverySchedule
          .filter(delivery => delivery.status === 'delivered')
          .sort((a, b) => b.actualDelivery - a.actualDelivery);
      },
      
      getSubscriptionStats: (subscriptionId) => {
        const subscription = get().subscriptions.find(sub => sub.id === subscriptionId);
        if (!subscription) return null;
        
        const deliveries = get().deliverySchedule.filter(d => d.subscriptionId === subscriptionId);
        
        return {
          totalDeliveries: deliveries.length,
          totalSpent: subscription.totalSpent,
          averageDeliveryValue: subscription.totalSpent / Math.max(deliveries.length, 1),
          nextDelivery: subscription.nextDelivery,
          daysActive: Math.floor((Date.now() - subscription.startDate) / (24 * 60 * 60 * 1000)),
          satisfaction: subscription.rating
        };
      },
      
      // Mock data generation
      generateMockSubscriptions: () => {
        const mockSubscriptions = [
          {
            id: 1,
            planId: 'premium',
            plan: get().plans.find(p => p.id === 'premium'),
            categories: [get().categories[0], get().categories[1]], // Beauty & Fashion
            preferences: {
              frequency: 'monthly',
              deliveryDay: 15,
              deliveryTime: 'morning',
              priceRange: { min: 0, max: 100 }
            },
            status: 'active',
            startDate: Date.now() - (90 * 24 * 60 * 60 * 1000), // 90 days ago
            nextDelivery: Date.now() + (15 * 24 * 60 * 60 * 1000), // 15 days from now
            totalDeliveries: 3,
            totalSpent: 149.97,
            paymentMethod: 'card',
            rating: 4.8
          },
          {
            id: 2,
            planId: 'basic',
            plan: get().plans.find(p => p.id === 'basic'),
            categories: [get().categories[2]], // Home
            preferences: {
              frequency: 'monthly',
              deliveryDay: 1,
              deliveryTime: 'afternoon',
              priceRange: { min: 0, max: 50 }
            },
            status: 'active',
            startDate: Date.now() - (60 * 24 * 60 * 60 * 1000), // 60 days ago
            nextDelivery: Date.now() + (5 * 24 * 60 * 60 * 1000), // 5 days from now
            totalDeliveries: 2,
            totalSpent: 59.98,
            paymentMethod: 'card',
            rating: 4.5
          }
        ];
        
        set({
          subscriptions: mockSubscriptions,
          activeSubscriptions: mockSubscriptions,
          nextDelivery: mockSubscriptions[0].nextDelivery
        });
        
        get().updateAnalytics();
      }
    }),
    {
      name: 'subscription-store',
      partialize: (state) => ({
        subscriptions: state.subscriptions,
        preferences: state.preferences,
        deliverySchedule: state.deliverySchedule
      })
    }
  )
);

export { useSubscriptionStore };
