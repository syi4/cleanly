import { Slot } from "@radix-ui/react-slot";
import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
} from "react";

import { LuChevronRight as ChevronRight } from "react-icons/lu";
import { cn } from "~/client/lib/utils";

// *************************************************
// *                 Breadcrumb                    *
// *************************************************
const Breadcrumb = ({
  ...props
}: ComponentPropsWithRef<"nav"> & {
  separator?: ReactNode;
}) => <nav aria-label="Breadcrumb" {...props} />;

// *************************************************
// *                 Breadcrumb List               *
// *************************************************
const BreadcrumbList = ({
  className,
  ...props
}: ComponentPropsWithRef<"ol">) => (
  <ol
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className,
    )}
    {...props}
  />
);

// *************************************************
// *                Breadcrumb Item                *
// *************************************************
const BreadcrumbItem = ({
  className,
  ...props
}: ComponentPropsWithRef<"li">) => (
  <li
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
);

// *************************************************
// *               Breadcrumb Link                 *
// *************************************************
const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: ComponentPropsWithRef<"a"> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
};

// *************************************************
// *                Breadcrumb Page                *
// *************************************************
const BreadcrumbPage = ({
  className,
  ...props
}: ComponentPropsWithRef<"a">) => (
  <a
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
);

// *************************************************
// *              Breadcrumb Separator             *
// *************************************************
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
