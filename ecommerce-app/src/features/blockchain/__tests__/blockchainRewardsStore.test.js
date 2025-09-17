import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useBlockchainRewardsStore } from '../blockchainRewardsStore';

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

describe('Blockchain Rewards Store', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  it('should initialize with default values', () => {
    const store = useBlockchainRewardsStore.getState();
    
    expect(store.walletAddress).toBe(null);
    expect(store.isWalletConnected).toBe(false);
    expect(store.isConnecting).toBe(false);
    expect(store.loyaltyPoints).toBe(0);
    expect(store.totalEarned).toBe(0);
    expect(store.totalSpent).toBe(0);
    expect(store.transactions).toEqual([]);
    expect(store.rewards).toEqual([]);
    expect(store.nfts).toEqual([]);
    expect(store.achievements).toEqual([]);
  });

  it('should connect wallet', async () => {
    const { connectWallet } = useBlockchainRewardsStore.getState();
    
    await connectWallet();
    
    const state = useBlockchainRewardsStore.getState();
    expect(state.isWalletConnected).toBe(true);
    expect(state.walletAddress).toBeDefined();
    expect(state.isConnecting).toBe(false);
  });

  it('should disconnect wallet', () => {
    const { connectWallet, disconnectWallet } = useBlockchainRewardsStore.getState();
    
    connectWallet();
    disconnectWallet();
    
    const state = useBlockchainRewardsStore.getState();
    expect(state.isWalletConnected).toBe(false);
    expect(state.walletAddress).toBe(null);
  });

  it('should earn points', async () => {
    const { earnPoints } = useBlockchainRewardsStore.getState();
    
    await earnPoints(100, 'Test reward');
    
    const state = useBlockchainRewardsStore.getState();
    expect(state.pendingPoints).toBe(100);
    expect(state.pendingTransactions.length).toBeGreaterThan(0);
  });

  it('should spend points', async () => {
    const { earnPoints, spendPoints } = useBlockchainRewardsStore.getState();
    
    await earnPoints(200, 'Test reward');
    await spendPoints(50, 'Test purchase');
    
    const state = useBlockchainRewardsStore.getState();
    expect(state.pendingTransactions.length).toBeGreaterThan(0);
  });

  it('should mint NFT', async () => {
    const { mintNFT } = useBlockchainRewardsStore.getState();
    
    await mintNFT(1);
    
    const state = useBlockchainRewardsStore.getState();
    expect(state.nfts.length).toBeGreaterThan(0);
  });

  it('should transfer points', async () => {
    const { transferPoints } = useBlockchainRewardsStore.getState();
    
    await transferPoints('0x123', 100);
    
    const state = useBlockchainRewardsStore.getState();
    expect(state.pendingTransactions.length).toBeGreaterThan(0);
  });

  it('should get transaction history', () => {
    const { getTransactionHistory } = useBlockchainRewardsStore.getState();
    
    const history = getTransactionHistory();
    
    expect(Array.isArray(history)).toBe(true);
  });

  it('should get available rewards', () => {
    const { getAvailableRewards } = useBlockchainRewardsStore.getState();
    
    const rewards = getAvailableRewards();
    
    expect(Array.isArray(rewards)).toBe(true);
  });

  it('should get earned rewards', () => {
    const { getEarnedRewards } = useBlockchainRewardsStore.getState();
    
    const rewards = getEarnedRewards();
    
    expect(Array.isArray(rewards)).toBe(true);
  });

  it('should get wallet info', () => {
    const { getWalletInfo } = useBlockchainRewardsStore.getState();
    
    const info = getWalletInfo();
    
    expect(info).toBeDefined();
    expect(info.address).toBeDefined();
    expect(info.points).toBeDefined();
    expect(info.isConnected).toBeDefined();
  });
});
