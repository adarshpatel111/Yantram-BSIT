"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteModalProps {
  purchaseId: string;
  onSuccess: () => void;
  onError: (err: string) => void;
}

export function DeleteModal({
  purchaseId,
  onSuccess,
  onError,
}: DeleteModalProps) {
  const handleDelete = async () => {
    try {
      // TODO: Replace this with your API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Purchase deleted successfully");
      onSuccess();
    } catch (err: any) {
      toast.error("Failed to delete purchase");
      onError(err?.message || "Error occurred");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete this
            purchase and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-white hover:bg-destructive/90"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
