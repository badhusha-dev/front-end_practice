import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Wishlist store for managing user's favorite products
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,

      // Add item to wishlist
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            return state; // Item already in wishlist
          }

          const newItems = [...state.items, product];
          return {
            items: newItems,
            itemCount: newItems.length
          };
        });
      },

      // Remove item from wishlist
      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter(item => item.id !== productId);
          return {
            items: newItems,
            itemCount: newItems.length
          };
        });
      },

      // Check if item is in wishlist
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      },

      // Clear entire wishlist
      clearWishlist: () => {
        set({
          items: [],
          itemCount: 0
        });
      },

      // Move item from wishlist to cart
      moveToCart: (productId, cartStore) => {
        const item = get().items.find(item => item.id === productId);
        if (item && cartStore) {
          cartStore.addItem(item, 1);
          get().removeItem(productId);
        }
      },

      // Get wishlist items count
      getItemCount: () => {
        return get().itemCount;
      }
    }),
    {
      name: 'wishlist-storage', // unique name for localStorage
      partialize: (state) => ({
        items: state.items,
        itemCount: state.itemCount
      })
    }
  )
);
