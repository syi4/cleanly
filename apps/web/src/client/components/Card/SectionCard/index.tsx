import type { Task } from "@prisma/client";
import type { IconType } from "react-icons";

import { cn } from "~/client/lib/utils";

type SectionCardProps = {
  name: string;
  description?: string;
  icon: IconType;
  tasks?: Task[];
  onClick: () => void;
  className?: string;
};

const SectionCard = ({
  name,
  description,
  icon: Icon,
  tasks,
  onClick,
  className,
}: SectionCardProps) => {
  return (
    <button
      type="button"
      className={cn([
        "rounded-xl cursor-pointer bg-(--card-hover) sm:bg-transparent sm:hover:bg-(--card-hover)",
        "outline-none focus-visible:border-(--focus-ring) focus-visible:ring-(--focus-ring)/80 focus-visible:ring-4",
        className,
      ])}
      aria-label={`Open ${name} details`}
      onClick={onClick}
    >
      <div className={cn("flex flex-col space-y-1.5 p-6")}>
        <div className="flex items-center gap-5">
          <div className="flex justify-center p-2 rounded-full items-center text-(--icon-blue) bg-(--icon-blue-bg)">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="font-semibold leading-none tracking-tight text-lg sm:text-xl">
            {name}
          </div>
        </div>
        {description && <div className={cn("text-sm")}>{description}</div>}
      </div>
      {tasks && tasks.length > 0 && (
        <div className={cn("p-6 pt-3")}>
          {tasks.map((task) => {
            return <p key={task.id}>{task.name}</p>;
          })}
        </div>
      )}
    </button>
  );
};

export { SectionCard };
