import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Social Store for reviews, sharing, and user-generated content
export const useSocialStore = create(
  persist(
    (set, get) => ({
      // Reviews data
      reviews: [],
      userReviews: [],
      
      // Social sharing
      shares: [],
      
      // User-generated content
      ugc: [], // User Generated Content (photos, videos)
      
      // Social features methods
      addReview: (productId, review) => {
        const newReview = {
          id: Date.now().toString(),
          productId,
          ...review,
          timestamp: new Date().toISOString(),
          helpful: 0,
          reported: false
        };

        set((state) => ({
          reviews: [newReview, ...state.reviews],
          userReviews: [newReview, ...state.userReviews]
        }));

        return newReview;
      },

      updateReview: (reviewId, updates) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === reviewId ? { ...review, ...updates } : review
          ),
          userReviews: state.userReviews.map(review =>
            review.id === reviewId ? { ...review, ...updates } : review
          )
        }));
      },

      deleteReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.filter(review => review.id !== reviewId),
          userReviews: state.userReviews.filter(review => review.id !== reviewId)
        }));
      },

      markReviewHelpful: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === reviewId 
              ? { ...review, helpful: review.helpful + 1 }
              : review
          )
        }));
      },

      reportReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === reviewId 
              ? { ...review, reported: true }
              : review
          )
        }));
      },

      getProductReviews: (productId) => {
        return get().reviews.filter(review => review.productId === productId);
      },

      getProductRating: (productId) => {
        const productReviews = get().getProductReviews(productId);
        if (productReviews.length === 0) return { average: 0, count: 0 };

        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        const average = totalRating / productReviews.length;

        return {
          average: Math.round(average * 10) / 10,
          count: productReviews.length
        };
      },

      // Social sharing
      shareProduct: (productId, platform, productData) => {
        const share = {
          id: Date.now().toString(),
          productId,
          platform,
          productData,
          timestamp: new Date().toISOString()
        };

        set((state) => ({
          shares: [share, ...state.shares]
        }));

        // Trigger actual sharing
        get().triggerShare(platform, productData);
        return share;
      },

      triggerShare: (platform, productData) => {
        const shareUrl = window.location.origin + `/products/${productData.id}`;
        const shareText = `Check out this amazing product: ${productData.name} - $${productData.price}`;

        switch (platform) {
          case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
            break;
          case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
            break;
          case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
            break;
          case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
            break;
          case 'telegram':
            window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
            break;
          case 'copy':
            navigator.clipboard.writeText(shareUrl).then(() => {
              alert('Product link copied to clipboard!');
            });
            break;
          case 'email':
            window.open(`mailto:?subject=${encodeURIComponent(productData.name)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`);
            break;
        }
      },

      // User-generated content
      addUGC: (productId, content) => {
        const newUGC = {
          id: Date.now().toString(),
          productId,
          ...content,
          timestamp: new Date().toISOString(),
          likes: 0,
          reported: false
        };

        set((state) => ({
          ugc: [newUGC, ...state.ugc]
        }));

        return newUGC;
      },

      likeUGC: (ugcId) => {
        set((state) => ({
          ugc: state.ugc.map(item =>
            item.id === ugcId 
              ? { ...item, likes: item.likes + 1 }
              : item
          )
        }));
      },

      getProductUGC: (productId) => {
        return get().ugc.filter(item => item.productId === productId);
      },

      // Social analytics
      getSocialStats: (productId) => {
        const reviews = get().getProductReviews(productId);
        const shares = get().shares.filter(share => share.productId === productId);
        const ugc = get().getProductUGC(productId);

        return {
          reviews: reviews.length,
          shares: shares.length,
          ugc: ugc.length,
          totalEngagement: reviews.length + shares.length + ugc.length
        };
      },

      // Clear all data (for testing)
      clearAllData: () => {
        set({
          reviews: [],
          userReviews: [],
          shares: [],
          ugc: []
        });
      }
    }),
    {
      name: 'social-storage',
      partialize: (state) => ({
        reviews: state.reviews.slice(-200), // Keep last 200 reviews
        userReviews: state.userReviews,
        shares: state.shares.slice(-100), // Keep last 100 shares
        ugc: state.ugc.slice(-50) // Keep last 50 UGC items
      })
    }
  )
);
