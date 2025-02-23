export interface User {
	_id: string
	encryptedId: string
	name: string
	username: string
	email: string
	gender: string
	avatar: string
	role: string
	providerId: string
	provider: string
	createdAt: string
	updatedAt: string
}

export interface AuthState {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean
	error: string | null
}

export interface LoginCredentials {
	email: string
	password: string
}

export interface RegisterCredentials {
	name: string
	email: string
	password: string
	username?: string // Optional as it's generated server-side if not provided
	gender?: string
	avatar?: string
}

export interface AuthResponse {
	user: User
	message: string
}
