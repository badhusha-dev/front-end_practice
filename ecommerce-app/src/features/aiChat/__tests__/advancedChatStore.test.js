import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAdvancedChatStore } from '../advancedChatStore';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Advanced Chat Store', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  it('should initialize with default values', () => {
    const store = useAdvancedChatStore.getState();
    
    expect(store.isOpen).toBe(false);
    expect(store.isConnected).toBe(false);
    expect(store.isTyping).toBe(false);
    expect(store.currentAgent).toBe(null);
    expect(store.messages).toEqual([]);
    expect(store.conversationHistory).toEqual([]);
    expect(store.unreadCount).toBe(0);
    expect(store.aiMode).toBe('assistant');
    expect(store.context).toEqual({});
    expect(store.recommendedProducts).toEqual([]);
    expect(store.productSuggestions).toEqual([]);
    expect(store.quickReplies).toEqual([]);
  });

  it('should toggle chat', () => {
    const { toggleChat } = useAdvancedChatStore.getState();
    
    const initialState = useAdvancedChatStore.getState().isOpen;
    toggleChat();
    
    expect(useAdvancedChatStore.getState().isOpen).toBe(!initialState);
  });

  it('should connect to chat', async () => {
    const { connect } = useAdvancedChatStore.getState();
    
    await connect();
    
    const state = useAdvancedChatStore.getState();
    expect(state.isConnected).toBe(true);
    expect(state.isOpen).toBe(true);
  });

  it('should disconnect from chat', () => {
    const { connect, disconnect } = useAdvancedChatStore.getState();
    
    connect();
    disconnect();
    
    const state = useAdvancedChatStore.getState();
    expect(state.isConnected).toBe(false);
    expect(state.isOpen).toBe(false);
  });

  it('should add message', () => {
    const { addMessage } = useAdvancedChatStore.getState();
    
    addMessage('Test message', 'user');
    
    const state = useAdvancedChatStore.getState();
    expect(state.messages.length).toBeGreaterThan(0);
    expect(state.messages[0].message).toBe('Test message');
    expect(state.messages[0].sender).toBe('user');
  });

  it('should send message', async () => {
    const { sendMessage } = useAdvancedChatStore.getState();
    
    await sendMessage('Test message');
    
    const state = useAdvancedChatStore.getState();
    expect(state.messages.length).toBeGreaterThan(0);
  });

  it('should generate AI response', async () => {
    const { generateAIResponse } = useAdvancedChatStore.getState();
    
    const response = await generateAIResponse('Test query');
    
    expect(response).toBeDefined();
  });

  it('should process user message', async () => {
    const { processUserMessage } = useAdvancedChatStore.getState();
    
    await processUserMessage('Test message');
    
    const state = useAdvancedChatStore.getState();
    expect(state.messages.length).toBeGreaterThan(0);
  });

  it('should update context', () => {
    const { updateContext } = useAdvancedChatStore.getState();
    
    updateContext({ userId: 123, sessionId: 'abc' });
    
    expect(useAdvancedChatStore.getState().context.userId).toBe(123);
    expect(useAdvancedChatStore.getState().context.sessionId).toBe('abc');
  });

  it('should set AI mode', () => {
    const { setAIMode } = useAdvancedChatStore.getState();
    
    setAIMode('product-recommendation');
    
    expect(useAdvancedChatStore.getState().aiMode).toBe('product-recommendation');
  });

  it('should add quick reply', () => {
    const { addQuickReply } = useAdvancedChatStore.getState();
    
    addQuickReply('Quick reply text');
    
    const state = useAdvancedChatStore.getState();
    expect(state.quickReplies.length).toBeGreaterThan(0);
    expect(state.quickReplies[0].text).toBe('Quick reply text');
  });

  it('should clear conversation', () => {
    const { addMessage, clearConversation } = useAdvancedChatStore.getState();
    
    addMessage('Test message', 'user');
    clearConversation();
    
    const state = useAdvancedChatStore.getState();
    expect(state.messages).toEqual([]);
    expect(state.conversationHistory).toEqual([]);
  });

  it('should analyze sentiment', () => {
    const { analyzeSentiment } = useAdvancedChatStore.getState();
    
    const sentiment = analyzeSentiment('I love this product!');
    
    expect(sentiment).toBeDefined();
    expect(sentiment.score).toBeDefined();
    expect(sentiment.label).toBeDefined();
  });

  it('should generate personalized response', async () => {
    const { generatePersonalizedResponse } = useAdvancedChatStore.getState();
    
    const response = await generatePersonalizedResponse('Test message', { userId: 123 });
    
    expect(response).toBeDefined();
  });

  it('should get chat analytics', () => {
    const { getChatAnalytics } = useAdvancedChatStore.getState();
    
    const analytics = getChatAnalytics();
    
    expect(analytics).toBeDefined();
    expect(analytics.totalMessages).toBeDefined();
    expect(analytics.averageResponseTime).toBeDefined();
    expect(analytics.userSatisfaction).toBeDefined();
  });
});
