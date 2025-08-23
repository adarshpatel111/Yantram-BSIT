"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DataTable } from "./data-table";
import { UsersPagination } from "./pagination";
import { columns } from "./columns";
import PageLimitSelector from "@/components/PageLimitSelector";
import Loader from "@/components/loader/Loader";

// Fetch function with page + limit
const fetchUsers = async ({ page, limit }: { page: number; limit: number }) => {
  const response = await axios.get(`/api/users?page=${page}&limit=${limit}`);
  return response.data;
};

const UsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, isPending } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => fetchUsers({ page, limit }),
  });

  if (isPending)
    return (
      <div>
        <Loader />
      </div>
    );

  console.log("Users ", data);

  return (
    <div className="py-5 space-y-4">
      <h1 className="text-2xl font-bold">Users Table</h1>
      <DataTable
        columns={columns}
        data={data?.data || []}
        key={`users-table-${page}`}
      />
      <div className="w-full flex items-center justify-between">
        <PageLimitSelector limit={limit} setLimit={setLimit} />
        {/* Dynamic Pagination */}
        <UsersPagination
          currentPage={page}
          totalPages={data?.meta.pages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default UsersPage;
