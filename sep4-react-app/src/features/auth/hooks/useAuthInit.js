import { useEffect } from "react";
import { decodeToken } from "../api/authApi";
import {
  clearAuth,
  getToken,
  getUser,
} from "../utils/authStorage";

export function useAuthInit(setToken, setUser, setLoading) {
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();

    if (!storedToken) {
      setLoading(false);
      return;
    }

    const decoded = decodeToken(storedToken);

    // expired token
    if (decoded?.exp * 1000 < Date.now()) {
      clearAuth();
      setLoading(false);
      return;
    }

    setToken(storedToken);
    setUser(storedUser || decoded);

    setLoading(false);
  }, []);
}