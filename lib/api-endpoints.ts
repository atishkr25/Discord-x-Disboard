import apiClient from './api';

/**
 * Authentication API endpoints
 */
export const authAPI = {
  /**
   * Get current user info
   */
  getMe: () => apiClient.get('/auth/me'),

  /**
   * Logout
   */
  logout: () => apiClient.post('/auth/logout'),

  /**
   * Get user's Discord guilds
   */
  getGuilds: () => apiClient.get('/auth/guilds'),
};

/**
 * Server listing API endpoints
 */
export const serverAPI = {
  /**
   * Get all approved servers (public)
   * @param page - Page number (1-indexed)
   * @param limit - Items per page
   */
  getServers: (page: number = 1, limit: number = 12) =>
    apiClient.get('/servers', { params: { page, limit } }),

  /**
   * Get trending servers
   */
  getTrending: () => apiClient.get('/servers/trending'),

  /**
   * Search servers by tag
   * @param tag - Tag to search for
   */
  searchByTag: (tag: string) =>
    apiClient.get('/servers/search', { params: { tag } }),

  /**
   * Get single server details
   */
  getServer: (id: string) => apiClient.get(`/servers/${id}`),

  /**
   * Get user's own servers
   */
  getMyServers: () => apiClient.get('/servers/me'),

  /**
   * Register a new server
   */
  registerServer: (data: {
    guildId: string;
    name: string;
    description: string;
    icon?: string;
    tags: string[];
    inviteLink: string;
  }) => apiClient.post('/servers', data),

  /**
   * Update server info
   */
  updateServer: (id: string, data: Partial<any>) =>
    apiClient.put(`/servers/${id}`, data),

  /**
   * Delete a server listing
   */
  deleteServer: (id: string) => apiClient.delete(`/servers/${id}`),
};
