import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

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

// Mock navigator APIs
if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn(),
      readText: vi.fn(),
    },
    writable: true,
    configurable: true,
  });
}

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

Object.defineProperty(window, 'webkitSpeechRecognition', {
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

// Mock URL.createObjectURL
Object.defineProperty(URL, 'createObjectURL', {
  value: vi.fn(() => 'mock-object-url'),
});

Object.defineProperty(URL, 'revokeObjectURL', {
  value: vi.fn(),
});

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is deprecated') ||
     args[0].includes('Warning: ReactDOM.hydrate is deprecated') ||
     args[0].includes('Warning: componentWillReceiveProps') ||
     args[0].includes('Warning: componentWillMount'))
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};

console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is deprecated') ||
     args[0].includes('Warning: ReactDOM.hydrate is deprecated'))
  ) {
    return;
  }
  originalConsoleWarn.call(console, ...args);
};

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  sessionStorageMock.getItem.mockClear();
  sessionStorageMock.setItem.mockClear();
  sessionStorageMock.removeItem.mockClear();
  sessionStorageMock.clear.mockClear();
});

// Restore console methods after all tests
afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Ensure react-router-dom partial mocks don't remove BrowserRouter
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    // tests may override useNavigate/useLocation in individual suites
  };
});

// Provide default mocks for zustand stores used in tests when not mocked
try {
  vi.mock('../features/cart/cartStore', () => ({
    useCartStore: () => ({
      items: [],
      total: 0,
      itemCount: 0,
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      clearCart: vi.fn(),
      addItem: vi.fn(),
      isInCart: vi.fn(() => false),
    }),
  }));
} catch {}

try {
  vi.mock('../features/auth/authStore', () => ({
    useAuthStore: () => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    }),
  }));
} catch {}

// Force i18n store to English by default
try {
  const { useI18nStore } = await import('../features/i18n/i18nStore');
  useI18nStore.setState({ currentLanguage: 'en' });
} catch {}