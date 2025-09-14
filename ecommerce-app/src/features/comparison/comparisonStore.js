import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Product comparison store
export const useComparisonStore = create(
  persist(
    (set, get) => ({
      items: [],
      maxItems: 4, // Maximum 4 products for comparison

      // Add product to comparison
      addItem: (product) => {
        set((state) => {
          // Check if product already exists
          const existingItem = state.items.find(item => item.id === product.id);
          if (existingItem) {
            return state; // Product already in comparison
          }

          // Check if we've reached the maximum limit
          if (state.items.length >= state.maxItems) {
            return state; // Cannot add more items
          }

          const newItems = [...state.items, product];
          return { items: newItems };
        });
      },

      // Remove product from comparison
      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter(item => item.id !== productId);
          return { items: newItems };
        });
      },

      // Clear all items from comparison
      clearComparison: () => {
        set({ items: [] });
      },

      // Check if product is in comparison
      isInComparison: (productId) => {
        return get().items.some(item => item.id === productId);
      },

      // Check if comparison is full
      isFull: () => {
        return get().items.length >= get().maxItems;
      },

      // Get items count
      getItemCount: () => {
        return get().items.length;
      },

      // Check if can add more items
      canAddMore: () => {
        return get().items.length < get().maxItems;
      }
    }),
    {
      name: 'comparison-storage',
      partialize: (state) => ({
        items: state.items
      })
    }
  )
);
