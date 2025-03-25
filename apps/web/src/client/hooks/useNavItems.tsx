import { usePathname } from "next/navigation";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { IconType } from "react-icons";
import {
  LuHouse as House,
  LuListTodo as ListTodo,
  LuLogs as Logs,
  LuSettings as Settings,
} from "react-icons/lu";

type NavItem = {
  title: string;
  url: string;
  icon: IconType;
  isActive: boolean;
};

const useNavItems = (): NavItem[] => {
  const pathname = usePathname();
  const splitPath = pathname.split("/").filter(Boolean);
  const pathLength = splitPath.length;
  const basePath = `/${pathname.split("/").slice(1, 3).join("/")}`;

  return [
    {
      title: "Home",
      url: basePath,
      icon: House,
      isActive: pathLength === 2,
    },
    {
      title: "Tasks",
      url: `${basePath}/tasks`,
      icon: Logs,
      isActive: pathLength === 3 && splitPath[pathLength - 1] === "tasks",
    },
    {
      title: "Assignments",
      url: `${basePath}/assignments`,
      icon: ListTodo,
      isActive: pathLength === 3 && splitPath[pathLength - 1] === "assignments",
    },
    {
      title: "Settings",
      url: `${basePath}/settings`,
      icon: Settings,
      isActive: pathLength === 3 && splitPath[pathLength - 1] === "settings",
    },
  ];
};

export { useNavItems };
