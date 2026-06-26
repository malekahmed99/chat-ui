/**
 * Base API fetch wrapper.
 * Intercepts 401 Unauthorized errors to trigger logout flows.
 */

export async function apiFetch(url, options = {}, token = null, onUnauthorized = null) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // Required for sending/receiving the httpOnly refresh cookie
  });

  if (res.status === 401 && onUnauthorized) {
    onUnauthorized();
  }

  return res;
}
