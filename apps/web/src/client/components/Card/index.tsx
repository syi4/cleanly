import type { ComponentPropsWithRef, FC } from "react";
import { cn } from "~/client/lib/utils";

// *************************************************
// *                  Card Component               *
// *************************************************
const Card = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
  <div className={cn("rounded-xl shadow", className)} {...props} />
);

// *************************************************
// *                Card Header                   *
// *************************************************
const CardHeader = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

// *************************************************
// *                Card Title                   *
// *************************************************
const CardTitle = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
  <div
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

// *************************************************
// *                Card Description               *
// *************************************************
const CardDescription = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => (
  <div className={cn("text-sm", className)} {...props} />
);

// *************************************************
// *                Card Content                   *
// *************************************************
const CardContent = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

// *************************************************
// *                Card Footer                    *
// *************************************************
const CardFooter = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
