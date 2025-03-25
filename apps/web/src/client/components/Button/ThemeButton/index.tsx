"use client";

import { useTheme } from "next-themes";
import { type FC, useEffect, useState } from "react";
import { LuMoon as Moon, LuSun as Sun } from "react-icons/lu";

import { Skeleton } from "~/client/components/Skeleton";

const ThemeButton: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-7 w-7" />;
  }

  return (
    <button
      type="button"
      title={`Switch between dark and light mode (currently in ${theme} mode)`}
      className="group flex items-center p-1 rounded-lg hover:bg-slate-400/30"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Sun
          className="text-gray-500 h-7 w-7 group-hover:text-black"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <Moon
          className="text-gray-400 h-7 w-7 group-hover:text-white"
          onClick={() => setTheme("light")}
        />
      )}
    </button>
  );
};

export default ThemeButton;
