import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from "@/components/dashboard/dynamic-breadcrumb";
import { authClient } from "@/lib/auth-client";

const DashNavbar: React.FC = () => {
  const { data: session } = authClient.useSession();
  const branch = session?.user?.branch;
  const role = session?.user?.role;

  return (
    <header
      className="fixed top-0 right-0 left-0 z-40 flex h-14 shrink-0 justify-between items-center gap-2 border bg-background transition-[width,height] ease-linear 
      md:left-64 md:w-[calc(100%-16rem)] 
      group-has-data-[collapsible=icon]/sidebar-wrapper:md:left-12 
      group-has-data-[collapsible=icon]/sidebar-wrapper:md:w-[calc(100%-2rem)]"
    >
      {/* Left Section */}
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <DynamicBreadcrumb />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 px-4">
        {role === "manager" && branch && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold shadow-sm">
            Branch: {branch.toUpperCase()}
          </span>
        )}
        {role === "admin" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold shadow-sm">
            {role.toUpperCase()}
          </span>
        )}
      </div>
    </header>
  );
};

export default DashNavbar;
