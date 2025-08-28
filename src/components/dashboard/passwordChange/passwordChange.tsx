"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff, Shield } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client"; // ✅ use Better Auth client

// ✅ Schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface PasswordChangeProps {
  open: boolean;
  onClose: () => void;
}

export default function PasswordChange({ open, onClose }: PasswordChangeProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // ✅ TanStack mutation calling authClient.changePassword directly
  const mutation = useMutation({
    mutationFn: async (values: PasswordFormValues) => {
      const { data, error } = await authClient.changePassword({
        newPassword: values.newPassword,
        currentPassword: values.currentPassword,
        revokeOtherSessions: true,
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      toast.success("Password updated successfully!");
      onClose();
      form.reset();
    },
    onError: (error: any) => {
      toast.error("Failed to change password", {
        description: error?.message,
      });
    },
  });

  const onSubmit = (values: PasswordFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" /> Change Password
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type={showPassword ? "text" : "password"}
              {...form.register("currentPassword")}
            />
            {form.formState.errors.currentPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              {...form.register("newPassword")}
            />
            {form.formState.errors.newPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Toggle show/hide */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {showPassword ? "Hide Passwords" : "Show Passwords"}
          </Button>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
