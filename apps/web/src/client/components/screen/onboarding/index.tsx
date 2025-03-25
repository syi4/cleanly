"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

import { SectionType } from "@prisma/client";
import type { CreateSectionClientInput } from "~/common/schemas/section";
import {
  type CreateSpaceClientInput,
  createSpaceClientSchema,
} from "~/common/schemas/space";
import { Section } from "./Section";
import { Space } from "./Space";
import { Welcome } from "./Welcome";

const SECTIONS = [
  { name: "Bedroom", type: SectionType.BEDROOM, description: "" },
  { name: "Bathroom", type: SectionType.BATHROOM, description: "" },
  { name: "Living Room", type: SectionType.LIVING_ROOM, description: "" },
  { name: "Kitchen", type: SectionType.KITCHEN, description: "" },
  { name: "Office", type: SectionType.OFFICE, description: "" },
  { name: "Dining Room", type: SectionType.DINING_ROOM, description: "" },
  { name: "Laundry Room", type: SectionType.LAUNDRY_ROOM, description: "" },
  { name: "Garage", type: SectionType.GARAGE, description: "" },
  { name: "Yard", type: SectionType.YARD, description: "" },
  { name: "General", type: SectionType.GENERAL, description: "" },
];

const Onboarding = () => {
  const [space, setSpace] = useState<CreateSpaceClientInput>({ name: "" });
  const [sections, setSections] =
    useState<CreateSectionClientInput[]>(SECTIONS);
  const [step, setStep] = useState(0);

  const handlePrevious = useCallback(() => {
    setStep((prevStep) => prevStep - 1);
  }, []);

  const handleNext = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const handleSpace = useCallback(
    (values: CreateSpaceClientInput) => {
      handleNext();
      setSpace({ name: values.name });
    },
    [handleNext],
  );

  const handleSubmit = useCallback(async () => {
    console.log("afafsa");
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={step}
        className="flex flex-col  min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {(() => {
          switch (step) {
            case 0:
              return <Welcome onClick={handleNext} />;
            case 1:
              return <Space name={space.name} onClick={handleSpace} />;
            case 2:
              return (
                <Section
                  sections={sections}
                  onClick={handlePrevious}
                  onSubmit={handleSubmit}
                />
              );
            default:
              return null;
          }
        })()}
      </motion.main>
    </AnimatePresence>
  );
};

export { Onboarding };
