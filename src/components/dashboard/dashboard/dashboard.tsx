"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Package } from "lucide-react";
import { useRouter } from "next/navigation";

const fetchPurchases = async () => {
  const response = await axios.get("/api/purchases");
  return response.data;
};

const Dashboard = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["purchases"],
    queryFn: fetchPurchases,
  });

  return (
    <div className="w-full bg-gradient-to-br from-primary-100 via-white to-primary-200">
      <div className="relative w-full h-56 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent rounded-b-3xl"></div>
        <h1 className="mt-4 text-3xl font-bold text-primary relative z-10">
          Welcome to Yantram 🎉
        </h1>
        <p className="text-gray-700 mt-1 relative z-10">
          Happy to see you, {session?.user?.name || "User"} 👋
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-4">
        <Card className="shadow-lg border-0 bg-card/70 backdrop-blur-sm rounded-2xl">
          <CardContent className="p-6 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">
                {session?.user?.name || "User"}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Card
            className="shadow-md border-0 rounded-2xl cursor-pointer hover:shadow-xl transition"
            onClick={() => router.push("/dashboard/purchased-products")}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Package className="w-8 h-8 text-primary mb-2" />
              {isLoading ? (
                <p className="text-gray-500">Loading purchases...</p>
              ) : isError ? (
                <p className="text-red-500">Failed to load purchases</p>
              ) : (
                <p className="text-lg font-semibold">
                  You have{" "}
                  <span className="text-primary">{data?.length || 0}</span>{" "}
                  purchases
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={() => router.push("/dashboard/purchased-products")}
            className="px-6 py-3 text-lg rounded-xl cursor-pointer"
          >
            View Purchased Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
