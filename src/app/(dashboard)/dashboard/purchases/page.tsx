"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IPurchase } from "@/types/purchases";
import { UsersPagination } from "./pagination";
import { DataTable } from "./data-table";
import PageLimitSelector from "@/components/PageLimitSelector";
import { authClient } from "@/lib/auth-client";
import { getColumns } from "./columns";
import Loader from "@/components/loader/Loader";

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
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, isPending } = useQuery({
    queryKey: ["purchases", page, limit],
    queryFn: () => fetchPurchases({ page, limit }),
  });

  if (isPending)
    return (
      <div className="p-4">
        <Loader />
      </div>
    );

  if (role !== "admin" && role !== "manager") {
    return (
      <div className="flex items-center justify-center text-3xl font-semibold">
        Unauthorized
      </div>
    );
  }

  return (
    <div className="py-5 space-y-4">
      <h2 className="text-xl font-semibold">Purchases</h2>

      <DataTable
        columns={getColumns(data?.data || [])}
        data={data?.data || []}
        key={`purchases-table-${page}`}
      />
      <div className="w-full flex items-center justify-between">
        <PageLimitSelector limit={limit} setLimit={setLimit} />

        <UsersPagination
          currentPage={page}
          totalPages={data?.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default PurchasesPage;
