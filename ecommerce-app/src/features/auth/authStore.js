import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth store for user authentication state
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Login action
      login: async (email, password) => {
        set({ isLoading: true });
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
            });
            return { success: true, user: data.user };
          } else {
            set({ isLoading: false });
            return { success: false, error: data.error };
          }
        } catch {
          set({ isLoading: false });
          return { success: false, error: 'Network error occurred' };
        }
      },

      // Register action
      register: async (userData) => {
        set({ isLoading: true });
        
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
            });
            return { success: true, user: data.user };
          } else {
            set({ isLoading: false });
            return { success: false, error: data.error };
          }
        } catch {
          set({ isLoading: false });
          return { success: false, error: 'Network error occurred' };
        }
      },

      // Logout action
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      // Check if user is admin
      isAdmin: () => {
        const user = get().user;
        return user && user.role === 'admin';
      },

      // Initialize auth from stored token
      initializeAuth: () => {
        const { token, user } = get();
        if (token && user) {
          // Verify token is still valid (in a real app, you'd validate with server)
          try {
            const tokenData = JSON.parse(atob(token));
            if (tokenData.userId && tokenData.role) {
              set({ isAuthenticated: true });
              return true;
            }
          } catch {
            // Token is invalid, clear auth state
            get().logout();
          }
        }
        return false;
      },

      // Update user profile
      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates }
          });
        }
      }
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
