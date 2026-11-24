"use client";

import { useSyncExternalStore } from "react";
import Icon from "./icon";

type Theme = "light" | "dark";

const emptySubscribe = () => () => {};

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => {
    const currentTheme = getThemeSnapshot();
    document.documentElement.setAttribute("data-theme", currentTheme);
    callback();
  };

  // Garante o atributo inicial no DOM assim que assina no cliente
  document.documentElement.setAttribute("data-theme", getThemeSnapshot());

  window.addEventListener("storage", handleChange);
  window.addEventListener("theme-change", handleChange);
  mediaQuery.addEventListener("change", handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("theme-change", handleChange);
    mediaQuery.removeEventListener("change", handleChange);
  };
}

export default function DarkMode() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    window.dispatchEvent(new Event("theme-change"));
  };

  if (!mounted) {
    return <div style={{ width: 40, height: 40 }} />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar modo escuro"
      className="center_c darkmode"
    >
      <Icon
        name={theme === "light" ? "moon" : "sun"}
        size={48}
        className="themetoggle"
      />
    </button>
  );
}
