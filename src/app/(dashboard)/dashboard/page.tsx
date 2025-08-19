"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const DashboardPage: React.FC = () => {
  const signOut = authClient.signOut;
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      DashboardPage
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default DashboardPage;
