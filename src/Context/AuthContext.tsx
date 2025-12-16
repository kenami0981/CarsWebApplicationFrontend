import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../Models/User";
import api from "../API/axios";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // przy starcie aplikacji
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api.get<User>("/account")
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem("jwt", user.token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
