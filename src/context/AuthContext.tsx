"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the exact role types available in your CRM hierarchy
type UserRole = "MAIN_ADMIN" | "SUB_ADMIN" | "USER"; 

type UserType = {
  username: string;
  role: UserRole; // Enforces our strict multi-tier hierarchy
} | null;

type AuthContextType = {
  user: UserType;
  isAuthenticated: boolean;
  login: (userData: NonNullable<UserType>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Load session from localStorage when the app first loads in the browser
  useEffect(() => {
    const savedUser = localStorage.getItem("saampark_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: NonNullable<UserType>) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("saampark_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("saampark_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be called inside an AuthProvider wrapper structure");
  }
  return context;
}