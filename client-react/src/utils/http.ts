import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useAuthStore } from '@/store/auth.store'

// Default config for axios
const axiosConfig: AxiosRequestConfig = {
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}

// Create axios instance
const http = axios.create(axiosConfig)

// Add request interceptor
http.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    // For example, add an auth token if using token-based auth
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Try to refresh the token
        await axios.get('/api/auth/refresh-token', { withCredentials: true })
        
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
    
    return Promise.reject(error)
  }
)

export default http
