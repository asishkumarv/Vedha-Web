import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
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
    const checkAuth = () => {
      const token = localStorage.getItem("vt_token") || sessionStorage.getItem("vt_token");
      const stored = localStorage.getItem("vt_user") || sessionStorage.getItem("vt_user");
      
      if (token && stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.role === "admin") {
            setIsAuthenticated(true);
            setUserEmail(parsed.email);
          }
        } catch (e) {
          console.error("Failed to parse stored user", e);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    const data = await api.login<AuthResponse>(email, password);
    if (data.user.role !== "admin") return false;
    
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("vt_token", data.token);
    storage.setItem("vt_user", JSON.stringify(data.user));
    
    // Clear the other storage to avoid conflicts
    const other = rememberMe ? sessionStorage : localStorage;
    other.removeItem("vt_token");
    other.removeItem("vt_user");

    setIsAuthenticated(true);
    setUserEmail(data.user.email);
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    const data = await api.signup<AuthResponse>(name, email, password);
    if (data.user.role !== "admin") return false;
    
    localStorage.setItem("vt_token", data.token);
    localStorage.setItem("vt_user", JSON.stringify(data.user));
    
    setIsAuthenticated(true);
    setUserEmail(data.user.email);
    return true;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem("vt_token");
    localStorage.removeItem("vt_user");
    sessionStorage.removeItem("vt_token");
    sessionStorage.removeItem("vt_user");
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
