"use client";

import Link from "next/link";
import {
  LuChevronsUpDown as ChevronsUpDown,
  LuPlus as Plus,
  LuTent as Tent,
} from "react-icons/lu";

import { MenuButton } from "~/client/components/Button/MenuButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/client/components/DropdownMenu";
import { useNavItems } from "~/client/hooks/useNavItems";
import { cn } from "~/client/lib/utils";

const SidebarMain = () => {
  const navItems = useNavItems();

  const podName = "da crib";

  return (
    <div className="flex flex-col flex-1 px-3 group-data-[collapsed=true]:px-1 transition-[padding]">
      <div className="flex py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MenuButton
              size="lg"
              className={cn(["[&>svg:last-child]:size-4 pl-[5px]"])}
            >
              <div
                className={cn([
                  "flex aspect-square size-8 items-center justify-center rounded-lg bg-(--main-inverse) text-(--main)",
                ])}
              >
                <Tent className="size-6" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsed=true]:hidden">
                <span className="truncate font-semibold capitalize">
                  {podName}
                </span>
                {<span className="truncate text-xs">4 members</span>}
              </div>
              <ChevronsUpDown className="ml-auto group-data-[collapsed=true]:hidden" />
            </MenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-44 rounded-lg bg-(--main) drop-shadow-xl"
            align="start"
            side="right"
            sideOffset={11}
          >
            <DropdownMenuItem
              onClick={() => console.log(`hey`)}
              className="p-2"
            >
              Da Crib
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-4 items-center justify-center rounded-md border bg-background">
                <Plus />
              </div>
              <div className="font-medium text-sm">Create Pod</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav>
        <ul className="space-y-2 group-data-[collapsed=true]:pl-[1px]">
          {navItems.map((item) => (
            <li key={item.title}>
              <MenuButton
                asChild
                isActive={item.isActive}
                aria-label={`Go to ${item.title}`}
                className={cn(["group-data-[collapsed=true]:[&>svg]:size-6"])}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span className="group-data-[collapsed=true]:hidden">
                    {item.title}
                  </span>
                </Link>
              </MenuButton>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export { SidebarMain };
