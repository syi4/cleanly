import { LuLogOut as LogOut } from "react-icons/lu";

import { MenuButton } from "~/client/components/Button/MenuButton";
import { Separator } from "~/client/components/Separator";
import { cn } from "~/client/lib/utils";

const SidebarFooter = () => {
  return (
    <>
      <Separator />
      <MenuButton
        size="xl"
        className={cn([
          "rounded-none justify-center group-data-[collapsed=true]:h-12 group-data-[collapsed=true]:[&>svg]:size-6",
          "hover:bg-(--highlight)",
        ])}
        aria-label="Log out"
      >
        <LogOut className="rotate-180" />
        <span className="group-data-[collapsed=true]:hidden">Logout</span>
      </MenuButton>
    </>
  );
};

export { SidebarFooter };
