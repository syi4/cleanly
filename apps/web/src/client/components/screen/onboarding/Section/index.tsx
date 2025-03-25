"use client";

import type { SectionType } from "@prisma/client";
import type { IconType } from "react-icons";
import { BiShower as Bathroom, BiDish as DiningRoom } from "react-icons/bi";
import { IoCarOutline as Garage } from "react-icons/io5";
import { LiaBroomSolid as Broom } from "react-icons/lia";
import {
  LuBedDouble as Bedroom,
  LuChevronLeft as ChevronLeft,
  LuPlus as Plus,
  LuFlower as Yard,
} from "react-icons/lu";
import {
  MdOutlineKitchen as Kitchen,
  MdOutlineLocalLaundryService as LaundryRoom,
} from "react-icons/md";
import { PiOfficeChairBold as Office } from "react-icons/pi";
import { RiSofaLine as LivingRoom } from "react-icons/ri";

import { Button } from "~/client/components/Button";
import { ToggleThemeButton } from "~/client/components/Button/ToggleThemeButton";
import { SectionCard } from "~/client/components/Card/SectionCard";
import { cn } from "~/client/lib/utils";
import type { CreateSectionClientInput } from "~/common/schemas/section";

const ICONS: Record<SectionType, IconType> = {
  BEDROOM: Bedroom,
  BATHROOM: Bathroom,
  LIVING_ROOM: LivingRoom,
  KITCHEN: Kitchen,
  OFFICE: Office,
  DINING_ROOM: DiningRoom,
  LAUNDRY_ROOM: LaundryRoom,
  GARAGE: Garage,
  YARD: Yard,
  GENERAL: Broom,
};

type SectionProps = {
  sections: CreateSectionClientInput[];
  onClick: () => void;
  onSubmit: () => Promise<void>;
};

const Section = ({ sections, onClick, onSubmit }: SectionProps) => {
  const handleOpenSection = () => {
    console.log(`OPEN MODAL`);
  };

  const handleOpenAddSection = () => {
    console.log(`OPEN ADD MODAL`);
  };

  return (
    <div className="flex flex-col">
      <div className="pt-4 pl-4 sm:pt-7 sm:pl-7">
        <Button
          variant="outline"
          size="icon"
          className="[&_svg]:size-5"
          onClick={onClick}
        >
          <ChevronLeft />
        </Button>
      </div>
      <div
        className={cn("flex flex-col flex-1 justify-center items-center px-5", {
          "mt-10": sections.length > 7,
        })}
      >
        {/* <ToggleThemeButton /> */}
        <div className="flex flex-col justify-center space-y-4 w-full">
          <h1 className="text-4xl text-center">
            Wrap it up by customizing your sections!
          </h1>
          <h2 className="text-(--text-grey) text-2xl text-center">
            No need to be perfect, you can always edit later.
          </h2>
          <div className="">
            <div className="sm:max-w-2xl lg:max-w-5xl mx-auto grid p-2 justify-center auto-rows-min gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section, idx) => (
                <SectionCard
                  // biome-ignore lint/suspicious/noArrayIndexKey: name can be duplicates
                  key={idx}
                  name={section.name}
                  icon={ICONS[section.type]}
                  description={section.description}
                  onClick={handleOpenSection}
                />
              ))}
              <SectionCard
                name="Add Section"
                icon={Plus}
                onClick={handleOpenAddSection}
              />
            </div>
          </div>
        </div>
        <div className="my-10">
          <Button type="button" variant="primary" size="lg" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Section };
