import { useState } from "react";
import { AuthContext } from "./authContext";

import {
  loginUser,
  registerUser,
} from "../services/authService";

import {
  saveAuth,
  clearAuth,
} from "../utils/authStorage";

import { useAuthInit } from "../hooks/useAuthInit";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useAuthInit(setToken, setUser, setLoading);

  const login = async (credentials) => {
    const result = await loginUser(credentials);

    if (result.token) {
      saveAuth(result.token, result.user);

      setToken(result.token);
      setUser(result.user);
    }

    return result;
  };

  const register = async (data) => {
    return registerUser(data);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}