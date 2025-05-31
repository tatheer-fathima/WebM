import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token on initial load
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<{ user: User }>(token);
        if (decoded && decoded.user) {
          setUser(decoded.user);
          
          // Set authorization header for all future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll simulate a successful login
      // In a real app, this would be an actual API call
      // const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Simulated successful response
      const response = { 
        data: { 
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTIzNDU2IiwibmFtZSI6IkRlbW8gVXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSJ9LCJpYXQiOjE2MTIzNjE3OTIsImV4cCI6MTYxMjM2NTM5Mn0.3OyLiWn_dYiT6VH0Y7B9rxV9uXXDZ_G07qQsWcMV88o'
        } 
      };
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      const decoded = jwtDecode<{ user: User }>(token);
      setUser(decoded.user);
      
      // Set authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      toast.success('Logged in successfully!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll simulate a successful registration
      // In a real app, this would be an actual API call
      // const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      
      // Simulated successful response
      const response = { 
        data: { 
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTIzNDU2IiwibmFtZSI6IkRlbW8gVXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSJ9LCJpYXQiOjE2MTIzNjE3OTIsImV4cCI6MTYxMjM2NTM5Mn0.3OyLiWn_dYiT6VH0Y7B9rxV9uXXDZ_G07qQsWcMV88o'
        } 
      };
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      const decoded = jwtDecode<{ user: User }>(token);
      setUser(decoded.user);
      
      // Set authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully!');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};