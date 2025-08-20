"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IPurchase } from "@/types/purchases";
import { UsersPagination } from "./pagination";
import { DataTable } from "./data-table";
import { columns } from "./columns";

// API fetch function
const fetchPurchases = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<{ data: IPurchase[]; total: number; totalPages: number }> => {
  const res = await axios.get(`/api/purchases?page=${page}&limit=${limit}`);
  return res.data;
};

const PurchasesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5; // rows per page

  const { data, isPending } = useQuery({
    queryKey: ["purchases", page, limit],
    queryFn: () => fetchPurchases({ page, limit }),
  });

  if (isPending) return <div className="p-4">Loading purchases...</div>;

  return (
    <div className="py-5 space-y-4">
      <h2 className="text-xl font-semibold">Purchases</h2>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data?.data || []}
        key={`purchases-table-${page}`}
      />

      {/* Pagination */}
      <UsersPagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default PurchasesPage;
