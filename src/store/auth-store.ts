import { create } from 'zustand'

interface User {
  name: string
  email: string
}

interface AuthState {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
