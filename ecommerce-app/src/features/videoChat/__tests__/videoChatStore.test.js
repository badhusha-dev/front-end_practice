import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useVideoChatStore } from '../videoChatStore';

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

describe('Video Chat Store', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  it('should initialize with default values', () => {
    const store = useVideoChatStore.getState();
    
    expect(store.isVideoChatOpen).toBe(false);
    expect(store.isConnecting).toBe(false);
    expect(store.isConnected).toBe(false);
    expect(store.isVideoEnabled).toBe(true);
    expect(store.isAudioEnabled).toBe(true);
    expect(store.isScreenSharing).toBe(false);
    expect(store.participants).toEqual([]);
    expect(store.messages).toEqual([]);
    expect(store.connectionStatus).toBe('disconnected');
  });

  it('should open video chat', () => {
    const { openVideoChat } = useVideoChatStore.getState();
    
    openVideoChat();
    
    const state = useVideoChatStore.getState();
    expect(state.isVideoChatOpen).toBe(true);
    expect(state.connectionStatus).toBe('connecting');
    expect(state.isConnecting).toBe(true);
  });

  it('should close video chat', () => {
    const { openVideoChat, closeVideoChat } = useVideoChatStore.getState();
    
    openVideoChat();
    closeVideoChat();
    
    const state = useVideoChatStore.getState();
    expect(state.isVideoChatOpen).toBe(false);
    expect(state.isConnected).toBe(false);
    expect(state.isConnecting).toBe(false);
    expect(state.connectionStatus).toBe('disconnected');
  });

  it('should toggle video', () => {
    const { toggleVideo } = useVideoChatStore.getState();
    
    const initialState = useVideoChatStore.getState().isVideoEnabled;
    toggleVideo();
    
    expect(useVideoChatStore.getState().isVideoEnabled).toBe(!initialState);
  });

  it('should toggle audio', () => {
    const { toggleAudio } = useVideoChatStore.getState();
    
    const initialState = useVideoChatStore.getState().isAudioEnabled;
    toggleAudio();
    
    expect(useVideoChatStore.getState().isAudioEnabled).toBe(!initialState);
  });

  it('should toggle screen sharing', () => {
    const { toggleScreenShare } = useVideoChatStore.getState();
    
    const initialState = useVideoChatStore.getState().isScreenSharing;
    toggleScreenShare();
    
    expect(useVideoChatStore.getState().isScreenSharing).toBe(!initialState);
  });

  it('should send message', () => {
    const { sendMessage } = useVideoChatStore.getState();
    
    sendMessage('Test message');
    
    const state = useVideoChatStore.getState();
    expect(state.messages.length).toBeGreaterThan(0);
    expect(state.messages[0].message).toBe('Test message');
    expect(state.messages[0].sender).toBe('user');
  });

  it('should get available agents', () => {
    const { getAvailableAgents } = useVideoChatStore.getState();
    
    const agents = getAvailableAgents();
    
    expect(agents).toBeDefined();
    expect(Array.isArray(agents)).toBe(true);
    expect(agents.length).toBeGreaterThan(0);
  });

  it('should get chat stats', () => {
    const { getChatStats } = useVideoChatStore.getState();
    
    const stats = getChatStats();
    
    expect(stats).toBeDefined();
    expect(stats.totalChats).toBeDefined();
    expect(stats.averageResponseTime).toBeDefined();
    expect(stats.customerSatisfaction).toBeDefined();
  });
});
