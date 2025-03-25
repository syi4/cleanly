import type { Metadata } from "next";
import type { JSX } from "react";

import { Sidebar } from "~/client/components/Sidebar";

export const metadata: Metadata = {
  title: "Pod | Cleanly",
  description: "Keep track of cleaning schedule.",
};

export default function PodLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
