import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Analytics Store for tracking user behavior and generating insights
export const useAnalyticsStore = create(
  persist(
    (set, get) => ({
      // Data collection
      pageViews: [],
      userActions: [],
      productInteractions: [],
      salesData: [],
      userMetrics: {},
      
      // Analytics methods
      trackPageView: (page, duration = 0) => {
        const pageView = {
          page,
          duration,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        };
        
        set((state) => ({
          pageViews: [...state.pageViews, pageView].slice(-1000) // Keep last 1000
        }));
      },

      trackUserAction: (action, data = {}) => {
        const userAction = {
          action,
          data,
          timestamp: new Date().toISOString(),
          page: window.location.pathname
        };
        
        set((state) => ({
          userActions: [...state.userActions, userAction].slice(-1000)
        }));
      },

      trackProductInteraction: (productId, interaction, data = {}) => {
        const interaction_record = {
          productId,
          interaction, // 'view', 'click', 'add_to_cart', 'purchase', etc.
          data,
          timestamp: new Date().toISOString()
        };
        
        set((state) => ({
          productInteractions: [...state.productInteractions, interaction_record].slice(-1000)
        }));
      },

      // Analytics calculations
      getPageViewStats: () => {
        const { pageViews } = get();
        
        const stats = pageViews.reduce((acc, view) => {
          if (!acc[view.page]) {
            acc[view.page] = { views: 0, totalDuration: 0 };
          }
          acc[view.page].views++;
          acc[view.page].totalDuration += view.duration;
          return acc;
        }, {});

        return Object.entries(stats).map(([page, data]) => ({
          page,
          views: data.views,
          avgDuration: data.totalDuration / data.views,
          bounceRate: 0 // Would need more data to calculate
        })).sort((a, b) => b.views - a.views);
      },

      getPopularProducts: () => {
        const { productInteractions } = get();
        
        const productStats = productInteractions.reduce((acc, interaction) => {
          if (!acc[interaction.productId]) {
            acc[interaction.productId] = {
              views: 0,
              clicks: 0,
              addToCart: 0,
              purchases: 0
            };
          }
          
          switch (interaction.interaction) {
            case 'view':
              acc[interaction.productId].views++;
              break;
            case 'click':
              acc[interaction.productId].clicks++;
              break;
            case 'add_to_cart':
              acc[interaction.productId].addToCart++;
              break;
            case 'purchase':
              acc[interaction.productId].purchases++;
              break;
          }
          
          return acc;
        }, {});

        return Object.entries(productStats).map(([productId, stats]) => ({
          productId,
          ...stats,
          conversionRate: stats.purchases / stats.views || 0
        })).sort((a, b) => b.views - a.views);
      },

      getUserBehaviorInsights: () => {
        const { userActions, pageViews } = get();
        
        const insights = {
          totalPageViews: pageViews.length,
          uniquePages: new Set(pageViews.map(p => p.page)).size,
          avgSessionDuration: pageViews.reduce((sum, p) => sum + p.duration, 0) / pageViews.length || 0,
          mostCommonActions: {},
          userJourney: []
        };

        // Analyze user actions
        userActions.forEach(action => {
          insights.mostCommonActions[action.action] = 
            (insights.mostCommonActions[action.action] || 0) + 1;
        });

        // Create user journey
        const journey = pageViews
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .map(p => ({ page: p.page, timestamp: p.timestamp }));
        
        insights.userJourney = journey;

        return insights;
      },

      getSalesAnalytics: () => {
        const { salesData } = get();
        
        if (salesData.length === 0) {
          return {
            totalRevenue: 0,
            totalOrders: 0,
            avgOrderValue: 0,
            revenueByDay: [],
            topSellingProducts: []
          };
        }

        const totalRevenue = salesData.reduce((sum, sale) => sum + sale.amount, 0);
        const totalOrders = salesData.length;
        const avgOrderValue = totalRevenue / totalOrders;

        // Revenue by day
        const revenueByDay = salesData.reduce((acc, sale) => {
          const day = new Date(sale.timestamp).toDateString();
          if (!acc[day]) acc[day] = 0;
          acc[day] += sale.amount;
          return acc;
        }, {});

        return {
          totalRevenue,
          totalOrders,
          avgOrderValue,
          revenueByDay: Object.entries(revenueByDay).map(([day, revenue]) => ({ day, revenue })),
          topSellingProducts: [] // Would need product data
        };
      },

      // Real-time metrics
      getRealTimeMetrics: () => {
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        
        const recentPageViews = get().pageViews.filter(p => 
          new Date(p.timestamp) > oneHourAgo
        );
        
        const recentActions = get().userActions.filter(a => 
          new Date(a.timestamp) > oneHourAgo
        );

        return {
          activeUsers: recentPageViews.length,
          pageViewsLastHour: recentPageViews.length,
          actionsLastHour: recentActions.length,
          currentTime: now.toISOString()
        };
      },

      // Clear all data
      clearAllData: () => {
        set({
          pageViews: [],
          userActions: [],
          productInteractions: [],
          salesData: [],
          userMetrics: {}
        });
      }
    }),
    {
      name: 'analytics-storage',
      partialize: (state) => ({
        pageViews: state.pageViews.slice(-100), // Keep only recent data
        userActions: state.userActions.slice(-100),
        productInteractions: state.productInteractions.slice(-100)
      })
    }
  )
);
