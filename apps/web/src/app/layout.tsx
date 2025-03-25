import "./globals.css";
import type { Metadata } from "next";
import { Merriweather, Montserrat } from "next/font/google";
import type { JSX, PropsWithChildren } from "react";
import { Toaster } from "~/client/components/Toaster";
import { ThemeProvider } from "~/client/providers/ThemeProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"], // light, normal, bold, black
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Cleanly",
  description: "Keep track of cleaning schedule.",
};

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${merriweather.variable}`}
    >
      <body>
        <ThemeProvider>
          {children}
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
