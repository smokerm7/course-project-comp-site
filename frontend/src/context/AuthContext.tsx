import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authApi } from '../api/client';
import type { AuthResponse, RegisterPayload, Role } from '../api/types';

type AuthState = {
  token: string | null;
  username: string | null;
  role: Role | null;
};

type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'ms7_auth';

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { token: null, username: null, role: null };
    return JSON.parse(raw) as AuthState;
  } catch {
    return { token: null, username: null, role: null };
  }
}

function saveAuth(state: AuthState) {
  if (state.token) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem('ms7_token', state.token);
  } else {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('ms7_token');
  }
}

function applyAuth(response: AuthResponse): AuthState {
  const state: AuthState = {
    token: response.token,
    username: response.username,
    role: response.role,
  };
  saveAuth(state);
  return state;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(loadAuth);

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem('ms7_token', auth.token);
    }
  }, [auth.token]);

  const login = useCallback(async (username: string, password: string) => {
    const response = await authApi.login(username, password);
    setAuth(applyAuth(response));
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const response = await authApi.register(payload);
    setAuth(applyAuth(response));
  }, []);

  const logout = useCallback(() => {
    setAuth({ token: null, username: null, role: null });
    saveAuth({ token: null, username: null, role: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...auth,
      isAuthenticated: Boolean(auth.token),
      login,
      register,
      logout,
    }),
    [auth, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
