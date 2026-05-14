const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const getToken = () => localStorage.getItem("vt_user_token");

async function request(path, options = {}) {
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

  if (response.status === 204) return undefined;
  return response.json();
}

export const api = {
  getSiteContent: () => request("/site-content"),
  getHealingPages: () => request("/healing-pages"),
  getHealingPage: (slug) => request(`/healing-pages/${slug}`),
  login: (email, password) => request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  signup: (name, email, password) => request("/auth/signup", { method: "POST", body: JSON.stringify({ name, email, password }) }),
  me: () => request("/auth/me"),
  getMySubscription: () => request("/subscriptions/me"),
  checkoutSubscription: (plan) => request("/subscriptions/checkout", { method: "POST", body: JSON.stringify({ plan }) }),
  subscribeNewsletter: (email) => request("/newsletter", {
    method: "POST",
    body: JSON.stringify({ email }),
  }),
};
