import { createContext, useContext, useState } from "react";
import { setToken, getToken, removeToken } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken());

  function login(token) {
    setToken(token);
    setTokenState(token);
  }

  function logout() {
    removeToken();
    setTokenState(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isLogged: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
