export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_AUTH_LOGIN;
  
  if (!apiUrl) {
    throw new Error('Auth API URL not configured');
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Store tokens in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_AUTH_LOGOUT;
  const token = localStorage.getItem('authToken');

  if (apiUrl && token) {
    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  // Clear tokens from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
}

export function isAuthenticated(): boolean {
  return !!getStoredToken();
}