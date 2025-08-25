"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { data } = authClient.useSession();

  const links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Products", href: "/products" },
    { title: "Contact", href: "/contact" },
  ];

  const isLoggedIn = !!data?.session;

  return (
    <nav className="fixed top-8 w-full flex justify-center items-center px-5 md:px-10 lg:px-20 z-30">
      <div className="container h-16 w-full border rounded-2xl flex justify-between items-center px-5 md:px-8 lg:px-10 bg-background/80 backdrop-blur">
        <Link href="/">
          <div className="h-10 w-10 rounded-full cursor-pointer flex gap-1 items-center">
            <Image
              src="/yantram.jpeg"
              alt="yantram"
              className="rounded-full"
              width={40}
              height={40}
            />
            <p className="whitespace-nowrap text-xl font-bold">Yantram</p>
          </div>
        </Link>

        <div className="flex gap-6 justify-center items-center">
          <div className="hidden md:flex gap-4">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-full px-2.5 py-1.5 rounded-md hover:bg-secondary transition-all font-medium"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4">
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button size="sm" className="cursor-pointer">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm" className="cursor-pointer">
                  Login
                </Button>
              </Link>
            )}

            <Button
              className="flex md:hidden"
              variant="outline"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="z-50">
          <SheetHeader>
            <SheetTitle className="text-bold text-2xl border-b py-5">
              Yantram
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="px-5 flex flex-col gap-4">
            {links.map((item) => (
              <SheetClose key={item.href} asChild>
                <Link href={item.href} className="text-xl">
                  {item.title}
                </Link>
              </SheetClose>
            ))}
          </SheetDescription>
          <SheetFooter className="flex flex-col gap-3">
            <Link href="/login">
              <Button size="sm" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" variant="outline" className="w-full">
                Register
              </Button>
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
