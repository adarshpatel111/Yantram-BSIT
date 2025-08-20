"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface Purchase {
  _id: string;
  userId: string;
  productId: string;
  name?: string;
  fullName?: string;
  branch?: string;
  model?: string;
  variant?: string;
  selectedVariant?: Record<string, any>;
  consumerNumber?: string;
  discom?: string;
  kw?: string;
  capacity?: string;
  price?: number;
  contactNumber?: string;
  email?: string;
  aadharNumber?: string;
  paid?: number;
  quantity?: number;
  createdAt: string;
}

const fetchPurchases = async (): Promise<Purchase[]> => {
  const { data } = await axios.get("/api/purchases");
  return data;
};

const Purchased = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["purchases"],
    queryFn: fetchPurchases,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">Loading purchases...</span>
      </div>
    );
  }

  if (isError || !data?.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No purchases found.
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((purchase) => (
        <Card
          key={purchase._id}
          className="rounded-2xl shadow-md hover:shadow-lg transition group overflow-hidden"
        >
          {/* Product header with primary colors */}
          <div className="h-40 bg-gradient-to-r from-primary to-primary-200 flex items-center justify-center">
            <span className="text-4xl font-bold text-white capitalize">
              {purchase.productId}
            </span>
          </div>

          <CardContent className="p-5 space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold truncate">
                {purchase.name || purchase.productId}
              </h2>
              {purchase.model && (
                <p className="text-sm text-gray-500">Model: {purchase.model}</p>
              )}
              {purchase.branch && (
                <p className="text-sm text-gray-500">
                  Branch: {purchase.branch}
                </p>
              )}
              {purchase.capacity && (
                <p className="text-sm text-gray-500">
                  Capacity: {purchase.capacity}
                </p>
              )}
              {purchase.kw && (
                <p className="text-sm text-gray-500">KW: {purchase.kw}</p>
              )}
              {purchase.price && (
                <p className="text-sm font-medium text-gray-800">
                  ₹{purchase.price.toLocaleString()}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(purchase.createdAt).toLocaleDateString()}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push("/dashboard/products")}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Purchased;
