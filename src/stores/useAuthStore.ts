import { create } from 'zustand';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  jwt: string | null;
  setUser: (user: User | null) => void;
  setJWT: (jwt: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  jwt: null,
  setUser: (user) => set({ user }),
  setJWT: (jwt) => set({ jwt }),
  logout: () => set({ user: null, jwt: null }),
}));