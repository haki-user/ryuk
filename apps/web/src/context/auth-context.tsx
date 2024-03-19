"use client";
import { useState, useEffect, createContext, useContext } from "react";
import type { IContextType, IUser } from "@/types";
import { getCurrentUser } from "@/auth/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();
      console.log({ currentAccount})
      if (!currentAccount) {
        return false;
      }
      setUser({
        id: currentAccount.$id,
        name: currentAccount.name,
        email: currentAccount.email,
        imageUrl: currentAccount.imageUrl,
      });
      setIsAuthenticated(true);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    ) {
      // navigate to '/sign-in'
    }
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useUserContext = () => {
  return useContext(AuthContext);
};
