import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for orders
export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        id: Date.now(),
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrdersAsync = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock orders data
      return [
        {
          id: 1,
          items: [
            { id: 1, name: 'iPhone 15 Pro', price: 999, quantity: 1 },
            { id: 2, name: 'AirPods Pro', price: 249, quantity: 1 },
          ],
          total: 1248,
          status: 'delivered',
          createdAt: '2024-01-15T10:30:00Z',
          shippingAddress: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
          },
        },
        {
          id: 2,
          items: [
            { id: 3, name: 'MacBook Pro', price: 1999, quantity: 1 },
          ],
          total: 1999,
          status: 'shipped',
          createdAt: '2024-01-20T14:15:00Z',
          shippingAddress: {
            street: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90210',
          },
        },
      ];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Orders slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    currentOrder: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
    },
    
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.items.find(order => order.id === orderId);
      if (order) {
        order.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order async
      .addCase(createOrderAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
        state.error = null;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch orders async
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setOrders,
  setCurrentOrder,
  updateOrderStatus,
} = ordersSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.items;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrdersLoading = (state) => state.orders.isLoading;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;
