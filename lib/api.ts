import axios, { AxiosInstance } from 'axios';

/**
 * API Client
 * Configured to communicate with the backend server
 * Handles authentication via cookies (httpOnly)
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // On 401, don't automatically redirect - let the calling code handle it
    // This prevents infinite redirects and allows proper error handling
    if (error.response?.status === 401) {
      // Only redirect for non-auth endpoints
      const url = error.config?.url || '';
      if (!url.includes('/auth/me') && !url.includes('/auth/login')) {
        if (typeof window !== 'undefined') {
          console.warn('Unauthorized - consider redirecting to login');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
