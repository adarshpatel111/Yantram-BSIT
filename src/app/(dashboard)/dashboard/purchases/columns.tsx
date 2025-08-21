"use client";

import { DeleteModal } from "@/components/dashboard/purchases/delete-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IPurchase } from "@/types/purchases";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon } from "lucide-react";

export function getColumns(data: IPurchase[]): ColumnDef<IPurchase>[] {
  const baseColumns: ColumnDef<IPurchase>[] = [
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
  ];

  const possibleColumns: ColumnDef<IPurchase>[] = [
    { accessorKey: "_id", header: "ID" },
    { accessorKey: "name", header: "Product Name" },
    { accessorKey: "fullName", header: "Full Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "contactNumber", header: "Contact Number" },
    { accessorKey: "consumerNumber", header: "Consumer No." },
    { accessorKey: "discom", header: "Discom" },
    { accessorKey: "kw", header: "KW" },
    { accessorKey: "variant", header: "Variant" },
    {
      accessorKey: "createdAt",
      header: "Purchase Date",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return <span>{date.toLocaleDateString()}</span>;
      },
    },
  ];

  const actionColumn: ColumnDef<IPurchase> = {
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
  };

  // 🔹 detect keys in root level
  const availableKeys = new Set(data.flatMap((item) => Object.keys(item)));

  // 🔹 detect keys in selectedVariant
  const variantKeys = new Set(
    data.flatMap((item) =>
      item.selectedVariant ? Object.keys(item.selectedVariant) : []
    )
  );

  // 🔹 filter root-level columns
  const filteredColumns = possibleColumns.filter(
    (col): col is ColumnDef<IPurchase> => {
      return "accessorKey" in col && availableKeys.has(col.accessorKey);
    }
  );

  // 🔹 build dynamic variant columns
  const variantColumns: ColumnDef<IPurchase>[] = Array.from(variantKeys).map(
    (key) => ({
      id: `selectedVariant.${key}`,
      header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize
      cell: ({ row }) => {
        return (
          <span>{(row.original as any).selectedVariant?.[key] ?? "-"}</span>
        );
      },
    })
  );

  return [...baseColumns, ...filteredColumns, ...variantColumns, actionColumn];
}
