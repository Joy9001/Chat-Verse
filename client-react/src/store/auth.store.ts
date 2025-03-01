import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, LoginCredentials, RegisterCredentials, User } from '../types/auth.types';

interface AuthStore extends AuthState {
  // User data
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Auth methods
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // API methods
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  loginWithGoogle: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // State setters
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      
      // API methods
      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null });
          const response = await axios.post('/api/auth/login', credentials, {
            withCredentials: true,
          });
          const { user } = response.data;
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          const errorMessage = 
            axios.isAxiosError(error) && error.response?.data?.error
              ? error.response.data.error
              : 'Login failed. Please try again.';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      register: async (credentials) => {
        try {
          set({ isLoading: true, error: null });
          await axios.post('/api/auth/register', credentials, {
            withCredentials: true,
          });
          set({ isLoading: false });
        } catch (error) {
          const errorMessage = 
            axios.isAxiosError(error) && error.response?.data?.error
              ? error.response.data.error
              : 'Registration failed. Please try again.';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      logout: async () => {
        try {
          set({ isLoading: true });
          await axios.post('/api/auth/logout', {}, { withCredentials: true });
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          console.error('Logout error:', error);
          // Still clear user data even if API call fails
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      },
      
      fetchCurrentUser: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await axios.get('/api/auth/user', {
            withCredentials: true,
          });
          const { user } = response.data;
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          // Don't set error on user fetch - just clear auth state
          console.log(error);
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
      
      loginWithGoogle: () => {
        window.location.href = '/api/auth/login/google';
      },
    }),
    {
      name: 'auth-storage',
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
