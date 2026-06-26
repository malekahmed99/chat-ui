import { apiFetch } from "./api";

export const authService = {
  async login(identifier, password) {
    const formData = new URLSearchParams();
    formData.append("username", identifier);
    formData.append("password", password);

    const res = await apiFetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      let errorMessage = "Login failed";
      if (err.detail) {
        errorMessage = Array.isArray(err.detail) ? err.detail[0].msg : err.detail;
      }
      throw new Error(errorMessage);
    }

    return await res.json();
  },

  async register(identifier, password) {
    const res = await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      let errorMessage = "Registration failed";
      if (err.detail) {
        errorMessage = Array.isArray(err.detail) ? err.detail[0].msg : err.detail;
      }
      throw new Error(errorMessage);
    }

    return await res.json();
  },

  async refresh() {
    const res = await apiFetch("/api/auth/refresh", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Session expired");
    }

    return await res.json();
  },

  async logout(token) {
    await apiFetch("/api/auth/logout", {
      method: "POST",
    }, token);
  },
};
