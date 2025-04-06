/**
 * Application configuration
 */

// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

// Auth endpoints
export const AUTH_ENDPOINTS = {
	register: `${API_BASE_URL}/auth/register`,
	login: `${API_BASE_URL}/auth/login`,
	logout: `${API_BASE_URL}/auth/logout`,
	google: `${API_BASE_URL}/auth/login/google`,
}

// Chat endpoints
export const CHAT_ENDPOINTS = {
	conversations: `${API_BASE_URL}/conversations`,
	messages: `${API_BASE_URL}/chat/messages`,
}

// User endpoints
export const USER_ENDPOINTS = {
	search: `${API_BASE_URL}/search`,
	profile: `${API_BASE_URL}/user/profile`,
	avatar: `${API_BASE_URL}/avatar`,
}
