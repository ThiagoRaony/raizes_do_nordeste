import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  email: string;
  nome: string;
  telefone: string;
  endereco: string;
  pontos_fidelidade: number;
  nivel_fidelidade: 'bronze' | 'prata' | 'ouro' | 'diamante';
  consentimento_lgpd: boolean;
  consentimento_marketing: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
  consentimento_lgpd: boolean;
  consentimento_marketing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'raizes_user';
const STORAGE_USERS = 'raizes_users';

function calcularNivelFidelidade(pontos: number): User['nivel_fidelidade'] {
  if (pontos >= 2000) return 'diamante';
  if (pontos >= 1000) return 'ouro';
  if (pontos >= 500) return 'prata';
  return 'bronze';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, senha: string): Promise<boolean> => {
    const usersRaw = localStorage.getItem(STORAGE_USERS);
    const users: Array<{ email: string; senha: string; user: User }> = usersRaw ? JSON.parse(usersRaw) : [];
    const found = users.find((u) => u.email === email && u.senha === senha);
    if (found) {
      setUser(found.user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found.user));
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    const usersRaw = localStorage.getItem(STORAGE_USERS);
    const users: Array<{ email: string; senha: string; user: User }> = usersRaw ? JSON.parse(usersRaw) : [];
    if (users.some((u) => u.email === data.email)) return false;

    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      nome: data.nome,
      telefone: data.telefone,
      endereco: data.endereco,
      pontos_fidelidade: 0,
      nivel_fidelidade: 'bronze',
      consentimento_lgpd: data.consentimento_lgpd,
      consentimento_marketing: data.consentimento_marketing,
    };

    users.push({ email: data.email, senha: data.senha, user: newUser });
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      // Atualizar também no registro de users
      const usersRaw = localStorage.getItem(STORAGE_USERS);
      if (usersRaw) {
        const users: Array<{ email: string; senha: string; user: User }> = JSON.parse(usersRaw);
        const idx = users.findIndex((u) => u.user.id === prev.id);
        if (idx >= 0) {
          users[idx].user = updated;
          localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
        }
      }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}