const STORAGE_KEY = "erp_logged_in";

export function isAuthenticated() {
  return Boolean(
    window.localStorage.getItem(STORAGE_KEY) ||
      window.sessionStorage.getItem(STORAGE_KEY)
  );
}

export function login({ remember } = { remember: false }) {
  const storage = remember ? window.localStorage : window.sessionStorage;
  storage.setItem(STORAGE_KEY, "1");
}

export function logout() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);
}
