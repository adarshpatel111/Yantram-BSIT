"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Mail,
  Package,
  Users,
  ShoppingCart,
  ArrowUpRight,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const fetchPurchases = async () => {
  const response = await axios.get("/api/purchases");
  return response.data.data;
};

const Dashboard = () => {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;
  const router = useRouter();

  const UserDashboard = () => {
    const { data, isLoading, isError } = useQuery({
      queryKey: ["purchases"],
      queryFn: fetchPurchases,
    });

    return (
      <div className="max-w-4xl mx-auto mt-10 px-4">
        {/* Profile Card */}
        <Card className="shadow-md border-0 rounded-2xl hover:shadow-xl transition relative">
          <CardContent className="p-6 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
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

        {/* Purchases Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Card
            className="shadow-md border-0 rounded-2xl hover:shadow-xl transition relative cursor-pointer"
            onClick={() => router.push("/dashboard/purchased-products")}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Package className="w-8 h-8 text-primary mb-2" />
              {isLoading ? (
                <p className="text-gray-500">Loading purchases...</p>
              ) : isError ? (
                <p className="text-red-500">Failed to load purchases</p>
              ) : (
                <>
                  <p className="text-lg font-semibold">Total Purchases</p>
                  <p className="text-3xl font-bold mt-2">{data?.length || 0}</p>
                </>
              )}
            </CardContent>

            {/* Floating Arrow Button */}
            <div className="absolute bottom-3 right-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/dashboard/purchased-products");
                }}
                className="transition-transform duration-300 ease-in-out hover:rotate-45 hover:translate-x-1 hover:text-black"
              >
                <ArrowUpRight className="w-5 h-5 text-gray-500 hover:text-black" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const AdminDashboard = () => {
    const {
      data: purchases,
      isLoading: loadingPurchases,
      isError: errorPurchases,
    } = useQuery({
      queryKey: ["purchases"],
      queryFn: async () => {
        const res = await axios.get("/api/purchases");
        return res.data.data;
      },
    });

    const {
      data: users,
      isLoading: loadingUsers,
      isError: errorUsers,
    } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axios.get("/api/users");
        return res.data.data;
      },
    });

    if (loadingPurchases || loadingUsers)
      return <div className="p-6 text-center">Loading...</div>;
    if (errorPurchases || errorUsers)
      return (
        <div className="p-6 text-center text-red-500">Failed to load data</div>
      );

    return (
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="flex justify-end mb-6">
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="flex items-center space-x-2 px-4 py-2"
                onClick={() => router.push("/dashboard/accounts")}
              >
                <UserPlus className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Co-Admin</TooltipContent>
          </Tooltip>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="shadow-md border-0 rounded-2xl hover:shadow-xl transition relative cursor-pointer"
            onClick={() => router.push("/dashboard/users")}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Users className="w-8 h-8 text-primary mb-2" />
              <p className="text-lg font-semibold">Total Users</p>
              <p className="text-3xl font-bold mt-2">{users.length}</p>
            </CardContent>
            <div className="absolute bottom-3 right-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/dashboard/users");
                }}
                className="transition-transform duration-300 ease-in-out hover:rotate-45 hover:translate-x-1 hover:text-black"
              >
                <ArrowUpRight className="w-5 h-5 text-gray-500 hover:text-black" />
              </Button>
            </div>
          </Card>

          <Card
            className="shadow-md border-0 rounded-2xl hover:shadow-xl transition relative cursor-pointer"
            onClick={() => router.push("/dashboard/purchases")}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-primary mb-2" />
              <p className="text-lg font-semibold">Total Purchases</p>
              <p className="text-3xl font-bold mt-2">{purchases.length}</p>
            </CardContent>
            <div className="absolute bottom-3 right-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/dashboard/purchases");
                }}
                className="transition-transform duration-300 ease-in-out hover:rotate-45 hover:translate-x-1 hover:text-black"
              >
                <ArrowUpRight className="w-5 h-5 text-gray-500 hover:text-black" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-gradient-to-br from-primary-100 via-white to-primary-200 min-h-screen">
      <div className="relative w-full h-56 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent rounded-b-3xl"></div>
        <h1 className="mt-4 text-3xl font-bold text-primary relative z-10">
          Welcome to Yantram 🎉
        </h1>
        <p className="text-gray-700 mt-1 relative z-10">
          Happy to see you, {session?.user?.name || "User"} 👋
        </p>
      </div>
      {role === "admin" || role === "manager" ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default Dashboard;
