"use client";

import { LuChevronsLeft as ChevronsLeft } from "react-icons/lu";

import { Button } from "~/client/components/Button";
import { useSidebar } from "~/client/components/Sidebar/SidebarProvider";
import { cn } from "~/client/lib/utils";

const SidebarTrigger = ({ className }: { className?: string }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "h-8 w-8 [&_svg]:size-7 bg-(--main) shadow-none rounded-full",
        className,
      )}
      onClick={toggleSidebar}
    >
      <ChevronsLeft
        className={cn([
          "transition-transform duration-700 ease-in-out",
          "group-data-[collapsed=true]:rotate-180",
        ])}
      />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

export { SidebarTrigger };
