export interface User {
  _id: string;
  email: string;
  name: string;
  username: string;
  gender: 'male' | 'female' | 'other';
  avatar: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  username: string;
  gender: 'male' | 'female' | 'other';
  avatar: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}
