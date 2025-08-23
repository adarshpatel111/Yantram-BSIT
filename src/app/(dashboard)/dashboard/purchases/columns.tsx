"use client";

import { DeleteModal } from "@/components/dashboard/purchases/delete-modal";
import EditPurchaseModal from "@/components/dashboard/purchases/edit-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IPurchase } from "@/types/purchases";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

function ActionsCell({ purchase }: { purchase: IPurchase }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="flex gap-2">
      {/* View */}
      <Button
        size="sm"
        className="cursor-pointer"
        onClick={() =>
          toast.info("Viewing purchase", {
            description: `ID: ${purchase._id ?? "-"}`,
          })
        }
        variant="outline"
      >
        <EyeIcon className="w-4 h-4" />
      </Button>

      {/* Edit */}
      <>
        <Button
          size="sm"
          className="cursor-pointer"
          onClick={() => setEditOpen(true)}
          variant="outline"
        >
          <EditIcon className="w-4 h-4" />
        </Button>
        {editOpen && purchase._id && (
          <EditPurchaseModal
            purchaseId={purchase._id}
            open={editOpen}
            onClose={() => setEditOpen(false)}
          />
        )}
      </>

      {/* Delete */}
      {purchase._id && (
        <DeleteModal
          purchaseId={purchase._id}
          onSuccess={() =>
            toast.success("Purchase deleted", {
              description: `Purchase ID: ${purchase._id} removed successfully`,
            })
          }
        />
      )}
    </div>
  );
}

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
      header: "Customer Number",
      cell: ({ row }) => <span>{row.original.userDetails?.phone ?? "-"}</span>,
    },
  ];

  const purchaseColumns: ColumnDef<IPurchase>[] = [
    {
      accessorKey: "name",
      header: "Customer Name",
      cell: ({ row }) => <span>{row.original.name ?? "-"}</span>,
    },
    {
      accessorKey: "discom",
      header: "Discom",
      cell: ({ row }) => <span>{row.original.discom ?? "-"}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Purchase Date",
      cell: ({ row }) => {
        const date = row.original.createdAt
          ? new Date(row.original.createdAt)
          : null;
        return <span>{date ? date.toLocaleDateString() : "-"}</span>;
      },
    },
    {
      accessorKey: "productStatus",
      header: "Status",
      cell: ({ row }) => <span>{row.original.productStatus ?? "-"}</span>,
    },
  ];

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
        <span>{row.original.selectedVariant?.[key] ?? "-"}</span>
      ),
    })
  );

  const actionColumn: ColumnDef<IPurchase> = {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell purchase={row.original} />,
  };

  return [
    ...baseColumns,
    ...userColumns,
    ...purchaseColumns,
    ...variantColumns,
    actionColumn,
  ];
}
