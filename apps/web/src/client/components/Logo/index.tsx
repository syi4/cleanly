"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Skeleton } from "~/client/components/Skeleton";

import Image from "next/image";

const Logo = ({
  width = 200,
  height = 100,
}: { width?: number; height?: number }) => {
  //   const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  //   useEffect(() => {
  //     setMounted(true);
  //   }, []);

  //   if (!mounted) {
  //     return <Skeleton className="h-12 w-12" />;
  //   }

  return (
    <Image
      src={
        theme === "dark" ? "/images/logo-white.svg" : "/images/logo-black.svg"
      }
      width={width}
      height={height}
      alt="Cleanly logo"
    />
  );
};

export { Logo };
