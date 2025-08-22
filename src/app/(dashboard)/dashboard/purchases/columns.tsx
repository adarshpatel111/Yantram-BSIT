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

  // ✅ User detail columns (always on top)
  const userColumns: ColumnDef<IPurchase>[] = [
    {
      id: "userDetails.name",
      header: "User Name",
      cell: ({ row }) => <span>{row.original.userDetails?.name ?? "-"}</span>,
    },
    {
      id: "userDetails.email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.userDetails?.email ?? "-"}</span>,
    },
    {
      id: "userDetails.phone",
      header: "Phone",
      cell: ({ row }) => <span>{row.original.userDetails?.phone ?? "-"}</span>,
    },
  ];

  // ✅ Purchase detail columns
  const purchaseColumns: ColumnDef<IPurchase>[] = [
    { accessorKey: "name", header: "Product Name" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "quantity", header: "Quantity" },
    {
      accessorKey: "createdAt",
      header: "Purchase Date",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return <span>{date.toLocaleDateString()}</span>;
      },
    },
  ];

  // ✅ Variant columns (dynamic)
  const variantKeys = new Set(
    data.flatMap((item) =>
      item.selectedVariant ? Object.keys(item.selectedVariant) : []
    )
  );

  const variantColumns: ColumnDef<IPurchase>[] = Array.from(variantKeys).map(
    (key) => ({
      id: `selectedVariant.${key}`,
      header: key.charAt(0).toUpperCase() + key.slice(1),
      cell: ({ row }) => (
        <span>{(row.original as any).selectedVariant?.[key] ?? "-"}</span>
      ),
    })
  );

  // ✅ Actions
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

  // ✅ Final order: base → user → purchase → variants → actions
  return [
    ...baseColumns,
    ...userColumns,
    ...purchaseColumns,
    ...variantColumns,
    actionColumn,
  ];
}
