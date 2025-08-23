"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { IPurchase } from "@/types/purchases";
import { toast } from "sonner";

async function getPurchaseById(id: string) {
  const { data } = await axios.get(`/api/purchases/${id}`);
  return data as IPurchase;
}

async function updatePurchaseStatus(id: string, status: string) {
  const { data } = await axios.patch(`/api/purchases/${id}`, {
    productStatus: status,
  });
  return data;
}

export default function EditPurchaseModal({
  purchaseId,
  open,
  onClose,
}: {
  purchaseId: string;
  open: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const {
    data: purchase,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["purchase", purchaseId],
    queryFn: () => getPurchaseById(purchaseId),
    enabled: !!purchaseId,
  });

  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const mutation = useMutation({
    mutationFn: (status: string) => updatePurchaseStatus(purchaseId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase", purchaseId] });
      toast.success("Status updated successfully");
      onClose();
    },
    onError: (err: any) => {
      console.error(err);
      toast.error("Failed to update status");
    },
  });

  if (isLoading) return null;
  if (isError || !purchase) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-2">
          {/* Customer Info */}
          <div className="flex flex-col">
            <Label className="text-gray-700">Customer</Label>
            <span className="text-gray-900">
              {purchase.userDetails?.name ?? "-"}
            </span>
          </div>

          <div className="flex flex-col">
            <Label className="text-gray-700">Email</Label>
            <span className="text-gray-900">
              {purchase.userDetails?.email ?? "-"}
            </span>
          </div>

          <div className="flex flex-col">
            <Label className="text-gray-700">Phone</Label>
            <span className="text-gray-900">
              {purchase.userDetails?.phone ?? "-"}
            </span>
          </div>

          <div className="flex flex-col">
            <Label className="text-gray-700">Consumer No.</Label>
            <span className="text-gray-900">
              {purchase.consumerNumber ?? "-"}
            </span>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Label className="text-gray-700">Product</Label>
            <span className="text-gray-900">{purchase.discom ?? "-"}</span>
          </div>

          {purchase.selectedVariant &&
            Object.entries(purchase.selectedVariant).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <Label className="text-gray-700">{key}</Label>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}

          {/* Product Status (editable) */}
          <div className="flex flex-col col-span-2 mt-2">
            <Label>Product Status</Label>
            <Select
              defaultValue={purchase.productStatus}
              onValueChange={(value) => setSelectedStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Dispatched">Dispatched</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            className="w-full"
            onClick={() => selectedStatus && mutation.mutate(selectedStatus)}
            disabled={
              mutation.isPending ||
              !selectedStatus ||
              selectedStatus === purchase.productStatus
            }
          >
            {mutation.isPending ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
