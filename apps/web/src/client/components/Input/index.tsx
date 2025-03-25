import type { ComponentPropsWithRef } from "react";

import { cn } from "~/client/lib/utils";

const Input = ({
  className,
  type,
  ...props
}: ComponentPropsWithRef<"input">) => {
  return (
    <input
      type={type}
      className={cn(
        [
          "flex h-9 w-full px-3 py-1 bg-transparent text-base shadow-sm md:text-sm rounded-md border border-(--border-p)",
          "outline-none focus-visible:border-(--focus-ring) focus-visible:ring-(--focus-ring)/80 focus-visible:ring-[3px]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
        ],
        className,
      )}
      {...props}
    />
  );
};

export { Input };
