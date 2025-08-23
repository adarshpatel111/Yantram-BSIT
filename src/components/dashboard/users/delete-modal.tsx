"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DeleteModalProps {
  userId: string; // ✅ expects _id from IUser
  onSuccess?: () => void;
  onError?: (err: Error) => void;
  trigger?: ReactNode; // ✅ allow custom trigger (e.g., trash icon button)
}

export function DeleteModal({
  userId,
  onSuccess,
  onError,
  trigger,
}: DeleteModalProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // ✅ Mutation hook
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/api/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // 🔄 refetch users
      onSuccess?.();
      setOpen(false);
    },
    onError: (err: any) => {
      onError?.(err);
    },
  });

  return (
    <>
      {/* ✅ If trigger is provided, use it, otherwise fallback to default trash icon */}
      {trigger ? (
        <span onClick={() => setOpen(true)}>{trigger}</span>
      ) : (
        <Button size="sm" variant="destructive" onClick={() => setOpen(true)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteMutation.mutate(userId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
