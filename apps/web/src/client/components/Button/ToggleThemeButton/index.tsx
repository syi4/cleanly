"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuMoon as Moon, LuSun as Sun } from "react-icons/lu";
import { Skeleton } from "~/client/components/Skeleton";
import { Button } from "..";

const ToggleThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-12 w-12" />;
  }

  return (
    <Button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      variant="ghost"
      size="icon"
      className="relative overflow-hidden [&_svg]:size-6"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? 30 : 0, // Moves down when hiding
          opacity: theme === "dark" ? 0 : 1,
          scale: theme === "dark" ? 0.2 : 1, // Shrinks while disappearing
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute"
      >
        <Sun className="text-yellow-500" aria-hidden="true" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? 0 : -30, // Moves up when appearing
          opacity: theme === "dark" ? 1 : 0,
          scale: theme === "dark" ? 1 : 0.2, // Grows while appearing
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute"
      >
        <Moon className="text-blue-500" aria-hidden="true" />
      </motion.div>
    </Button>
  );
};

export { ToggleThemeButton };
