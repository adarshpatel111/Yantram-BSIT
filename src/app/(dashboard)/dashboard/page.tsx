"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import Dashboard from "@/components/dashboard/dashboard/dashboard";

const DashboardPage: React.FC = () => {
  const signOut = authClient.signOut;
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
