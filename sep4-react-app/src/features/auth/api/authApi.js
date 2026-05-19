import { jwtDecode } from "jwt-decode";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = import.meta.env.VITE_API_BASE_URL

// helper for real API calls
async function apiRequest(endpoint, options) {
  const res = await fetch(`${API_URL}${endpoint}`, options);

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}

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
  return apiRequest("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
}

async function apiLogin(loginData) {
  return apiRequest("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
}

// public api
export async function registerUser(userData) {
  return USE_MOCK
    ? mockRegister(userData)
    : apiRegister(userData);
}

export async function loginUser(loginData) {
  return USE_MOCK
    ? mockLogin(loginData)
    : apiLogin(loginData);
}

// jwt

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}