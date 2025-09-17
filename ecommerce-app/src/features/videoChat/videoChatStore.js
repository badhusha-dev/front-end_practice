import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useVideoChatStore = create(
  persist(
    (set, get) => ({
      // Chat state
      isVideoChatOpen: false,
      isConnecting: false,
      isConnected: false,
      isVideoEnabled: true,
      isAudioEnabled: true,
      isScreenSharing: false,
      
      // Chat participants
      participants: [],
      currentUser: null,
      supportAgent: null,
      
      // Chat messages
      messages: [],
      unreadCount: 0,
      
      // Technical state
      connectionStatus: 'disconnected', // disconnected, connecting, connected, failed
      error: null,
      localStream: null,
      remoteStream: null,
      
      // Chat history
      chatHistory: [],
      activeChats: [],
      
      // Actions
      openVideoChat: () => {
        set({ 
          isVideoChatOpen: true,
          connectionStatus: 'connecting',
          isConnecting: true
        });
        
        // Simulate connection process
        setTimeout(() => {
          get().simulateConnection();
        }, 2000);
      },
      
      closeVideoChat: () => {
        set({
          isVideoChatOpen: false,
          isConnected: false,
          isConnecting: false,
          connectionStatus: 'disconnected',
          localStream: null,
          remoteStream: null,
          messages: [],
          participants: [],
          supportAgent: null,
          error: null
        });
      },
      
      simulateConnection: () => {
        // Mock connection simulation
        const mockAgent = {
          id: 'agent-001',
          name: 'Sarah Johnson',
          role: 'Senior Support Specialist',
          avatar: '/api/placeholder/100/100',
          status: 'online',
          rating: 4.9,
          specialties: ['Technical Support', 'Product Information', 'Returns & Exchanges']
        };
        
        const mockMessages = [
          {
            id: 1,
            sender: 'agent',
            message: 'Hello! I\'m Sarah, your support specialist. How can I help you today?',
            timestamp: Date.now() - 30000,
            type: 'text'
          },
          {
            id: 2,
            sender: 'agent',
            message: 'I can see you\'re having trouble with our checkout process. Let me help you with that.',
            timestamp: Date.now() - 25000,
            type: 'text'
          }
        ];
        
        set({
          isConnected: true,
          isConnecting: false,
          connectionStatus: 'connected',
          supportAgent: mockAgent,
          participants: [mockAgent],
          messages: mockMessages,
          error: null
        });
      },
      
      sendMessage: (message) => {
        const newMessage = {
          id: Date.now(),
          sender: 'user',
          message,
          timestamp: Date.now(),
          type: 'text'
        };
        
        set(state => ({
          messages: [...state.messages, newMessage]
        }));
        
        // Simulate agent response
        setTimeout(() => {
          get().simulateAgentResponse(message);
        }, 1000 + Math.random() * 2000);
      },
      
      simulateAgentResponse: (userMessage) => {
        const responses = [
          'I understand your concern. Let me help you with that.',
          'That\'s a great question! Let me explain how that works.',
          'I can definitely help you with that. Here\'s what we can do...',
          'Let me check that information for you right away.',
          'I see the issue. Here\'s how we can resolve it...',
          'That\'s a common question. Let me walk you through it.',
          'I\'m here to help! Let me provide you with the best solution.',
          'I can assist you with that. Here are your options...'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const agentMessage = {
          id: Date.now(),
          sender: 'agent',
          message: randomResponse,
          timestamp: Date.now(),
          type: 'text'
        };
        
        set(state => ({
          messages: [...state.messages, agentMessage]
        }));
      },
      
      toggleVideo: () => {
        set(state => ({ isVideoEnabled: !state.isVideoEnabled }));
      },
      
      toggleAudio: () => {
        set(state => ({ isAudioEnabled: !state.isAudioEnabled }));
      },
      
      toggleScreenShare: () => {
        set(state => ({ isScreenSharing: !state.isScreenSharing }));
      },
      
      endCall: () => {
        set({
          isConnected: false,
          connectionStatus: 'disconnected',
          localStream: null,
          remoteStream: null,
          messages: [],
          participants: [],
          supportAgent: null
        });
      },
      
      addToChatHistory: (chatData) => {
        set(state => ({
          chatHistory: [chatData, ...state.chatHistory]
        }));
      },
      
      setError: (error) => {
        set({ 
          error,
          connectionStatus: 'failed',
          isConnecting: false
        });
      },
      
      clearError: () => {
        set({ error: null });
      },
      
      // Mock data for demo
      getAvailableAgents: () => {
        return [
          {
            id: 'agent-001',
            name: 'Sarah Johnson',
            role: 'Senior Support Specialist',
            avatar: '/api/placeholder/100/100',
            status: 'online',
            rating: 4.9,
            specialties: ['Technical Support', 'Product Information', 'Returns & Exchanges'],
            responseTime: '< 1 min'
          },
          {
            id: 'agent-002',
            name: 'Mike Chen',
            role: 'Technical Support Expert',
            avatar: '/api/placeholder/100/100',
            status: 'online',
            rating: 4.8,
            specialties: ['Technical Issues', 'Account Problems', 'Billing Support'],
            responseTime: '< 2 min'
          },
          {
            id: 'agent-003',
            name: 'Emily Rodriguez',
            role: 'Customer Success Manager',
            avatar: '/api/placeholder/100/100',
            status: 'busy',
            rating: 4.9,
            specialties: ['Product Recommendations', 'Order Support', 'General Inquiries'],
            responseTime: '< 3 min'
          }
        ];
      },
      
      getChatStats: () => {
        return {
          totalChats: 1247,
          averageResponseTime: '1.2 min',
          customerSatisfaction: 4.8,
          activeAgents: 3,
          queueLength: 2
        };
      }
    }),
    {
      name: 'video-chat-store',
      partialize: (state) => ({
        chatHistory: state.chatHistory,
        activeChats: state.activeChats
      })
    }
  )
);

export { useVideoChatStore };
