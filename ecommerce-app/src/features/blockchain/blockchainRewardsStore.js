import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBlockchainRewardsStore = create(
  persist(
    (set, get) => ({
      // Blockchain state
      walletAddress: null,
      isWalletConnected: false,
      isConnecting: false,
      networkId: null,
      balance: 0,
      
      // Loyalty points
      loyaltyPoints: 0,
      totalEarned: 0,
      totalSpent: 0,
      pendingPoints: 0,
      
      // Transactions
      transactions: [],
      pendingTransactions: [],
      
      // Rewards and NFTs
      rewards: [],
      nfts: [],
      achievements: [],
      
      // Blockchain configuration
      contractAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // Mock contract
      tokenSymbol: 'LOYALTY',
      tokenDecimals: 18,
      
      // Actions
      connectWallet: async () => {
        set({ isConnecting: true });
        
        try {
          // Simulate wallet connection
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const mockWalletData = {
            address: '0x' + Math.random().toString(16).substr(2, 40),
            networkId: 1, // Ethereum mainnet
            balance: 0.5
          };
          
          set({
            walletAddress: mockWalletData.address,
            isWalletConnected: true,
            isConnecting: false,
            networkId: mockWalletData.networkId,
            balance: mockWalletData.balance
          });
          
          // Initialize user data
          get().initializeUserData();
          
        } catch (error) {
          set({ 
            isConnecting: false,
            error: 'Failed to connect wallet'
          });
        }
      },
      
      disconnectWallet: () => {
        set({
          walletAddress: null,
          isWalletConnected: false,
          networkId: null,
          balance: 0,
          loyaltyPoints: 0,
          transactions: [],
          rewards: [],
          nfts: [],
          achievements: []
        });
      },
      
      initializeUserData: () => {
        // Mock user data initialization
        const mockData = {
          loyaltyPoints: 1250,
          totalEarned: 2500,
          totalSpent: 1250,
          transactions: [
            {
              id: 1,
              type: 'earn',
              amount: 100,
              description: 'Purchase Reward',
              timestamp: Date.now() - 86400000,
              status: 'confirmed',
              txHash: '0x' + Math.random().toString(16).substr(2, 64)
            },
            {
              id: 2,
              type: 'spend',
              amount: -50,
              description: 'Discount Applied',
              timestamp: Date.now() - 172800000,
              status: 'confirmed',
              txHash: '0x' + Math.random().toString(16).substr(2, 64)
            }
          ],
          rewards: [
            {
              id: 1,
              name: 'Bronze Loyalty NFT',
              description: 'Earned for 10+ purchases',
              image: '/api/placeholder/200/200',
              rarity: 'common',
              pointsRequired: 1000,
              isEarned: true,
              tokenId: 1
            },
            {
              id: 2,
              name: 'Silver Loyalty NFT',
              description: 'Earned for 25+ purchases',
              image: '/api/placeholder/200/200',
              rarity: 'rare',
              pointsRequired: 2500,
              isEarned: false,
              tokenId: 2
            }
          ],
          achievements: [
            {
              id: 1,
              name: 'First Purchase',
              description: 'Complete your first purchase',
              icon: '🎯',
              isUnlocked: true,
              unlockedAt: Date.now() - 2592000000
            },
            {
              id: 2,
              name: 'Loyalty Master',
              description: 'Earn 1000+ loyalty points',
              icon: '👑',
              isUnlocked: true,
              unlockedAt: Date.now() - 86400000
            },
            {
              id: 3,
              name: 'NFT Collector',
              description: 'Collect your first NFT',
              icon: '🎨',
              isUnlocked: true,
              unlockedAt: Date.now() - 43200000
            }
          ]
        };
        
        set(mockData);
      },
      
      earnPoints: async (amount, reason) => {
        const transaction = {
          id: Date.now(),
          type: 'earn',
          amount,
          description: reason,
          timestamp: Date.now(),
          status: 'pending',
          txHash: null
        };
        
        set(state => ({
          pendingTransactions: [...state.pendingTransactions, transaction],
          pendingPoints: state.pendingPoints + amount
        }));
        
        // Simulate blockchain transaction
        setTimeout(() => {
          get().confirmTransaction(transaction.id);
        }, 3000);
      },
      
      spendPoints: async (amount, reason) => {
        if (get().loyaltyPoints < amount) {
          throw new Error('Insufficient loyalty points');
        }
        
        const transaction = {
          id: Date.now(),
          type: 'spend',
          amount: -amount,
          description: reason,
          timestamp: Date.now(),
          status: 'pending',
          txHash: null
        };
        
        set(state => ({
          pendingTransactions: [...state.pendingTransactions, transaction]
        }));
        
        // Simulate blockchain transaction
        setTimeout(() => {
          get().confirmTransaction(transaction.id);
        }, 2000);
      },
      
      confirmTransaction: (transactionId) => {
        const pendingTx = get().pendingTransactions.find(tx => tx.id === transactionId);
        if (!pendingTx) return;
        
        const confirmedTx = {
          ...pendingTx,
          status: 'confirmed',
          txHash: '0x' + Math.random().toString(16).substr(2, 64)
        };
        
        set(state => ({
          transactions: [confirmedTx, ...state.transactions],
          pendingTransactions: state.pendingTransactions.filter(tx => tx.id !== transactionId),
          loyaltyPoints: state.loyaltyPoints + confirmedTx.amount,
          totalEarned: confirmedTx.amount > 0 ? state.totalEarned + confirmedTx.amount : state.totalEarned,
          totalSpent: confirmedTx.amount < 0 ? state.totalSpent + Math.abs(confirmedTx.amount) : state.totalSpent,
          pendingPoints: confirmedTx.amount > 0 ? state.pendingPoints - confirmedTx.amount : state.pendingPoints
        }));
        
        // Check for new achievements
        get().checkAchievements();
      },
      
      checkAchievements: () => {
        const { loyaltyPoints, totalEarned, rewards } = get();
        const newAchievements = [];
        
        // Check for new achievements based on points
        if (loyaltyPoints >= 1000 && !get().achievements.find(a => a.id === 4)) {
          newAchievements.push({
            id: 4,
            name: 'Points Master',
            description: 'Accumulate 1000+ loyalty points',
            icon: '⭐',
            isUnlocked: true,
            unlockedAt: Date.now()
          });
        }
        
        if (totalEarned >= 5000 && !get().achievements.find(a => a.id === 5)) {
          newAchievements.push({
            id: 5,
            name: 'Earning Champion',
            description: 'Earn 5000+ total points',
            icon: '🏆',
            isUnlocked: true,
            unlockedAt: Date.now()
          });
        }
        
        if (newAchievements.length > 0) {
          set(state => ({
            achievements: [...state.achievements, ...newAchievements]
          }));
        }
      },
      
      mintNFT: async (rewardId) => {
        const reward = get().rewards.find(r => r.id === rewardId);
        if (!reward || reward.isEarned) return;
        
        if (get().loyaltyPoints < reward.pointsRequired) {
          throw new Error('Insufficient points for this reward');
        }
        
        // Simulate NFT minting
        const nft = {
          id: Date.now(),
          name: reward.name,
          description: reward.description,
          image: reward.image,
          rarity: reward.rarity,
          tokenId: reward.tokenId,
          mintedAt: Date.now(),
          txHash: '0x' + Math.random().toString(16).substr(2, 64)
        };
        
        set(state => ({
          nfts: [...state.nfts, nft],
          rewards: state.rewards.map(r => 
            r.id === rewardId ? { ...r, isEarned: true } : r
          )
        }));
        
        // Spend points for NFT
        await get().spendPoints(reward.pointsRequired, `Minted ${reward.name}`);
      },
      
      transferPoints: async (toAddress, amount) => {
        if (get().loyaltyPoints < amount) {
          throw new Error('Insufficient loyalty points');
        }
        
        const transaction = {
          id: Date.now(),
          type: 'transfer',
          amount: -amount,
          description: `Transfer to ${toAddress.slice(0, 6)}...${toAddress.slice(-4)}`,
          timestamp: Date.now(),
          status: 'pending',
          txHash: null,
          toAddress
        };
        
        set(state => ({
          pendingTransactions: [...state.pendingTransactions, transaction]
        }));
        
        // Simulate blockchain transaction
        setTimeout(() => {
          get().confirmTransaction(transaction.id);
        }, 3000);
      },
      
      getTransactionHistory: () => {
        return get().transactions.sort((a, b) => b.timestamp - a.timestamp);
      },
      
      getAvailableRewards: () => {
        return get().rewards.filter(reward => !reward.isEarned);
      },
      
      getEarnedRewards: () => {
        return get().rewards.filter(reward => reward.isEarned);
      },
      
      getWalletInfo: () => {
        const { walletAddress, loyaltyPoints, balance, nfts } = get();
        return {
          address: walletAddress,
          points: loyaltyPoints,
          ethBalance: balance,
          nftCount: nfts.length,
          isConnected: get().isWalletConnected
        };
      }
    }),
    {
      name: 'blockchain-rewards-store',
      partialize: (state) => ({
        walletAddress: state.walletAddress,
        isWalletConnected: state.isWalletConnected,
        loyaltyPoints: state.loyaltyPoints,
        totalEarned: state.totalEarned,
        totalSpent: state.totalSpent,
        transactions: state.transactions,
        rewards: state.rewards,
        nfts: state.nfts,
        achievements: state.achievements
      })
    }
  )
);

export { useBlockchainRewardsStore };
