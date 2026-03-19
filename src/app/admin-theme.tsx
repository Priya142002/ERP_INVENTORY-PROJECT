import React, { createContext, useContext, useEffect, useState } from "react";

export type AdminThemeMode = "light" | "dark";

export type AdminThemeConfig = {
  mode: AdminThemeMode;
  primary: string;
  secondary: string;
  accent: string;
  sidebar: string;
  header: string;
  card: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
  };
};

const LIGHT_THEME: AdminThemeConfig = {
  mode: "light",
  primary: "#002147",
  secondary: "#475569",
  accent: "#0ea5e9",
  sidebar: "#002147",
  header: "#ffffff",
  card: "#ffffff",
  background: "#f8fafc",
  text: {
    primary: "#0f172a",
    secondary: "#64748b"
  }
};

const DARK_THEME: AdminThemeConfig = {
  mode: "dark",
  primary: "#38acf8",
  secondary: "#94a3b8",
  accent: "#34d399",
  sidebar: "#001a33",
  header: "#ffffff", // Topbar → White
  card: "#1e293b",
  background: "#f8fafc", // Background → Light White / Gray
  text: {
    primary: "#f1f5f9",
    secondary: "#94a3b8"
  }
};

type AdminThemeContextType = {
  theme: AdminThemeConfig;
  mode: AdminThemeMode;
  setMode: (mode: AdminThemeMode) => void;
  toggleTheme: () => void;
};

const AdminThemeContext = createContext<AdminThemeContextType | null>(null);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AdminThemeMode>(() => {
    const saved = localStorage.getItem("admin-theme") as AdminThemeMode;
    return saved || "light"; // Default to light
  });

  const theme = mode === "light" ? LIGHT_THEME : DARK_THEME;

  // Apply theme CSS variables to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("admin-mode");
    
    // Set all theme variables
    root.style.setProperty("--admin-primary", theme.primary);
    root.style.setProperty("--admin-secondary", theme.secondary);
    root.style.setProperty("--admin-accent", theme.accent);
    root.style.setProperty("--admin-sidebar", theme.sidebar);
    root.style.setProperty("--admin-header", theme.header);
    root.style.setProperty("--admin-card", theme.card);
    root.style.setProperty("--admin-background", theme.background);
    root.style.setProperty("--admin-text-primary", theme.text.primary);
    root.style.setProperty("--admin-text-secondary", theme.text.secondary);
    root.style.setProperty("--admin-border", mode === "light" ? "#E5E7EB" : "#374151");
    root.style.setProperty("--admin-hover", mode === "light" ? "#F3F4F6" : "#1F2937");
    root.style.setProperty("--admin-success", mode === "light" ? "#059669" : "#10B981");
    root.style.setProperty("--admin-warning", mode === "light" ? "#D97706" : "#F59E0B");
    root.style.setProperty("--admin-error", mode === "light" ? "#DC2626" : "#EF4444");
    root.style.setProperty("--admin-info", mode === "light" ? "#2563EB" : "#3B82F6");

    localStorage.setItem("admin-theme", mode);

    return () => {
      root.classList.remove("admin-mode");
    };
  }, [mode, theme]);

  const toggleTheme = () => {
    setMode(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <AdminThemeContext.Provider value={{ theme, mode, setMode, toggleTheme }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) throw new Error("useAdminTheme must be used inside AdminThemeProvider");
  return ctx;
}
