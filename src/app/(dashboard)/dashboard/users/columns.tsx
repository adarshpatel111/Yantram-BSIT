"use client";

import { DeleteModal } from "@/components/dashboard/users/delete-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IUser } from "@/types/user-account";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon } from "lucide-react";
import { toast } from "sonner"; // 👈 add this

export const columns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "role", header: "Role" },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast.info("Viewing user", {
              description: `User: ${row.original.name}`,
            })
          }
        >
          <EyeIcon className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast("Edit user", {
              description: `User: ${row.original.name}`,
            })
          }
        >
          <EditIcon className="w-4 h-4" />
        </Button>
        {/* Pass success + error callbacks to DeleteModal */}
        <DeleteModal
          userId={row.original._id}
          onSuccess={() =>
            toast.success("User deleted", {
              description: `${row.original.name} has been removed.`,
            })
          }
          onError={(err: Error) =>
            toast.error("Delete failed", { description: err.message })
          }
        />
      </div>
    ),
  },
];
