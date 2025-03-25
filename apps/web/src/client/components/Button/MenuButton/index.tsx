import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import { cn } from "~/client/lib/utils";

const menuButtonVariants = cva(
  [
    "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-(--muted) transition-[width,height,padding] cursor-pointer",
    "focus-visible:outline-transparent disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0",
    "hover:bg-(--highlight) data-[active=true]:bg-(--highlight) data-[active=true]:text-(--main-inverse) data-[state=open]:bg-(--highlight) data-[state=open]:text-(--main-inverse)",
  ],
  {
    variants: {
      size: {
        default: "h-10 [&>svg]:size-5",
        sm: "h-8 text-xs [&>svg]:size-4",
        lg: "h-12 [&>svg]:size-5",
        xl: "h-16 [&>svg]:size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type MenuButtonProps = VariantProps<typeof menuButtonVariants> & {
  asChild?: boolean;
  isActive?: boolean;
};

const MenuButton = ({
  asChild = false,
  isActive = false,
  size = "default",
  className,
  ...props
}: ComponentPropsWithRef<"button"> & MenuButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-active={isActive}
      className={cn(menuButtonVariants({ size }), className)}
      {...props}
    />
  );
};

export { MenuButton };
