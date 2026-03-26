"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative w-10 h-10 flex items-center justify-center",
        "border border-[var(--border)] hover:border-[var(--accent)]",
        "transition-all duration-300 cursor-pointer",
        "hover:shadow-md group"
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={cn(
          "h-[18px] w-[18px] transition-all duration-300",
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        )}
      />
      <Moon
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        )}
      />
    </button>
  );
}
