import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Async thunks for wishlist operations
export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlist',
  async (product, { getState }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return product;
  }
);

export const removeFromWishlistAsync = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { getState }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return productId;
  }
);

export const clearWishlistAsync = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, { getState }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return true;
  }
);

// Wishlist slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Synchronous actions
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (!existingItem) {
        state.items.push({
          ...product,
          addedAt: new Date().toISOString(),
        });
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },
    
    clearWishlist: (state) => {
      state.items = [];
    },
    
    setWishlistItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to wishlist async
      .addCase(addToWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const product = action.payload;
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (!existingItem) {
          state.items.push({
            ...product,
            addedAt: new Date().toISOString(),
          });
        }
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      // Remove from wishlist async
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const productId = action.payload;
        state.items = state.items.filter(item => item.id !== productId);
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      // Clear wishlist async
      .addCase(clearWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearWishlistAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.items = [];
      })
      .addCase(clearWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Persist configuration
const persistConfig = {
  key: 'wishlist',
  storage,
  whitelist: ['items'],
};

// Export persisted reducer
export const persistedWishlistReducer = persistReducer(persistConfig, wishlistSlice.reducer);

// Export actions
export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setWishlistItems,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistLoading = (state) => state.wishlist.isLoading;
export const selectWishlistError = (state) => state.wishlist.error;
export const selectIsInWishlist = (state, productId) => 
  state.wishlist.items.some(item => item.id === productId);

export default wishlistSlice.reducer;
