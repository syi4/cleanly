"use client";

import type { PropsWithChildren } from "react";
import { SidebarTrigger } from "~/client/components/Sidebar/SidebarTrigger";
import { cn } from "~/client/lib/utils";
import { useSidebar } from "../SidebarProvider";

const SidebarContainer = ({ children }: PropsWithChildren) => {
  const { collapsed } = useSidebar();

  return (
    <div
      data-collapsed={collapsed}
      className="group relative hidden h-screen md:block md:sticky top-0 border-r border-(--border-p)"
    >
      <div
        className={cn([
          "flex flex-col w-(--sidebar-width) overflow-hidden h-full transition-all duration-300 ease-in-out transform",
          "group-data-[collapsed=true]:w-(--sidebar-width-collapsed)",
        ])}
      >
        {children}
      </div>
      <SidebarTrigger className="absolute -right-4 top-80 transform -translate-y-1/2" />
    </div>
  );
};

export { SidebarContainer };
