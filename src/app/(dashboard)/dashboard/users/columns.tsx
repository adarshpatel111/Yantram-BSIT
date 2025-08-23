"use client";

import { DeleteModal } from "@/components/dashboard/users/delete-modal";
import { EditModal } from "@/components/dashboard/users/edit-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IUser } from "@/types/user-account";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

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
        {/* View */}
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

        {/* Edit */}
        <EditModal
          user={row.original}
          onSuccess={() =>
            toast.success("User updated", {
              description: `${row.original.name} was updated.`,
            })
          }
          onError={(err) =>
            toast.error("Update failed", { description: err.message })
          }
        />

        {/* Delete */}
        <DeleteModal
<<<<<<< Updated upstream
          userId={row.original._id}
=======
          userId={row.original._id} // ✅ FIXED: using _id
          trigger={
            <Button size="sm" variant="destructive">
              <TrashIcon className="w-4 h-4" />
            </Button>
          }
>>>>>>> Stashed changes
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
