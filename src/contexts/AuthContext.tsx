
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, users } from '../data/mockData';
import { toast } from "@/components/ui/sonner";

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
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple mock login (in real app, this would be an API call)
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && password === 'password') { // In a real app, password would be hashed
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Invalid email or password");
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast.error("Email already in use");
      return false;
    }

    // Create a new user (in a real app, this would be an API call)
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      role: 'client', // Default role for new users
    };

    users.push(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success("Registration successful!");
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info("You have been logged out");
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
