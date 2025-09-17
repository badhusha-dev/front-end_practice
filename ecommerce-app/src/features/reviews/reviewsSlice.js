import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.items = action.payload;
    },
    addReview: (state, action) => {
      state.items.push(action.payload);
    },
    updateReview: (state, action) => {
      const index = state.items.findIndex(review => review.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteReview: (state, action) => {
      state.items = state.items.filter(review => review.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setReviews,
  addReview,
  updateReview,
  deleteReview,
  setLoading,
  setError,
  clearError,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;

