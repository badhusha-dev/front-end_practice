import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Chat Store for real-time customer support
export const useChatStore = create(
  persist(
    (set, get) => ({
      isOpen: false,
      isConnected: false,
      messages: [],
      currentAgent: null,
      chatHistory: [],
      typing: false,
      unreadCount: 0,

      // Open/close chat
      openChat: () => set({ isOpen: true, unreadCount: 0 }),
      closeChat: () => set({ isOpen: false }),
      toggleChat: () => set((state) => ({ isOpen: !state.isOpen, unreadCount: 0 })),

      // Connection management
      connect: () => set({ isConnected: true }),
      disconnect: () => set({ isConnected: false }),

      // Send message
      sendMessage: (message, type = 'user') => {
        const newMessage = {
          id: Date.now().toString(),
          text: message,
          type,
          timestamp: new Date().toISOString(),
          agentId: type === 'agent' ? get().currentAgent?.id : null
        };

        set((state) => ({
          messages: [...state.messages, newMessage],
          typing: type === 'user'
        }));

        // Simulate agent response
        if (type === 'user') {
          setTimeout(() => {
            get().simulateAgentResponse(message);
          }, 1000 + Math.random() * 2000);
        }

        return newMessage;
      },

      // Simulate agent response
      simulateAgentResponse: (userMessage) => {
        const responses = get().getAgentResponses(userMessage);
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        get().sendMessage(response, 'agent');
        set({ typing: false });
      },

      // Get appropriate agent responses
      getAgentResponses: (userMessage) => {
        const message = userMessage.toLowerCase();
        
        if (message.includes('order') || message.includes('shipping')) {
          return [
            "I'd be happy to help you with your order! Can you provide your order number?",
            "Let me check the status of your order for you.",
            "I can help you track your shipment. What's your order number?"
          ];
        }
        
        if (message.includes('return') || message.includes('refund')) {
          return [
            "I can help you with returns and refunds. What item would you like to return?",
            "Our return policy allows returns within 30 days. Let me process that for you.",
            "I'll help you initiate a return. Can you tell me the order number?"
          ];
        }
        
        if (message.includes('product') || message.includes('item')) {
          return [
            "I can help you find the perfect product! What are you looking for?",
            "Let me recommend some products based on your needs.",
            "I'd be happy to help you with product information."
          ];
        }
        
        if (message.includes('price') || message.includes('cost')) {
          return [
            "I can help you find the best prices! Are you looking for a specific product?",
            "Let me check our current deals and promotions for you.",
            "I'll help you find the most cost-effective options."
          ];
        }
        
        return [
          "Thank you for contacting us! How can I help you today?",
          "I'm here to assist you. What can I help you with?",
          "Welcome! I'm ready to help you with any questions you have."
        ];
      },

      // Set current agent
      setCurrentAgent: (agent) => set({ currentAgent: agent }),

      // Add to chat history
      addToHistory: (chatSession) => {
        set((state) => ({
          chatHistory: [...state.chatHistory, chatSession]
        }));
      },

      // Clear messages
      clearMessages: () => set({ messages: [] }),

      // Set typing indicator
      setTyping: (isTyping) => set({ typing: isTyping }),

      // Increment unread count
      incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 }))
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        chatHistory: state.chatHistory,
        currentAgent: state.currentAgent
      })
    }
  )
);
