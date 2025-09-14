import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// AI Recommendation Store
export const useRecommendationStore = create(
  persist(
    (set, get) => ({
      userBehavior: {
        viewedProducts: [],
        purchasedProducts: [],
        wishlistItems: [],
        searchHistory: [],
        timeSpent: {},
        clickPatterns: []
      },
      recommendations: {
        personalized: [],
        trending: [],
        similar: [],
        frequentlyBought: []
      },
      aiModel: {
        isTrained: false,
        confidence: 0,
        lastUpdated: null
      },

      // Track user behavior
      trackProductView: (productId, duration = 0) => {
        set((state) => {
          const viewedProducts = [...state.userBehavior.viewedProducts];
          const existingIndex = viewedProducts.findIndex(item => item.id === productId);
          
          if (existingIndex >= 0) {
            viewedProducts[existingIndex] = {
              ...viewedProducts[existingIndex],
              count: viewedProducts[existingIndex].count + 1,
              totalTime: viewedProducts[existingIndex].totalTime + duration,
              lastViewed: new Date().toISOString()
            };
          } else {
            viewedProducts.push({
              id: productId,
              count: 1,
              totalTime: duration,
              firstViewed: new Date().toISOString(),
              lastViewed: new Date().toISOString()
            });
          }

          return {
            userBehavior: {
              ...state.userBehavior,
              viewedProducts
            }
          };
        });
      },

      trackProductClick: (productId, clickType = 'view') => {
        set((state) => {
          const clickPatterns = [...state.userBehavior.clickPatterns];
          clickPatterns.push({
            productId,
            clickType,
            timestamp: new Date().toISOString(),
            sessionId: Date.now().toString()
          });

          return {
            userBehavior: {
              ...state.userBehavior,
              clickPatterns: clickPatterns.slice(-100) // Keep last 100 clicks
            }
          };
        });
      },

      trackSearch: (searchTerm, results = []) => {
        set((state) => {
          const searchHistory = [...state.userBehavior.searchHistory];
          searchHistory.push({
            term: searchTerm,
            results: results.map(r => r.id),
            timestamp: new Date().toISOString()
          });

          return {
            userBehavior: {
              ...state.userBehavior,
              searchHistory: searchHistory.slice(-50) // Keep last 50 searches
            }
          };
        });
      },

      trackPurchase: (productId, quantity = 1) => {
        set((state) => {
          const purchasedProducts = [...state.userBehavior.purchasedProducts];
          const existingIndex = purchasedProducts.findIndex(item => item.id === productId);
          
          if (existingIndex >= 0) {
            purchasedProducts[existingIndex] = {
              ...purchasedProducts[existingIndex],
              quantity: purchasedProducts[existingIndex].quantity + quantity,
              lastPurchased: new Date().toISOString()
            };
          } else {
            purchasedProducts.push({
              id: productId,
              quantity,
              firstPurchased: new Date().toISOString(),
              lastPurchased: new Date().toISOString()
            });
          }

          return {
            userBehavior: {
              ...state.userBehavior,
              purchasedProducts
            }
          };
        });
      },

      // AI-powered recommendation algorithms
      generatePersonalizedRecommendations: (allProducts) => {
        const { userBehavior } = get();
        
        // Collaborative filtering based on similar users
        const collaborativeRecommendations = get().getCollaborativeRecommendations(allProducts);
        
        // Content-based filtering
        const contentBasedRecommendations = get().getContentBasedRecommendations(allProducts);
        
        // Hybrid approach - combine both methods
        const hybridRecommendations = get().combineRecommendations(
          collaborativeRecommendations,
          contentBasedRecommendations
        );

        set((state) => ({
          recommendations: {
            ...state.recommendations,
            personalized: hybridRecommendations
          },
          aiModel: {
            ...state.aiModel,
            lastUpdated: new Date().toISOString(),
            confidence: Math.min(0.9, hybridRecommendations.length * 0.1)
          }
        }));

        return hybridRecommendations;
      },

      getCollaborativeRecommendations: (allProducts) => {
        const { userBehavior } = get();
        const recommendations = [];
        
        // Find products similar to what user has viewed/purchased
        const userProductIds = [
          ...userBehavior.viewedProducts.map(p => p.id),
          ...userBehavior.purchasedProducts.map(p => p.id),
          ...userBehavior.wishlistItems
        ];

        allProducts.forEach(product => {
          if (!userProductIds.includes(product.id)) {
            // Calculate similarity score based on category, price range, rating
            const similarityScore = get().calculateProductSimilarity(product, userProductIds, allProducts);
            
            if (similarityScore > 0.3) {
              recommendations.push({
                ...product,
                recommendationScore: similarityScore,
                reason: 'Similar to your interests'
              });
            }
          }
        });

        return recommendations.sort((a, b) => b.recommendationScore - a.recommendationScore).slice(0, 10);
      },

      getContentBasedRecommendations: (allProducts) => {
        const { userBehavior } = get();
        const recommendations = [];
        
        // Analyze user's preferred categories, price ranges, brands
        const preferences = get().analyzeUserPreferences();
        
        allProducts.forEach(product => {
          const preferenceScore = get().calculatePreferenceScore(product, preferences);
          
          if (preferenceScore > 0.4) {
            recommendations.push({
              ...product,
              recommendationScore: preferenceScore,
              reason: 'Matches your preferences'
            });
          }
        });

        return recommendations.sort((a, b) => b.recommendationScore - a.recommendationScore).slice(0, 8);
      },

      calculateProductSimilarity: (product, userProductIds, allProducts) => {
        const userProducts = allProducts.filter(p => userProductIds.includes(p.id));
        if (userProducts.length === 0) return 0;

        let totalSimilarity = 0;
        let count = 0;

        userProducts.forEach(userProduct => {
          let similarity = 0;
          
          // Category similarity
          if (product.category === userProduct.category) {
            similarity += 0.4;
          }
          
          // Price range similarity (within 20% range)
          const priceDiff = Math.abs(product.price - userProduct.price) / userProduct.price;
          if (priceDiff <= 0.2) {
            similarity += 0.3;
          }
          
          // Rating similarity
          if (Math.abs(product.rating - userProduct.rating) <= 1) {
            similarity += 0.2;
          }
          
          // Brand similarity (if available)
          if (product.brand && userProduct.brand && product.brand === userProduct.brand) {
            similarity += 0.1;
          }

          totalSimilarity += similarity;
          count++;
        });

        return count > 0 ? totalSimilarity / count : 0;
      },

      analyzeUserPreferences: () => {
        const { userBehavior } = get();
        const preferences = {
          categories: {},
          priceRange: { min: Infinity, max: -Infinity },
          brands: {},
          avgRating: 0,
          totalProducts: 0
        };

        const allUserProducts = [
          ...userBehavior.viewedProducts,
          ...userBehavior.purchasedProducts
        ];

        allUserProducts.forEach(item => {
          // This would need product data - simplified for demo
          preferences.totalProducts++;
        });

        return preferences;
      },

      calculatePreferenceScore: (product, preferences) => {
        let score = 0;
        
        // Category preference
        if (preferences.categories[product.category]) {
          score += 0.4 * preferences.categories[product.category];
        }
        
        // Price range preference
        if (product.price >= preferences.priceRange.min && product.price <= preferences.priceRange.max) {
          score += 0.3;
        }
        
        // Brand preference
        if (product.brand && preferences.brands[product.brand]) {
          score += 0.2 * preferences.brands[product.brand];
        }
        
        // Rating preference
        if (product.rating >= preferences.avgRating) {
          score += 0.1;
        }

        return score;
      },

      combineRecommendations: (collaborative, contentBased) => {
        const combined = [...collaborative, ...contentBased];
        const uniqueProducts = new Map();

        combined.forEach(product => {
          if (uniqueProducts.has(product.id)) {
            const existing = uniqueProducts.get(product.id);
            existing.recommendationScore = Math.max(existing.recommendationScore, product.recommendationScore);
          } else {
            uniqueProducts.set(product.id, product);
          }
        });

        return Array.from(uniqueProducts.values())
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 12);
      },

      // Trending products based on global behavior
      generateTrendingRecommendations: (allProducts) => {
        // Simulate trending products based on recent activity
        const trending = allProducts
          .filter(product => product.rating >= 4.0)
          .sort((a, b) => b.reviews - a.reviews)
          .slice(0, 8)
          .map(product => ({
            ...product,
            reason: 'Trending now'
          }));

        set((state) => ({
          recommendations: {
            ...state.recommendations,
            trending
          }
        }));

        return trending;
      },

      // Get recommendations for a specific product
      getSimilarProducts: (productId, allProducts) => {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return [];

        const similar = allProducts
          .filter(p => p.id !== productId)
          .map(p => ({
            ...p,
            recommendationScore: get().calculateProductSimilarity(p, [productId], allProducts)
          }))
          .filter(p => p.recommendationScore > 0.3)
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 6);

        set((state) => ({
          recommendations: {
            ...state.recommendations,
            similar
          }
        }));

        return similar;
      },

      // Clear all data (for testing)
      clearAllData: () => {
        set({
          userBehavior: {
            viewedProducts: [],
            purchasedProducts: [],
            wishlistItems: [],
            searchHistory: [],
            timeSpent: {},
            clickPatterns: []
          },
          recommendations: {
            personalized: [],
            trending: [],
            similar: [],
            frequentlyBought: []
          },
          aiModel: {
            isTrained: false,
            confidence: 0,
            lastUpdated: null
          }
        });
      }
    }),
    {
      name: 'ai-recommendations-storage',
      partialize: (state) => ({
        userBehavior: state.userBehavior,
        recommendations: state.recommendations,
        aiModel: state.aiModel
      })
    }
  )
);
