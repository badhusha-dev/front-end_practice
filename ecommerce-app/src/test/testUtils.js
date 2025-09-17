import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistedCartReducer,
} from '../features/cart/cartSlice';
import { persistedWishlistReducer } from '../features/wishlist/wishlistSlice';
import { persistedComparisonReducer } from '../features/comparison/comparisonSlice';
import { persistedAuthReducer } from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import ordersReducer from '../features/orders/ordersSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import uiReducer from '../features/ui/uiSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';

// Test utilities
export const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

// Create a realistic test store using app reducers but with in-memory storage
const createTestStore = (preloadedState) => {
  const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'wishlist', 'comparison', 'auth'],
  };

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

  const persisted = persistReducer(rootPersistConfig, rootReducer);

  return configureStore({
    reducer: persisted,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'],
        },
      }),
  });
};

export const renderWithProviders = (
  ui,
  {
    route = '/',
    preloadedState,
    store = createTestStore(preloadedState),
    queryClient = createTestQueryClient(),
  } = {}
) => {
  window.history.pushState({}, 'Test Page', route);

  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <PersistGate persistor={{
        // Minimal fake persistor for tests; PersistGate requires an object with subscribe/getState/dispatch
        subscribe: () => () => {},
        getState: () => ({}),
        dispatch: () => {},
        persist: () => {},
        purge: () => Promise.resolve(),
        flush: () => Promise.resolve(),
        pause: () => {},
        persistAsync: () => Promise.resolve(),
        rehydrate: () => {},
      }}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );

  return {
    ...render(ui, { wrapper: Wrapper }),
    store,
    queryClient,
  };
};

// Mock common APIs
export const mockAPIs = () => {
  // Mock fetch
  global.fetch = vi.fn();
  
  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  // Mock sessionStorage
  const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
  });

  // Mock navigator
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn(),
      readText: vi.fn(),
    },
  });

  // Mock mediaDevices
  Object.defineProperty(navigator, 'mediaDevices', {
    value: {
      getUserMedia: vi.fn(() => Promise.resolve({
        getTracks: () => [],
      })),
    },
  });

  // Mock Web Speech API
  Object.defineProperty(window, 'SpeechRecognition', {
    value: class SpeechRecognition {
      constructor() {
        this.start = vi.fn();
        this.stop = vi.fn();
        this.abort = vi.fn();
        this.onresult = null;
        this.onerror = null;
        this.onend = null;
      }
    },
  });

  // Mock WebRTC
  Object.defineProperty(window, 'RTCPeerConnection', {
    value: class RTCPeerConnection {
      constructor() {
        this.createOffer = vi.fn(() => Promise.resolve({}));
        this.createAnswer = vi.fn(() => Promise.resolve({}));
        this.setLocalDescription = vi.fn(() => Promise.resolve());
        this.setRemoteDescription = vi.fn(() => Promise.resolve());
        this.addIceCandidate = vi.fn(() => Promise.resolve());
        this.close = vi.fn();
      }
    },
  });

  return { localStorageMock, sessionStorageMock };
};

// Test data factories
export const createMockProduct = (overrides = {}) => ({
  id: 1,
  name: 'Test Product',
  price: 99.99,
  description: 'Test product description',
  image: '/test-image.jpg',
  category: 'electronics',
  brand: 'Test Brand',
  rating: 4.5,
  reviews: 100,
  inStock: true,
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: 1,
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'user',
  ...overrides,
});

export const createMockOrder = (overrides = {}) => ({
  id: 1,
  userId: 1,
  items: [createMockProduct()],
  total: 99.99,
  status: 'pending',
  createdAt: new Date().toISOString(),
  ...overrides,
});

// Common test helpers
export const waitForLoadingToFinish = () => 
  waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

export const expectElementToBeInDocument = (element) => {
  expect(element).toBeInTheDocument();
};

export const expectElementNotToBeInDocument = (element) => {
  expect(element).not.toBeInTheDocument();
};

// Test suite for common functionality
describe('Common Test Utilities', () => {
  beforeEach(() => {
    mockAPIs();
  });

  it('should create test query client', () => {
    const queryClient = createTestQueryClient();
    expect(queryClient).toBeDefined();
  });

  it('should create mock product', () => {
    const product = createMockProduct();
    expect(product.id).toBe(1);
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(99.99);
  });

  it('should create mock user', () => {
    const user = createMockUser();
    expect(user.id).toBe(1);
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('user');
  });

  it('should create mock order', () => {
    const order = createMockOrder();
    expect(order.id).toBe(1);
    expect(order.userId).toBe(1);
    expect(order.items).toHaveLength(1);
    expect(order.total).toBe(99.99);
  });
});
