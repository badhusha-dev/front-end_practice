import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart store using Zustand for state management
export const useCartStore = create(
  persist(
    (set, get) => ({
      // Cart state
      items: [],
      total: 0,
      itemCount: 0,

      // Add item to cart
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            // Update quantity if item already exists
            const updatedItems = state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            
            const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const newItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
            
            return {
              items: updatedItems,
              total: newTotal,
              itemCount: newItemCount
            };
          } else {
            // Add new item to cart
            const newItem = {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity,
              maxStock: product.stock
            };
            
            const newItems = [...state.items, newItem];
            const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
            
            return {
              items: newItems,
              total: newTotal,
              itemCount: newItemCount
            };
          }
        });
      },

      // Remove item from cart
      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter(item => item.id !== productId);
          const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
          
          return {
            items: newItems,
            total: newTotal,
            itemCount: newItemCount
          };
        });
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            const newItems = state.items.filter(item => item.id !== productId);
            const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
            
            return {
              items: newItems,
              total: newTotal,
              itemCount: newItemCount
            };
          }

          const updatedItems = state.items.map(item =>
            item.id === productId
              ? { ...item, quantity: Math.min(quantity, item.maxStock) }
              : item
          );
          
          const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const newItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          
          return {
            items: updatedItems,
            total: newTotal,
            itemCount: newItemCount
          };
        });
      },

      // Clear entire cart
      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0
        });
      },

      // Check if item is in cart
      isInCart: (productId) => {
        return get().items.some(item => item.id === productId);
      },

      // Get item quantity in cart
      getItemQuantity: (productId) => {
        const item = get().items.find(item => item.id === productId);
        return item ? item.quantity : 0;
      }
    }),
    {
      name: 'cart-storage', // localStorage key
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount
      })
    }
  )
);
