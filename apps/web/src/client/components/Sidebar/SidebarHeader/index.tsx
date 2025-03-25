import { cn } from "~/client/lib/utils";

const SidebarHeader = () => {
  return (
    <div className="flex flex-col px-3 py-2">
      <div className="flex w-full items-center gap-2 ">
        <h2 className={cn("text-xl font-semibold")}>SB</h2>
      </div>
    </div>
  );
};

export { SidebarHeader };
