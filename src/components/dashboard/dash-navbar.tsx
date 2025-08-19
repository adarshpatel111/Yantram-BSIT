import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from "@/components/dashboard/dynamic-breadcrumb";

const DashNavbar = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex h-14 shrink-0 justify-between items-center gap-2 border bg-background transition-[width,height] ease-linear md:left-64 md:w-[calc(100%-16rem)] group-has-data-[collapsible=icon]/sidebar-wrapper:md:left-12 group-has-data-[collapsible=icon]/sidebar-wrapper:md:w-[calc(100%-2rem)]">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <DynamicBreadcrumb />
      </div>
    </header>
  );
};

export default DashNavbar;
