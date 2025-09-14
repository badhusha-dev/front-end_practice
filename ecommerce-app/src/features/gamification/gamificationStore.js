import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Gamification Store for points, badges, and rewards
export const useGamificationStore = create(
  persist(
    (set, get) => ({
      // User gamification data
      userProfile: {
        points: 0,
        level: 1,
        experience: 0,
        streak: 0,
        totalPurchases: 0,
        totalReviews: 0,
        totalShares: 0,
        joinDate: new Date().toISOString()
      },
      
      badges: [],
      achievements: [],
      rewards: [],
      leaderboard: [],
      
      // Actions and points
      actions: {
        signup: { points: 100, description: 'Welcome bonus!' },
        firstPurchase: { points: 200, description: 'First purchase' },
        review: { points: 50, description: 'Product review' },
        share: { points: 25, description: 'Social share' },
        login: { points: 10, description: 'Daily login' },
        browse: { points: 5, description: 'Browse products' },
        addToCart: { points: 15, description: 'Add to cart' },
        wishlist: { points: 10, description: 'Add to wishlist' },
        completeProfile: { points: 100, description: 'Complete profile' },
        referFriend: { points: 500, description: 'Refer a friend' }
      },

      // Badge definitions
      badgeDefinitions: {
        'first-purchase': {
          id: 'first-purchase',
          name: 'First Purchase',
          description: 'Made your first purchase',
          icon: '🛍️',
          pointsRequired: 0,
          condition: 'totalPurchases >= 1'
        },
        'reviewer': {
          id: 'reviewer',
          name: 'Product Reviewer',
          description: 'Left 5 product reviews',
          icon: '⭐',
          pointsRequired: 250,
          condition: 'totalReviews >= 5'
        },
        'social-butterfly': {
          id: 'social-butterfly',
          name: 'Social Butterfly',
          description: 'Shared 10 products',
          icon: '🦋',
          pointsRequired: 250,
          condition: 'totalShares >= 10'
        },
        'loyal-customer': {
          id: 'loyal-customer',
          name: 'Loyal Customer',
          description: 'Made 10 purchases',
          icon: '💎',
          pointsRequired: 2000,
          condition: 'totalPurchases >= 10'
        },
        'early-bird': {
          id: 'early-bird',
          name: 'Early Bird',
          description: 'Joined in the first month',
          icon: '🐦',
          pointsRequired: 0,
          condition: 'earlyMember'
        },
        'streak-master': {
          id: 'streak-master',
          name: 'Streak Master',
          description: '7-day login streak',
          icon: '🔥',
          pointsRequired: 700,
          condition: 'streak >= 7'
        }
      },

      // Add points for an action
      addPoints: (actionType, metadata = {}) => {
        const action = get().actions[actionType];
        if (!action) return;

        set((state) => {
          const newPoints = state.userProfile.points + action.points;
          const newExperience = state.userProfile.experience + action.points;
          const newLevel = Math.floor(newExperience / 1000) + 1;

          const updatedProfile = {
            ...state.userProfile,
            points: newPoints,
            experience: newExperience,
            level: newLevel
          };

          // Check for new badges
          const newBadges = get().checkForNewBadges(updatedProfile, actionType, metadata);

          return {
            userProfile: updatedProfile,
            badges: [...state.badges, ...newBadges]
          };
        });

        // Show notification for points earned
        get().showPointsNotification(action.points, action.description);
      },

      // Check for new badges
      checkForNewBadges: (profile, actionType, metadata) => {
        const { badges, badgeDefinitions } = get();
        const newBadges = [];

        Object.values(badgeDefinitions).forEach(badge => {
          // Skip if already earned
          if (badges.some(b => b.id === badge.id)) return;

          let earned = false;

          switch (badge.condition) {
            case 'totalPurchases >= 1':
              earned = actionType === 'firstPurchase';
              break;
            case 'totalReviews >= 5':
              earned = profile.totalReviews >= 5;
              break;
            case 'totalShares >= 10':
              earned = profile.totalShares >= 10;
              break;
            case 'totalPurchases >= 10':
              earned = profile.totalPurchases >= 10;
              break;
            case 'earlyMember':
              earned = new Date(profile.joinDate) < new Date('2024-02-01');
              break;
            case 'streak >= 7':
              earned = profile.streak >= 7;
              break;
          }

          if (earned) {
            newBadges.push({
              ...badge,
              earnedAt: new Date().toISOString(),
              points: badge.pointsRequired
            });
          }
        });

        return newBadges;
      },

      // Update user stats
      updateStats: (stats) => {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            ...stats
          }
        }));
      },

      // Increment streak
      incrementStreak: () => {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            streak: state.userProfile.streak + 1
          }
        }));

        get().addPoints('login');
      },

      // Reset streak (if user doesn't login for a day)
      resetStreak: () => {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            streak: 0
          }
        }));
      },

      // Get user's level info
      getLevelInfo: () => {
        const { experience, level } = get().userProfile;
        const currentLevelExp = (level - 1) * 1000;
        const nextLevelExp = level * 1000;
        const progress = ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

        return {
          level,
          experience,
          currentLevelExp,
          nextLevelExp,
          progress: Math.min(100, Math.max(0, progress)),
          pointsToNext: nextLevelExp - experience
        };
      },

      // Get leaderboard
      getLeaderboard: () => {
        // In a real app, this would fetch from server
        const mockLeaderboard = [
          { id: '1', name: 'Alice Johnson', points: 2500, level: 3, avatar: '👩' },
          { id: '2', name: 'Bob Smith', points: 2200, level: 3, avatar: '👨' },
          { id: '3', name: 'Carol Davis', points: 1800, level: 2, avatar: '👩‍💼' },
          { id: '4', name: 'David Wilson', points: 1500, level: 2, avatar: '👨‍💻' },
          { id: '5', name: 'Eva Brown', points: 1200, level: 2, avatar: '👩‍🎨' }
        ];

        set({ leaderboard: mockLeaderboard });
        return mockLeaderboard;
      },

      // Get rewards (discounts, free shipping, etc.)
      getRewards: () => {
        const { level, points } = get().userProfile;
        
        const availableRewards = [
          {
            id: 'free-shipping',
            name: 'Free Shipping',
            description: 'Free shipping on your next order',
            pointsCost: 500,
            available: points >= 500,
            icon: '🚚'
          },
          {
            id: '10-percent-off',
            name: '10% Discount',
            description: '10% off your next purchase',
            pointsCost: 1000,
            available: points >= 1000,
            icon: '💳'
          },
          {
            id: 'early-access',
            name: 'Early Access',
            description: 'Early access to new products',
            pointsCost: 2000,
            available: level >= 3,
            icon: '🎁'
          },
          {
            id: 'vip-support',
            name: 'VIP Support',
            description: 'Priority customer support',
            pointsCost: 3000,
            available: level >= 5,
            icon: '👑'
          }
        ];

        set({ rewards: availableRewards });
        return availableRewards;
      },

      // Redeem reward
      redeemReward: (rewardId) => {
        const reward = get().rewards.find(r => r.id === rewardId);
        if (!reward || !reward.available) return false;

        const { points } = get().userProfile;
        if (points < reward.pointsCost) return false;

        set((state) => ({
          userProfile: {
            ...state.userProfile,
            points: state.userProfile.points - reward.pointsCost
          }
        }));

        return true;
      },

      // Show points notification
      showPointsNotification: (points, description) => {
        // This would trigger a toast notification in the UI
        console.log(`+${points} points: ${description}`);
      },

      // Clear all data (for testing)
      clearAllData: () => {
        set({
          userProfile: {
            points: 0,
            level: 1,
            experience: 0,
            streak: 0,
            totalPurchases: 0,
            totalReviews: 0,
            totalShares: 0,
            joinDate: new Date().toISOString()
          },
          badges: [],
          achievements: [],
          rewards: [],
          leaderboard: []
        });
      }
    }),
    {
      name: 'gamification-storage',
      partialize: (state) => ({
        userProfile: state.userProfile,
        badges: state.badges,
        achievements: state.achievements
      })
    }
  )
);
