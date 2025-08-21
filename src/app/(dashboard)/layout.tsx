"use client";

import DashNavbar from "@/components/dashboard/dash-navbar";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = authClient.useSession();
  const role = data?.user?.role ?? "user";

  return (
    <SidebarProvider>
      <AppSidebar userRole={role} />
      <SidebarInset className="flex flex-1 flex-col">
        <DashNavbar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-14 group-has-data-[collapsible=icon]/sidebar-wrapper:pt-12">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
