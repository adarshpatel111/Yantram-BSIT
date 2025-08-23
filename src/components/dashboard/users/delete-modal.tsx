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

// ✅ define props interface
interface DeleteModalProps {
  userId: string | number;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

export function DeleteModal({ userId, onSuccess, onError }: DeleteModalProps) {
  const handleDelete = async () => {
    try {
      // call your delete API/mutation here
      console.log("Deleting user:", userId);

      // fake API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Account deleted successfully!");
      onSuccess?.();
    } catch (err) {
      toast.error("Failed to delete account!");
      if (err instanceof Error) {
        onError?.(err);
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all data from our servers.
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
