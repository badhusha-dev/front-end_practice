import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useI18nStore } from '../i18nStore';

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

// Mock document.documentElement
Object.defineProperty(document, 'documentElement', {
  value: {
    dir: '',
    lang: '',
  },
  writable: true,
});

describe('I18n Store', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  it('should initialize with default values', () => {
    const store = useI18nStore.getState();
    
    expect(store.currentLanguage).toBe('en');
    expect(store.availableLanguages).toBeDefined();
    expect(store.availableLanguages.length).toBeGreaterThan(0);
    expect(store.translations).toBeDefined();
  });

  it('should set language', () => {
    const { setLanguage } = useI18nStore.getState();
    
    setLanguage('es');
    
    expect(useI18nStore.getState().currentLanguage).toBe('es');
  });

  it('should get translation', () => {
    const { getTranslation } = useI18nStore.getState();
    
    const translation = getTranslation('common.loading');
    
    expect(translation).toBe('Loading...');
  });

  it('should get translation with parameters', () => {
    const { getTranslation } = useI18nStore.getState();
    
    const translation = getTranslation('cart.itemCount', { count: 5 });
    
    expect(translation).toBe('5 item(s)');
  });

  it('should get current language', () => {
    const { getCurrentLanguage } = useI18nStore.getState();
    
    const language = getCurrentLanguage();
    
    expect(language).toBeDefined();
    expect(language.code).toBe('en');
    expect(language.name).toBe('English');
  });

  it('should check if RTL', () => {
    const { isRTL } = useI18nStore.getState();
    
    const rtl = isRTL();
    
    expect(typeof rtl).toBe('boolean');
  });

  it('should format number', () => {
    const { formatNumber } = useI18nStore.getState();
    
    const formatted = formatNumber(1234.56);
    
    expect(formatted).toBeDefined();
  });

  it('should format currency', () => {
    const { formatCurrency } = useI18nStore.getState();
    
    const formatted = formatCurrency(123.45);
    
    expect(formatted).toBeDefined();
  });

  it('should format date', () => {
    const { formatDate } = useI18nStore.getState();
    
    const formatted = formatDate(new Date());
    
    expect(formatted).toBeDefined();
  });

  it('should format relative time', () => {
    const { formatRelativeTime } = useI18nStore.getState();
    
    const formatted = formatRelativeTime(new Date());
    
    expect(formatted).toBeDefined();
  });

  it('should handle Spanish language', () => {
    const { setLanguage, getTranslation } = useI18nStore.getState();
    
    setLanguage('es');
    const translation = getTranslation('common.loading');
    
    expect(translation).toBe('Cargando...');
  });

  it('should handle French language', () => {
    const { setLanguage, getTranslation } = useI18nStore.getState();
    
    setLanguage('fr');
    const translation = getTranslation('common.loading');
    
    expect(translation).toBe('Chargement...');
  });
});
