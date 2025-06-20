"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { UserType } from "@/types/user.types";
import { useAuth } from "./auth";

interface AuthContextType {
  user: UserType | null | undefined;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<boolean>;
  refreshUser: () => void;
  updateUserData: (updates: Partial<UserType>) => Promise<UserType | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
