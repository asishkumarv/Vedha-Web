const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getToken = () => localStorage.getItem("vt_token");

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `Request failed with ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export const api = {
  getSiteContent: <T>() => request<T>("/site-content"),
  saveSiteContent: <T>(content: T) => request<T>("/site-content", { method: "PUT", body: JSON.stringify(content) }),
  resetSiteContent: <T>() => request<T>("/site-content/reset", { method: "POST" }),
  getHealingPages: <T>() => request<T>("/healing-pages"),
  getHealingPage: <T>(slug: string) => request<T>(`/healing-pages/${slug}`),
  saveHealingPage: <T>(slug: string, page: T) => request<T>(`/healing-pages/${slug}`, { method: "PUT", body: JSON.stringify(page) }),
  getSubscriptions: <T>() => request<T>("/subscriptions"),
  createSubscription: <T>(subscription: T) => request<T>("/subscriptions", { method: "POST", body: JSON.stringify(subscription) }),
  updateSubscription: <T extends { id: string }>(subscription: T) =>
    request<T>(`/subscriptions/${subscription.id}`, { method: "PUT", body: JSON.stringify(subscription) }),
  deleteSubscription: (id: string) => request<void>(`/subscriptions/${id}`, { method: "DELETE" }),
  getMediaAssets: <T>() => request<T>("/media-assets"),
  createMediaAsset: <T>(image: T) => request<T>("/media-assets", { method: "POST", body: JSON.stringify(image) }),
  deleteMediaAsset: (id: string) => request<void>(`/media-assets/${id}`, { method: "DELETE" }),
  login: <T>(email: string, password: string) => request<T>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  signup: <T>(name: string, email: string, password: string) => request<T>("/auth/signup", { method: "POST", body: JSON.stringify({ name, email, password, role: "admin" }) }),
  me: <T>() => request<T>("/auth/me"),
};
