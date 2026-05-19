const API_URL = import.meta.env.VITE_API_BASE_URL

// helper for API calls
async function apiRequest(endpoint, options) {
  const res = await fetch(`${API_URL}${endpoint}`, options);

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}

// implementation
export function apiRegister(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
}

export function apiLogin(loginData) {
  return apiRequest("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
}