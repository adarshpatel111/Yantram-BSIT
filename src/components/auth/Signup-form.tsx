"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Yantramlogo from "../../../public/logo.jpeg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  userpnumber: z.string().regex(/^\d{10,}$/, {
    message: "Phone number must be at least 10 digits.",
  }),
  useremail: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      userpnumber: "",
      useremail: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const res = await authClient.signUp.email({
        name: data.username,
        email: data.useremail,
        password: data.password,
        phone: data.userpnumber,
      });
      console.log("result", res);
      form.reset();
      setIsLoading(false);
      redirect("/dashboard");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-4 md:p-6">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <Image
            src={Yantramlogo}
            alt="App Logo"
            width={80}
            height={80}
            className="rounded-md"
            priority
          />
        </div>
        <div>
          <CardTitle className="text-xl md:text-2xl">
            Create your account
          </CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userpnumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="useremail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="yantram566@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="************"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <div className="w-full flex justify-center items-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline ml-1">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
