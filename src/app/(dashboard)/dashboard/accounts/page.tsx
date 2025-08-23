"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Branches } from "@/components/dashboard/branches";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  username: z.string().min(2, "Full name must be at least 2 characters"),
  useremail: z.string().email("Invalid email address"),
  userpnumber: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone must contain only numbers"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin", "manager"]),
  branch: z.string().nonempty("Please select a branch"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AccountPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      useremail: "",
      userpnumber: "",
      password: "",
      role: "user",
      branch: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const res = await authClient.signUp.email({
        name: data.username,
        email: data.useremail,
        password: data.password,
        phone: data.userpnumber,
        branch: data.branch,
        role: data.role,
      });

      toast.success("Account created successfully!", {
        description: "Welcome aboard 🚀 Redirecting you to dashboard...",
      });

      reset();
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Signup failed!", {
        description: error.message || "Something went wrong. Try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex p-6 justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Full Name</Label>
              <Input
                id="username"
                placeholder="Enter your full name"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="useremail">Email</Label>
              <Input
                id="useremail"
                type="email"
                placeholder="you@example.com"
                {...register("useremail")}
              />
              {errors.useremail && (
                <p className="text-sm text-red-500">
                  {errors.useremail.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="userpnumber">Phone</Label>
              <Input
                id="userpnumber"
                type="tel"
                placeholder="9876543210"
                {...register("userpnumber")}
              />
              {errors.userpnumber && (
                <p className="text-sm text-red-500">
                  {errors.userpnumber.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="role">Role</Label>
                <Select
                  defaultValue="user"
                  onValueChange={(val: "user" | "admin" | "manager") =>
                    setValue("role", val, { shouldValidate: true })
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="branch">Branch</Label>
                <Select
                  onValueChange={(val: string) =>
                    setValue("branch", val, { shouldValidate: true })
                  }
                >
                  <SelectTrigger id="branch">
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {Branches.map((branch) => (
                      <SelectItem key={branch.key} value={branch.label}>
                        {branch.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.branch && (
                  <p className="text-sm text-red-500">
                    {errors.branch.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
