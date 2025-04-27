// import axios from 'axios'; // Use api object instead
import axios from 'axios'; // Keep axios import for type checking if needed
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthResponse, AuthState, LoginCredentials, RegisterCredentials, User } from '../types/auth.types';
import { api } from '../utils/http'; // Use the interceptor-equipped api instance

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

// const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api` // Not needed here anymore

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
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

      // API methods using 'api' object
      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null });
          // Use api.post with correct type arguments
          const response = await api.post<AuthResponse, LoginCredentials>('/auth/login', credentials);
          const { user } = response.data;
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          // Error handling can rely more on the interceptor now
          const errorData = axios.isAxiosError(error) ? error.response?.data as { error?: string } : null;
          const errorMessage = errorData?.error || (error as Error).message || 'Login failed. Please try again.';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      register: async (credentials: RegisterCredentials) => {
        try {
          set({ isLoading: true, error: null });
          // Use api.post with correct type arguments
          await api.post<{ message: string }, RegisterCredentials>('/auth/register', credentials);
          set({ isLoading: false });
        } catch (error) {
          const errorData = axios.isAxiosError(error) ? error.response?.data as { error?: string } : null;
          const errorMessage = errorData?.error || (error as Error).message || 'Registration failed. Please try again.';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      logout: async () => {
        const wasAuthenticated = get().isAuthenticated; // Check before potentially clearing state
        try {
          set({ isLoading: true });
          // Use api.post - interceptor handles logout on severe errors if needed
          await api.post('/auth/logout', {});
          // Clear state after successful API call
          set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: null });
        } catch (error) {
          console.error('Logout API call error:', error);
          // Even if API fails, clear the frontend state
          set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: null });
        }
      },

      fetchCurrentUser: async () => {
        // if (get().isAuthenticated) return; // Optional optimization
        set({ isLoading: true, error: null });
        try {
          // Use api.get - interceptor will now handle 401 correctly for this route
          const response = await api.get<AuthResponse>('/auth/user');
          const { user } = response.data;
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          // Interceptor handles refresh logic; if it still fails (e.g., 401 on /auth/user), set unauthenticated
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log('fetchCurrentUser failed after interceptor (expected if unauthenticated).');
          } else {
            console.error('fetchCurrentUser error after interceptor:', error);
          }
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      loginWithGoogle: () => {
        // This remains the same
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/login/google`;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
