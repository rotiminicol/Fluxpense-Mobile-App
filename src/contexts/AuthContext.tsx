
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  account_type: string;
  onboarding_complete: boolean;
  profile_image?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('fluxpense_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', { email });
    setIsLoading(true);
    
    try {
      // For demo purposes, simulate API call
      const mockUser: User = {
        id: 1,
        name: 'Demo User',
        email: email,
        account_type: 'premium',
        onboarding_complete: false,
        profile_image: '/lovable-uploads/1b071249-3f59-431d-9d96-a3db71dbf0e1.png'
      };
      
      setUser(mockUser);
      localStorage.setItem('fluxpense_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    console.log('Signup attempt:', { name, email });
    setIsLoading(true);
    
    try {
      // For demo purposes, simulate API call
      const mockUser: User = {
        id: 1,
        name: name,
        email: email,
        account_type: 'free',
        onboarding_complete: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('fluxpense_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fluxpense_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('fluxpense_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
