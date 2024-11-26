import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface User {
  address: string;
  membershipLevel: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
}

const LOCAL_STORAGE_KEY = 'auth_state';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : {
      isAuthenticated: false,
      token: null,
      user: null,
    };
  });

  useEffect(() => {
    if (!isConnected) {
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null,
      });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [isConnected]);

  const login = (token: string, user: User) => {
    const newState = {
      isAuthenticated: true,
      token,
      user,
    };
    setAuthState(newState);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}