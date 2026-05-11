import { createContext, useContext, useState, useEffect } from "react";
import {
    loginUser,
    registerUser,
    saveAuth,
    clearAuth,
    getToken,
    getUser,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // init
    useEffect(() => {
        const storedToken = getToken();
        const storedUser = getUser();

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
        }

        setLoading(false);
    }, []);

    // login
    const login = async (credentials) => {
        const result = await loginUser(credentials);

        if (result.token) {
            saveAuth(result.token, result.user);

            setToken(result.token);
            setUser(result.user);
        }

        return result;
    };

    // register
    const register = async (data) => {
        return await registerUser(data);
    };

    // logout
    const logout = () => {
        clearAuth();
        setUser(null);
        setToken(null);
    };

    // auth state
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated,
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}