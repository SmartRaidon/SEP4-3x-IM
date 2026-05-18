import { jwtDecode } from "jwt-decode";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = import.meta.env.VITE_API_BASE_URL

// mocking
async function mockRegister(userData) {
    console.log("MOCK register:", userData);
    await new Promise((x) => setTimeout(x, 800));

    return {
        success: true,
        message: "Mock registration successful!",
    };
}

async function mockLogin(loginData) {
    console.log("MOCK login:", loginData);
    await new Promise((x) => setTimeout(x, 800));

    return {
        success: true,
        token: `mock-token-${Date.now()}`,
        user: {
            id: 999,
            name: "Mock User",
            email: loginData.email,
        },
    };
}

// real implementation
async function apiRegister(userData) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
    }

    return await res.json();
}

async function apiLogin(loginData) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
    }

    const data = await res.json();

    // debugging logs
    console.log("LOGIN DATA:", data);
    console.log("TOKEN:", data.token);

    return data;
}


// exported functions + storage
const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export function saveAuth(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
}

// main api

export async function registerUser(userData) {
    return USE_MOCK ? mockRegister(userData) : apiRegister(userData);
}

export async function loginUser(loginData) {
    return USE_MOCK ? mockLogin(loginData) : apiLogin(loginData);
}

// jwt

export function decodeToken(token) {
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
}