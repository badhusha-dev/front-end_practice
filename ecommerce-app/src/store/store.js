import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import persisted reducers
import { persistedCartReducer } from '../features/cart/cartSlice';
import { persistedWishlistReducer } from '../features/wishlist/wishlistSlice';
import { persistedComparisonReducer } from '../features/comparison/comparisonSlice';
import { persistedAuthReducer } from '../features/auth/authSlice';

// Import regular reducers
import productsReducer from '../features/products/productsSlice';
import ordersReducer from '../features/orders/ordersSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import uiReducer from '../features/ui/uiSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';

// Root persist config
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'wishlist', 'comparison', 'auth'],
};

// Root reducer
const rootReducer = combineReducers({
  cart: persistedCartReducer,
  wishlist: persistedWishlistReducer,
  comparison: persistedComparisonReducer,
  auth: persistedAuthReducer,
  products: productsReducer,
  orders: ordersReducer,
  notifications: notificationsReducer,
  ui: uiReducer,
  reviews: reviewsReducer,
});

// Persisted root reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);

// Type definitions for TypeScript-like usage
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
