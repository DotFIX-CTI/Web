"use client";

import { useEffect, useState } from "react";
import Button from "@/components/button";
import Icon from "./icon";

export default function DarkMode() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    window.dispatchEvent(new Event("theme-change"));
  };

  if (!mounted) {
    return <div style={{ width: 40, height: 40 }} />;
  }

  return (
    <button onClick={toggleTheme} aria-label="Alternar modo escuro">
      <Icon name={theme === "light" ? "moon" : "sun"} />
    </button>
  );
}
