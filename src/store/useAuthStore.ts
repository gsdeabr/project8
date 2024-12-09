import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    if (credentials.username === 'user' && credentials.password === 'user') {
      set({
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          preferences: {
            language: 'zh',
            currency: 'CNY',
            notifications: true,
          },
        },
        isAuthenticated: true,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));