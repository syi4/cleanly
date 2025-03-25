import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/client/lib/utils";

const Skeleton = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-slate-400/30", className)}
      {...props}
    />
  );
};

export { Skeleton };
