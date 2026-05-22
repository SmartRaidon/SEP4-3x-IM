import { useEffect } from "react";
import { decodeToken } from "../utils/token";
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

    if (!decoded || !decoded.exp) {
      clearAuth();
      setLoading(false);
      return;
    }

    // expired token
    if (decoded?.exp * 1000 < Date.now()) {
      clearAuth();
      setLoading(false);
      return;
    }

    setToken(storedToken);
    setUser(storedUser || decoded);

    setLoading(false);

    // debug
    console.log("[ useAuthInit debug ]");
    console.log("storedToken", storedToken);
    console.log("decoded", decoded);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}