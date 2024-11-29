import React, { createContext, useContext, useState } from 'react';
interface AuthState {
  isAuthenticated: boolean;
  address: string | null;
  signature: string | null;
}

interface AuthContextType extends AuthState {
  setAuthState: (state: AuthState) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    address: null,
    signature: null,
  });

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      address: null,
      signature: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState, logout }}>
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