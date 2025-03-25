"use client";

import { SidebarContainer } from "~/client/components/Sidebar/SidebarContainer";
import { SidebarFooter } from "~/client/components/Sidebar/SidebarFooter";
import { SidebarHeader } from "~/client/components/Sidebar/SidebarHeader";
import { SidebarMain } from "~/client/components/Sidebar/SidebarMain";
import { SidebarProvider } from "~/client/components/Sidebar/SidebarProvider";

const Sidebar = () => {
  return (
    <SidebarProvider>
      <SidebarContainer>
        <SidebarHeader />
        <SidebarMain />
        <SidebarFooter />
      </SidebarContainer>
    </SidebarProvider>
  );
};

export { Sidebar };
