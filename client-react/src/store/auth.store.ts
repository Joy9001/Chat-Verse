import axios from 'axios';
import { api } from '../utils/http';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, LoginCredentials, RegisterCredentials, User, AuthResponse } from '../types/auth.types';

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
          const response = await api.post<AuthResponse, LoginCredentials>('/auth/login', credentials);
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
          await api.post<{ message: string }, RegisterCredentials>('/auth/register', credentials);
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
          await api.post<{ message: string }, Record<string, never>>('/auth/logout', {});
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
          const response = await api.get<AuthResponse>('/auth/user');
          const { user } = response.data;
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          // Don't set error on user fetch - just clear auth state
          console.log(error);
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
      
      loginWithGoogle: () => {
        window.location.href = 'http://localhost:3001/api/auth/login/google';
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
