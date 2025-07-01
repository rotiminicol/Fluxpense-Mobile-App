
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, AuthResponse } from '@/services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  account_type: string;
  onboarding_complete: boolean;
  profile_image?: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  authToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedData = localStorage.getItem('fluxpense_user');
    if (savedData) {
      try {
        const userData = JSON.parse(savedData);
        setUser(userData.user);
        setAuthToken(userData.authToken);
        
        // Verify token is still valid
        refreshUser();
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('fluxpense_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', { email });
    setIsLoading(true);
    
    try {
      const response: AuthResponse = await authService.login({ email, password });
      
      setUser(response.user);
      setAuthToken(response.authToken);
      
      // Save to localStorage
      localStorage.setItem('fluxpense_user', JSON.stringify(response));
      
      console.log('Login successful:', response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    console.log('Signup attempt:', { name, email });
    setIsLoading(true);
    
    try {
      const response: AuthResponse = await authService.signup({ name, email, password });
      
      setUser(response.user);
      setAuthToken(response.authToken);
      
      // Save to localStorage
      localStorage.setItem('fluxpense_user', JSON.stringify(response));
      
      console.log('Signup successful:', response.user);
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!authToken) return;
    
    try {
      const userData = await authService.me();
      setUser(userData);
      
      // Update localStorage
      const savedData = localStorage.getItem('fluxpense_user');
      if (savedData) {
        const data = JSON.parse(savedData);
        data.user = userData;
        localStorage.setItem('fluxpense_user', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // Token might be invalid, logout user
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('fluxpense_user');
    console.log('User logged out');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update localStorage
      const savedData = localStorage.getItem('fluxpense_user');
      if (savedData) {
        const data = JSON.parse(savedData);
        data.user = updatedUser;
        localStorage.setItem('fluxpense_user', JSON.stringify(data));
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      authToken,
      login,
      signup,
      logout,
      updateUser,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
