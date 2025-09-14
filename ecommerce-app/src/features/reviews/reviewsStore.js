import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Reviews store for managing product reviews and ratings
export const useReviewsStore = create(
  persist(
    (set, get) => ({
      reviews: {}, // { productId: [reviews] }

      // Add a review for a product
      addReview: (productId, review) => {
        set((state) => {
          const productReviews = state.reviews[productId] || [];
          const newReview = {
            id: Date.now().toString(),
            ...review,
            createdAt: new Date().toISOString(),
            helpful: 0,
            reported: false
          };
          
          const updatedReviews = [...productReviews, newReview];
          
          return {
            reviews: {
              ...state.reviews,
              [productId]: updatedReviews
            }
          };
        });
      },

      // Get reviews for a specific product
      getReviews: (productId) => {
        return get().reviews[productId] || [];
      },

      // Get average rating for a product
      getAverageRating: (productId) => {
        const reviews = get().getReviews(productId);
        if (reviews.length === 0) return 0;
        
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return Math.round((totalRating / reviews.length) * 10) / 10; // Round to 1 decimal
      },

      // Get rating distribution for a product
      getRatingDistribution: (productId) => {
        const reviews = get().getReviews(productId);
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        
        reviews.forEach(review => {
          distribution[review.rating]++;
        });
        
        return distribution;
      },

      // Mark a review as helpful
      markHelpful: (productId, reviewId, userId) => {
        set((state) => {
          const productReviews = state.reviews[productId] || [];
          const updatedReviews = productReviews.map(review => {
            if (review.id === reviewId) {
              return {
                ...review,
                helpful: review.helpful + 1,
                helpfulUsers: [...(review.helpfulUsers || []), userId]
              };
            }
            return review;
          });

          return {
            reviews: {
              ...state.reviews,
              [productId]: updatedReviews
            }
          };
        });
      },

      // Report a review
      reportReview: (productId, reviewId) => {
        set((state) => {
          const productReviews = state.reviews[productId] || [];
          const updatedReviews = productReviews.map(review => {
            if (review.id === reviewId) {
              return {
                ...review,
                reported: true
              };
            }
            return review;
          });

          return {
            reviews: {
              ...state.reviews,
              [productId]: updatedReviews
            }
          };
        });
      },

      // Delete a review (admin or owner only)
      deleteReview: (productId, reviewId) => {
        set((state) => {
          const productReviews = state.reviews[productId] || [];
          const updatedReviews = productReviews.filter(review => review.id !== reviewId);

          return {
            reviews: {
              ...state.reviews,
              [productId]: updatedReviews
            }
          };
        });
      },

      // Get reviews by user
      getUserReviews: (userId) => {
        const allReviews = get().reviews;
        const userReviews = [];
        
        Object.keys(allReviews).forEach(productId => {
          const reviews = allReviews[productId];
          reviews.forEach(review => {
            if (review.userId === userId) {
              userReviews.push({ ...review, productId });
            }
          });
        });
        
        return userReviews;
      },

      // Clear all reviews (for testing)
      clearAllReviews: () => {
        set({ reviews: {} });
      }
    }),
    {
      name: 'reviews-storage',
      partialize: (state) => ({
        reviews: state.reviews
      })
    }
  )
);
