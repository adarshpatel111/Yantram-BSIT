"use client";

import { DeleteModal } from "@/components/dashboard/purchases/delete-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IPurchase } from "@/types/purchases";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon } from "lucide-react";

export const columns: ColumnDef<IPurchase>[] = [
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

  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "consumerNumber",
    header: "Consumer No.",
  },
  {
    accessorKey: "discom",
    header: "Discom",
  },
  {
    accessorKey: "kw",
    header: "KW",
  },
  {
    accessorKey: "variant",
    header: "Variant",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => console.log("View", row.original)}
          variant="outline"
        >
          <EyeIcon className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => console.log("Edit", row.original)}
          variant="outline"
        >
          <EditIcon className="w-4 h-4" />
        </Button>
        <DeleteModal />
      </div>
    ),
  },
];
