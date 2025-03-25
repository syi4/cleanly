import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import { cn } from "~/client/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl transition-colors text-sm font-medium cursor-pointer",
    "outline-none focus-visible:border-(--focus-ring) focus-visible:ring-(--focus-ring)/80 focus-visible:ring-4",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-(--main-inverse) text-(--main) shadow-sm hover:bg-(--main-inverse)/80",
        primary: "bg-(--button-blue) text-white hover:bg-(--button-blue)/80",
        secondary:
          "bg-(--button-purple) text-white hover:bg-(--button-purple)/80",
        danger: "bg-(--error) text-white shadow-sm hover:bg-(--error)/80",
        outline:
          "border bg-(--main) border-[var(--border-p)] shadow hover:bg-[var(--highlight)]",
        ghost: "hover:bg-[var(--highlight)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
};

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentPropsWithRef<"button"> & ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
