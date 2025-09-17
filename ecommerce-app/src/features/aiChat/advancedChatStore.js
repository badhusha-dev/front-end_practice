import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAdvancedChatStore = create(
  persist(
    (set, get) => ({
      // Chat state
      isOpen: false,
      isConnected: false,
      isTyping: false,
      currentAgent: null,
      
      // Messages
      messages: [],
      conversationHistory: [],
      unreadCount: 0,
      
      // AI capabilities
      aiMode: 'assistant', // assistant, shopping, technical, general
      context: {
        userPreferences: {},
        currentPage: null,
        cartItems: [],
        recentSearches: [],
        browsingHistory: []
      },
      
      // Product recommendations
      recommendedProducts: [],
      productSuggestions: [],
      
      // Chat features
      quickReplies: [
        "Help me find products",
        "Track my order",
        "Return policy",
        "Technical support",
        "Account issues"
      ],
      
      // Actions
      toggleChat: () => {
        set(state => ({ 
          isOpen: !state.isOpen,
          unreadCount: state.isOpen ? state.unreadCount : 0
        }));
        
        if (!get().isOpen) {
          get().connect();
        }
      },
      
      connect: () => {
        set({ 
          isConnected: true,
          currentAgent: {
            id: 'ai-assistant',
            name: 'AI Assistant',
            avatar: '/api/placeholder/100/100',
            status: 'online',
            capabilities: ['product-recommendations', 'order-support', 'technical-help', 'general-chat']
          }
        });
        
        // Initialize with welcome message
        if (get().messages.length === 0) {
          get().addMessage({
            id: Date.now(),
            sender: 'agent',
            message: "Hello! I'm your AI shopping assistant. I can help you find products, answer questions, track orders, and much more. How can I assist you today?",
            timestamp: Date.now(),
            type: 'text',
            suggestions: get().quickReplies.slice(0, 3)
          });
        }
      },
      
      disconnect: () => {
        set({ 
          isConnected: false,
          currentAgent: null,
          isTyping: false
        });
      },
      
      addMessage: (message) => {
        set(state => ({
          messages: [...state.messages, message],
          conversationHistory: [...state.conversationHistory, message]
        }));
      },
      
      sendMessage: async (messageText, sender = 'user') => {
        const message = {
          id: Date.now(),
          sender,
          message: messageText,
          timestamp: Date.now(),
          type: 'text'
        };
        
        get().addMessage(message);
        
        if (sender === 'user') {
          // Simulate AI processing
          set({ isTyping: true });
          
          setTimeout(() => {
            get().generateAIResponse(messageText);
          }, 1000 + Math.random() * 2000);
        }
      },
      
      generateAIResponse: async (userMessage) => {
        const { context, aiMode } = get();
        const response = await get().processUserMessage(userMessage, context, aiMode);
        
        const aiMessage = {
          id: Date.now(),
          sender: 'agent',
          message: response.text,
          timestamp: Date.now(),
          type: response.type || 'text',
          suggestions: response.suggestions || [],
          products: response.products || [],
          actions: response.actions || []
        };
        
        get().addMessage(aiMessage);
        set({ isTyping: false });
      },
      
      processUserMessage: async (message, context, mode) => {
        const messageLower = message.toLowerCase();
        
        // Product search and recommendations
        if (messageLower.includes('find') || messageLower.includes('search') || messageLower.includes('looking for')) {
          return get().handleProductSearch(message, context);
        }
        
        // Order tracking
        if (messageLower.includes('track') || messageLower.includes('order') || messageLower.includes('delivery')) {
          return get().handleOrderTracking(message, context);
        }
        
        // Technical support
        if (messageLower.includes('problem') || messageLower.includes('issue') || messageLower.includes('help') || messageLower.includes('support')) {
          return get().handleTechnicalSupport(message, context);
        }
        
        // Return policy
        if (messageLower.includes('return') || messageLower.includes('refund') || messageLower.includes('exchange')) {
          return get().handleReturnPolicy(message, context);
        }
        
        // Account issues
        if (messageLower.includes('account') || messageLower.includes('login') || messageLower.includes('password')) {
          return get().handleAccountSupport(message, context);
        }
        
        // General conversation
        return get().handleGeneralConversation(message, context);
      },
      
      handleProductSearch: (message, context) => {
        const mockProducts = [
          {
            id: 1,
            name: 'iPhone 15 Pro',
            price: 999,
            image: '/api/placeholder/200/200',
            rating: 4.8,
            category: 'Electronics',
            description: 'Latest iPhone with advanced camera system'
          },
          {
            id: 2,
            name: 'MacBook Pro 16"',
            price: 2499,
            image: '/api/placeholder/200/200',
            rating: 4.9,
            category: 'Electronics',
            description: 'Professional laptop for creators'
          },
          {
            id: 3,
            name: 'Sony WH-1000XM5',
            price: 399,
            image: '/api/placeholder/200/200',
            rating: 4.7,
            category: 'Electronics',
            description: 'Industry-leading noise cancelling headphones'
          }
        ];
        
        return {
          text: "I found some great products that might interest you! Here are my recommendations based on your search:",
          type: 'product-recommendations',
          products: mockProducts,
          suggestions: [
            "Show me more options",
            "Filter by price",
            "Compare products",
            "Add to cart"
          ]
        };
      },
      
      handleOrderTracking: (message, context) => {
        const mockOrder = {
          id: 'ORD-12345',
          status: 'shipped',
          estimatedDelivery: '2024-01-15',
          trackingNumber: '1Z999AA1234567890',
          items: ['iPhone 15 Pro', 'AirPods Pro'],
          total: 1299
        };
        
        return {
          text: `I found your order #${mockOrder.id}! It's currently ${mockOrder.status} and estimated to arrive on ${mockOrder.estimatedDelivery}. Your tracking number is ${mockOrder.trackingNumber}.`,
          type: 'order-info',
          order: mockOrder,
          suggestions: [
            "Track another order",
            "Change delivery address",
            "Contact carrier",
            "View order details"
          ]
        };
      },
      
      handleTechnicalSupport: (message, context) => {
        return {
          text: "I'm here to help with any technical issues! Could you please describe the specific problem you're experiencing? I can assist with setup, troubleshooting, compatibility issues, and more.",
          type: 'technical-support',
          suggestions: [
            "Setup help",
            "Compatibility issues",
            "Performance problems",
            "Connectivity issues",
            "Software problems"
          ]
        };
      },
      
      handleReturnPolicy: (message, context) => {
        return {
          text: "Our return policy allows you to return most items within 30 days of delivery. Items must be in original condition with packaging. Would you like me to help you start a return process?",
          type: 'return-info',
          suggestions: [
            "Start return process",
            "Check return eligibility",
            "Print return label",
            "Exchange item",
            "Refund options"
          ]
        };
      },
      
      handleAccountSupport: (message, context) => {
        return {
          text: "I can help you with account-related issues. This includes password resets, profile updates, payment methods, and account security. What specific account issue are you experiencing?",
          type: 'account-support',
          suggestions: [
            "Reset password",
            "Update profile",
            "Payment methods",
            "Account security",
            "Delete account"
          ]
        };
      },
      
      handleGeneralConversation: (message, context) => {
        const responses = [
          "That's interesting! Tell me more about what you're looking for.",
          "I'd be happy to help you with that. Could you provide more details?",
          "I understand. Let me see how I can best assist you.",
          "That's a great question! Let me help you find the information you need.",
          "I'm here to help! What would you like to know more about?",
          "I can definitely assist you with that. Here's what I can do for you:",
          "That sounds like something I can help with. Let me provide you with some options."
        ];
        
        return {
          text: responses[Math.floor(Math.random() * responses.length)],
          type: 'general',
          suggestions: [
            "Find products",
            "Track order",
            "Get support",
            "Account help",
            "Return policy"
          ]
        };
      },
      
      updateContext: (newContext) => {
        set(state => ({
          context: { ...state.context, ...newContext }
        }));
      },
      
      setAIMode: (mode) => {
        set({ aiMode: mode });
      },
      
      addQuickReply: (reply) => {
        set(state => ({
          quickReplies: [...state.quickReplies, reply]
        }));
      },
      
      clearConversation: () => {
        set({
          messages: [],
          conversationHistory: [],
          unreadCount: 0
        });
      },
      
      // Advanced features
      analyzeSentiment: (message) => {
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'happy'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'disappointed', 'angry', 'frustrated'];
        
        const messageLower = message.toLowerCase();
        const positiveCount = positiveWords.filter(word => messageLower.includes(word)).length;
        const negativeCount = negativeWords.filter(word => messageLower.includes(word)).length;
        
        if (positiveCount > negativeCount) return 'positive';
        if (negativeCount > positiveCount) return 'negative';
        return 'neutral';
      },
      
      generatePersonalizedResponse: (message, userProfile) => {
        const sentiment = get().analyzeSentiment(message);
        const preferences = userProfile?.preferences || {};
        
        // Generate personalized response based on user profile and sentiment
        return {
          text: `Based on your preferences and the ${sentiment} tone of your message, I'd recommend...`,
          personalized: true,
          sentiment,
          preferences
        };
      },
      
      // Mock data for demo
      getChatAnalytics: () => {
        return {
          totalMessages: get().messages.length,
          averageResponseTime: '1.2s',
          userSatisfaction: 4.8,
          commonTopics: ['product-search', 'order-tracking', 'technical-support'],
          activeUsers: 1247
        };
      }
    }),
    {
      name: 'advanced-chat-store',
      partialize: (state) => ({
        conversationHistory: state.conversationHistory,
        context: state.context,
        quickReplies: state.quickReplies
      })
    }
  )
);

export { useAdvancedChatStore };
