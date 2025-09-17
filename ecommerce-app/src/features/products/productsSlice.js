import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for products
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock products data
      return [
        {
          id: 1,
          name: 'iPhone 15 Pro',
          price: 999,
          originalPrice: 1099,
          image: '/placeholder-product.jpg',
          description: 'Latest iPhone with advanced features',
          category: 'Electronics',
          rating: 4.8,
          reviews: 1250,
          inStock: true,
        },
        {
          id: 2,
          name: 'MacBook Pro',
          price: 1999,
          originalPrice: 2199,
          image: '/placeholder-product.jpg',
          description: 'Powerful laptop for professionals',
          category: 'Electronics',
          rating: 4.9,
          reviews: 890,
          inStock: true,
        },
        {
          id: 3,
          name: 'AirPods Pro',
          price: 249,
          originalPrice: 279,
          image: '/placeholder-product.jpg',
          description: 'Wireless earbuds with noise cancellation',
          category: 'Electronics',
          rating: 4.7,
          reviews: 2100,
          inStock: true,
        },
      ];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock single product data
      return {
        id: productId,
        name: `Product ${productId}`,
        price: 299,
        originalPrice: 349,
        image: '/placeholder-product.jpg',
        description: 'High-quality product with excellent features',
        category: 'Electronics',
        rating: 4.5,
        reviews: 500,
        inStock: true,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    isLoading: false,
    error: null,
    filters: {
      category: '',
      priceRange: { min: 0, max: 10000 },
      rating: 0,
      inStock: false,
    },
    sortBy: 'name',
    searchQuery: '',
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: { min: 0, max: 10000 },
        rating: 0,
        inStock: false,
      };
      state.sortBy = 'name';
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products async
      .addCase(fetchProductsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch product by ID async
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setProducts,
  setCurrentProduct,
  setFilters,
  setSortBy,
  setSearchQuery,
  clearFilters,
} = productsSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.items;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsLoading = (state) => state.products.isLoading;
export const selectProductsError = (state) => state.products.error;
export const selectProductsFilters = (state) => state.products.filters;
export const selectProductsSortBy = (state) => state.products.sortBy;
export const selectProductsSearchQuery = (state) => state.products.searchQuery;

export default productsSlice.reducer;
