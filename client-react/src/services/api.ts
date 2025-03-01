import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 403 and we haven't retried yet
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Attempt to refresh the token and retry the original request
      // If this fails, the error will propagate naturally
      await axios.get('/api/auth/refresh-token', { withCredentials: true });
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

// Export the API instance for direct use in components
export default api;

// We no longer need the authApi object as those methods are now in the auth store
