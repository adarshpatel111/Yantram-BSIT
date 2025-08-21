"use client";

import * as React from "react";
import { LayoutDashboard } from "lucide-react";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { SidebarHeaderNav } from "@/components/dashboard/sidebar-header-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const navConfig = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        roles: ["admin", "manager", "user"],
      },
      {
        title: "Purchased Products",
        url: "/dashboard/purchased-products",
        roles: ["user"],
      },
      { title: "Products", url: "/dashboard/products", roles: ["user"] },
      { title: "Users", url: "/dashboard/users", roles: ["admin", "manager"] },
      {
        title: "Purchases",
        url: "/dashboard/purchases",
        roles: ["admin", "manager"],
      },
      {
        title: "Accounts",
        url: "/dashboard/accounts",
        roles: ["admin"],
      },
    ],
  },
];

export function AppSidebar({
  userRole = "user",
  ...props
}: React.ComponentProps<typeof Sidebar> & { userRole?: string }) {
  const filteredNav = navConfig.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.roles.includes(userRole)),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeaderNav />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
