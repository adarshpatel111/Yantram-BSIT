"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { EditIcon, Loader2, Eye, EyeOff } from "lucide-react";
import { IUser } from "@/types/user-account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface EditModalProps {
  user: IUser;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

// Roles you want to support
const roles = ["admin", "user", "manager"];

export function EditModal({ user, onSuccess, onError }: EditModalProps) {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    role: user.role || "user",
    password: "", // leave empty by default
  });

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      if (!user._id) throw new Error("User ID is missing");
      const res = await axios.patch(`/api/users/${user._id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
      setOpen(false);
    },
    onError: (err: any) => {
      onError?.(err);
    },
  });

  return (
    <>
      <Button
        size="sm"
        className="cursor-pointer"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <EditIcon className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Full name"
              disabled
            />
            <Input
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="Email"
              disabled
            />
            <Input
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              placeholder="Phone"
            />

            {/* Role Select */}
            <Select
              value={form.role}
              onValueChange={(value) => setForm((p) => ({ ...p, role: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                placeholder="New Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={editMutation.isPending}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={() => editMutation.mutate(form)}
              className="cursor-pointer"
              disabled={editMutation.isPending}
            >
              {editMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
