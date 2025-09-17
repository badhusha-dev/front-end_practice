import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Async thunks for comparison operations
export const addToComparisonAsync = createAsyncThunk(
  'comparison/addToComparison',
  async (product, { getState }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return product;
  }
);

export const removeFromComparisonAsync = createAsyncThunk(
  'comparison/removeFromComparison',
  async (productId, { getState }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return productId;
  }
);

export const clearComparisonAsync = createAsyncThunk(
  'comparison/clearComparison',
  async (_, { getState }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return true;
  }
);

// Comparison slice
const comparisonSlice = createSlice({
  name: 'comparison',
  initialState: {
    items: [],
    maxItems: 4, // Maximum items that can be compared
    isLoading: false,
    error: null,
  },
  reducers: {
    // Synchronous actions
    addToComparison: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (!existingItem && state.items.length < state.maxItems) {
        state.items.push({
          ...product,
          addedAt: new Date().toISOString(),
        });
      }
    },
    
    removeFromComparison: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },
    
    clearComparison: (state) => {
      state.items = [];
    },
    
    setComparisonItems: (state, action) => {
      state.items = action.payload.slice(0, state.maxItems);
    },
    
    setMaxItems: (state, action) => {
      state.maxItems = action.payload;
      if (state.items.length > state.maxItems) {
        state.items = state.items.slice(0, state.maxItems);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to comparison async
      .addCase(addToComparisonAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToComparisonAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const product = action.payload;
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (!existingItem && state.items.length < state.maxItems) {
          state.items.push({
            ...product,
            addedAt: new Date().toISOString(),
          });
        }
      })
      .addCase(addToComparisonAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      // Remove from comparison async
      .addCase(removeFromComparisonAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromComparisonAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const productId = action.payload;
        state.items = state.items.filter(item => item.id !== productId);
      })
      .addCase(removeFromComparisonAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      // Clear comparison async
      .addCase(clearComparisonAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearComparisonAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.items = [];
      })
      .addCase(clearComparisonAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Persist configuration
const persistConfig = {
  key: 'comparison',
  storage,
  whitelist: ['items'],
};

// Export persisted reducer
export const persistedComparisonReducer = persistReducer(persistConfig, comparisonSlice.reducer);

// Export actions
export const {
  addToComparison,
  removeFromComparison,
  clearComparison,
  setComparisonItems,
  setMaxItems,
} = comparisonSlice.actions;

// Selectors
export const selectComparisonItems = (state) => state.comparison.items;
export const selectComparisonLoading = (state) => state.comparison.isLoading;
export const selectComparisonError = (state) => state.comparison.error;
export const selectIsInComparison = (state, productId) => 
  state.comparison.items.some(item => item.id === productId);
export const selectCanAddToComparison = (state) => 
  state.comparison.items.length < state.comparison.maxItems;
export const selectMaxComparisonItems = (state) => state.comparison.maxItems;

export default comparisonSlice.reducer;
