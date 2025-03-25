import type { Metadata } from "next";

import type { JSX } from "react";

import { Onboarding } from "~/client/components/screen/onboarding";

export const metadata: Metadata = {
  title: "Oboarding | Cleanly",
  description:
    "Welcome to Cleanly! Learn how to get started and set up your account in just a few steps.",
};

export default function OnboardingPage(): JSX.Element {
  return <Onboarding />;
}
