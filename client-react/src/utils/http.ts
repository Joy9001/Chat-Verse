import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useAuthStore } from '@/store/auth.store'

/**
 * Consolidated HTTP client for API communication
 * Combines functionality from multiple utilities into a single robust solution
 */

// Define types for error responses
interface ErrorResponse {
  error?: string;
  message?: string;
  [key: string]: unknown;
}

// Environment-specific configuration
const API_BASE_URL = 'http://localhost:3001/api'

// Default config for axios
const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies/sessions
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
}

// Create axios instance
const http = axios.create(axiosConfig)

/**
 * Request interceptor
 * - Adds authentication headers if needed
 * - Can be extended for logging, metrics, etc.
 */
http.interceptors.request.use(
  (config) => {
    // You can add auth tokens from local storage or state if needed
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    
    // Add any request-specific headers or transformations
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

/**
 * Response interceptor
 * - Handles common error scenarios (401, 403, etc.)
 * - Manages token refresh
 * - Provides consistent error handling
 */
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    
    // Handle token expiration (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Try to refresh the token
        await axios.get(`${API_BASE_URL}/auth/refresh-token`, { withCredentials: true })
        
        // Retry the original request
        return http(originalRequest)
      } catch (refreshError) {
        // If refresh fails, logout the user
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      }
    }
    
    // Handle 403 Forbidden errors
    if (error.response?.status === 403) {
      console.error('Permission denied')
      // You could redirect to a forbidden page or show a notification
    }
    
    // Handle 404 Not Found errors
    if (error.response?.status === 404) {
      console.error('Resource not found')
      // You could redirect to a 404 page
    }
    
    // Handle 500 Server Error
    if (error.response?.status && error.response.status >= 500) {
      console.error('Server error')
      // You could redirect to an error page or show a notification
    }
    
    // Extract the most useful error message
    const errorResponse = error.response?.data as ErrorResponse
    const errorMessage = 
      errorResponse.error ||
      errorResponse.message ||
      error.message ||
      'An unexpected error occurred'
    
    // Enhance the error object with a more useful message
    const enhancedError = error
    if (axios.isAxiosError(enhancedError)) {
      enhancedError.message = errorMessage
    }
    
    return Promise.reject(enhancedError)
  }
)

/**
 * API helper methods for common operations
 */
export const api = {
  // Basic CRUD operations
  get: <T>(url: string, config?: AxiosRequestConfig) => http.get<T>(url, config),
  post: <T, D = Record<string, unknown>>(url: string, data?: D, config?: AxiosRequestConfig) => http.post<T>(url, data, config),
  put: <T, D = Record<string, unknown>>(url: string, data?: D, config?: AxiosRequestConfig) => http.put<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => http.delete<T>(url, config),
  patch: <T, D = Record<string, unknown>>(url: string, data?: D, config?: AxiosRequestConfig) => http.patch<T>(url, data, config),
  
  // Additional helper methods
  uploadFile: (url: string, file: File, onProgress?: (percentage: number) => void) => {
    const formData = new FormData()
    formData.append('file', file)
    
    return http.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentage)
        }
      },
    })
  },
}

// Default export for backward compatibility
export default http
