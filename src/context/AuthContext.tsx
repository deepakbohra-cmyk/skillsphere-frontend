import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authAPI } from "../services/userService";

import type { LoginCredentials, UserProfile } from "../model";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;

  login: (credentials: LoginCredentials) => Promise<void>;

  logout: () => void;

  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setUser(null);
        return;
      }

      const profile = await authAPI.getProfile();

      setUser(profile);
    } catch (error) {
      console.error("Failed to fetch profile:", error);

      localStorage.removeItem("jwtToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);

      const response = await authAPI.loginUser(credentials);

      localStorage.setItem("jwtToken", response.token);

      await fetchUser();
    } catch (error) {
      console.error("Login failed:", error);

      localStorage.removeItem("jwtToken");

      setUser(null);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
