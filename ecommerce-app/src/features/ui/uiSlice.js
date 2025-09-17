import { createSlice } from '@reduxjs/toolkit';

// UI slice for managing UI state
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    // Modal states
    isCartModalOpen: false,
    isWishlistModalOpen: false,
    isComparisonModalOpen: false,
    isSearchModalOpen: false,
    isAuthModalOpen: false,
    isAnalyticsModalOpen: false,
    isSocialShareModalOpen: false,
    
    // Sidebar states
    isSidebarOpen: false,
    isMobileMenuOpen: false,
    
    // Loading states
    isPageLoading: false,
    isComponentLoading: false,
    
    // Theme and appearance
    theme: 'light',
    isDarkMode: false,
    
    // Mobile detection
    isMobile: false,
    screenSize: 'desktop',
    
    // Toast notifications
    toastQueue: [],
    
    // Search state
    searchQuery: '',
    searchSuggestions: [],
    isSearchFocused: false,
  },
  reducers: {
    // Modal actions
    openCartModal: (state) => {
      state.isCartModalOpen = true;
    },
    closeCartModal: (state) => {
      state.isCartModalOpen = false;
    },
    
    openWishlistModal: (state) => {
      state.isWishlistModalOpen = true;
    },
    closeWishlistModal: (state) => {
      state.isWishlistModalOpen = false;
    },
    
    openComparisonModal: (state) => {
      state.isComparisonModalOpen = true;
    },
    closeComparisonModal: (state) => {
      state.isComparisonModalOpen = false;
    },
    
    openSearchModal: (state) => {
      state.isSearchModalOpen = true;
    },
    closeSearchModal: (state) => {
      state.isSearchModalOpen = false;
    },
    
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    
    openAnalyticsModal: (state) => {
      state.isAnalyticsModalOpen = true;
    },
    closeAnalyticsModal: (state) => {
      state.isAnalyticsModalOpen = false;
    },
    
    openSocialShareModal: (state) => {
      state.isSocialShareModalOpen = true;
    },
    closeSocialShareModal: (state) => {
      state.isSocialShareModalOpen = false;
    },
    
    // Sidebar actions
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    
    // Loading actions
    setPageLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },
    setComponentLoading: (state, action) => {
      state.isComponentLoading = action.payload;
    },
    
    // Theme actions
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      state.isDarkMode = action.payload === 'dark';
    },
    
    // Screen size actions
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
      state.isMobile = action.payload === 'mobile';
    },
    
    // Toast actions
    addToast: (state, action) => {
      const toast = {
        id: Date.now(),
        ...action.payload,
      };
      state.toastQueue.push(toast);
    },
    removeToast: (state, action) => {
      state.toastQueue = state.toastQueue.filter(toast => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toastQueue = [];
    },
    
    // Search actions
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchSuggestions: (state, action) => {
      state.searchSuggestions = action.payload;
    },
    setSearchFocused: (state, action) => {
      state.isSearchFocused = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.searchSuggestions = [];
      state.isSearchFocused = false;
    },
  },
});

// Export actions
export const {
  // Modal actions
  openCartModal,
  closeCartModal,
  openWishlistModal,
  closeWishlistModal,
  openComparisonModal,
  closeComparisonModal,
  openSearchModal,
  closeSearchModal,
  openAuthModal,
  closeAuthModal,
  openAnalyticsModal,
  closeAnalyticsModal,
  openSocialShareModal,
  closeSocialShareModal,
  
  // Sidebar actions
  toggleSidebar,
  openSidebar,
  closeSidebar,
  toggleMobileMenu,
  openMobileMenu,
  closeMobileMenu,
  
  // Loading actions
  setPageLoading,
  setComponentLoading,
  
  // Theme actions
  toggleTheme,
  setTheme,
  
  // Screen size actions
  setScreenSize,
  
  // Toast actions
  addToast,
  removeToast,
  clearToasts,
  
  // Search actions
  setSearchQuery,
  setSearchSuggestions,
  setSearchFocused,
  clearSearch,
} = uiSlice.actions;

// Selectors
export const selectIsCartModalOpen = (state) => state.ui.isCartModalOpen;
export const selectIsWishlistModalOpen = (state) => state.ui.isWishlistModalOpen;
export const selectIsComparisonModalOpen = (state) => state.ui.isComparisonModalOpen;
export const selectIsSearchModalOpen = (state) => state.ui.isSearchModalOpen;
export const selectIsAuthModalOpen = (state) => state.ui.isAuthModalOpen;
export const selectIsAnalyticsModalOpen = (state) => state.ui.isAnalyticsModalOpen;
export const selectIsSocialShareModalOpen = (state) => state.ui.isSocialShareModalOpen;

export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;
export const selectIsMobileMenuOpen = (state) => state.ui.isMobileMenuOpen;

export const selectIsPageLoading = (state) => state.ui.isPageLoading;
export const selectIsComponentLoading = (state) => state.ui.isComponentLoading;

export const selectTheme = (state) => state.ui.theme;
export const selectIsDarkMode = (state) => state.ui.isDarkMode;

export const selectIsMobile = (state) => state.ui.isMobile;
export const selectScreenSize = (state) => state.ui.screenSize;

export const selectToastQueue = (state) => state.ui.toastQueue;

export const selectSearchQuery = (state) => state.ui.searchQuery;
export const selectSearchSuggestions = (state) => state.ui.searchSuggestions;
export const selectIsSearchFocused = (state) => state.ui.isSearchFocused;

export default uiSlice.reducer;
