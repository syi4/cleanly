"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <NextThemeProvider
    attribute="data-theme"
    defaultTheme="system"
    storageKey="theme"
    enableSystem
  >
    {children}
  </NextThemeProvider>
);
