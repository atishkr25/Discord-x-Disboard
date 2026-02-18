import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxy is set in vite.config.js or we use full URL if CORS enabled
    withCredentials: true, // Important for cookies
});

export const getTrendingServers = () => api.get('/servers/trending');
export const getRecentServers = () => api.get('/servers/recent');
export const getMyServers = () => api.get('/servers/me/all');
export const getMyGuilds = () => api.get('/auth/me/guilds');
export const createServer = (data) => api.post('/servers', data);
export const updateServer = (id, data) => api.put(`/servers/${id}`, data);
export const deleteServer = (id) => api.delete(`/servers/${id}`);
export const logout = () => api.post('/auth/logout');
export const getMe = () => api.get('/auth/me');

export default api;
