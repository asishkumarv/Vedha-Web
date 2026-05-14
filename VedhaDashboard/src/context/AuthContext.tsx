import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthResponse {
  token: string;
  user: { name: string; email: string; role: "admin" | "user" };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("vt_token");
      const stored = localStorage.getItem("vt_user");
      if (token && stored) {
        const parsed = JSON.parse(stored);
        setIsAuthenticated(parsed.role === "admin");
        setUserEmail(parsed.email);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const data = await api.login<AuthResponse>(email, password);
    if (data.user.role !== "admin") return false;
    setIsAuthenticated(true);
    setUserEmail(data.user.email);
    localStorage.setItem("vt_token", data.token);
    localStorage.setItem("vt_user", JSON.stringify(data.user));
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    const data = await api.signup<AuthResponse>(name, email, password);
    if (data.user.role !== "admin") return false;
    setIsAuthenticated(true);
    setUserEmail(data.user.email);
    localStorage.setItem("vt_token", data.token);
    localStorage.setItem("vt_user", JSON.stringify(data.user));
    return true;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem("vt_token");
    localStorage.removeItem("vt_user");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, signup, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
