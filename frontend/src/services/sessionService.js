import { apiFetch } from "./api";

export const sessionService = {
  async listSessions(token, onUnauthorized) {
    const res = await apiFetch("/api/sessions?limit=20&offset=0", {}, token, onUnauthorized);
    if (!res.ok) throw new Error("Failed to load sessions");
    return await res.json();
  },

  async createSession(token, onUnauthorized) {
    const res = await apiFetch("/api/sessions", { method: "POST" }, token, onUnauthorized);
    if (!res.ok) throw new Error("Failed to create session");
    return await res.json();
  },

  async getSession(token, sessionId, onUnauthorized) {
    const res = await apiFetch(`/api/sessions/${sessionId}`, {}, token, onUnauthorized);
    if (!res.ok) throw new Error("Failed to load session messages");
    return await res.json();
  },

  async renameSession(token, sessionId, title, onUnauthorized) {
    const res = await apiFetch(`/api/sessions/${sessionId}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    }, token, onUnauthorized);
    if (!res.ok) throw new Error("Failed to rename session");
    return await res.json();
  },

  async deleteSession(token, sessionId, onUnauthorized) {
    const res = await apiFetch(`/api/sessions/${sessionId}`, { method: "DELETE" }, token, onUnauthorized);
    if (!res.ok) throw new Error("Failed to delete session");
    // Returns 204 No Content
    return true;
  },
};
