
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../data/mockData';
import { toast } from "@/components/ui/sonner";
import api from '@/services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.login({ email, password });
      
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        token: response.token
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success("Connexion réussie!");
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Email ou mot de passe invalide");
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.register({ 
        name, 
        email, 
        password,
        password_confirmation: password
      });
      
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        token: response.token
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success("Inscription réussie!");
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("L'inscription a échoué. Veuillez réessayer.");
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      toast.info("Vous avez été déconnecté");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
