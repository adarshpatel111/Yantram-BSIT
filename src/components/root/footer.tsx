import Link from "next/link";
import React from "react";
import Logo from "../../../public/yantram.svg";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { IconBrandThreads } from "@tabler/icons-react";

const links = [
  { title: "Features", href: "#" },
  { title: "Solution", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "Contact", href: "#" },
  { title: "About", href: "#" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/yantram_net/",
    ariaLabel: "Instagram",
    icon: <Instagram className="size-6" />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Yantram.net",
    ariaLabel: "Facebook",
    icon: <Facebook className="size-6" />,
  },
  {
    name: "Email",
    href: "mailto:inquiry@yantram.net",
    ariaLabel: "Email",
    icon: <Mail className="size-6" />,
  },
  {
    name: "Phone",
    href: "tel:+917574000768",
    ariaLabel: "Phone",
    icon: <Phone className="size-6" />,
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col justify-center items-center w-full h-full">
      <div className="text-5xl md:text-9xl lg:text-[200px] font-bold -mb-1 md:-mb-5 lg:-mb-5 text-border">
        Yantram
      </div>
      <div className="flex justify-center items-center border-t border-dashed rounded-4xl bg-background w-full h-full p-10">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/"
            aria-label="go home"
            className="mx-auto block size-fit"
          >
            <Image
              src={Logo}
              alt="yantram"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>

          <div className="my-8 flex flex-wrap justify-center gap-6">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={social.ariaLabel}
                className="text-muted-foreground hover:text-primary block"
              >
                {social.icon}
              </Link>
            ))}
          </div>

          <span className="text-muted-foreground block text-center text-sm">
            © {new Date().getFullYear()} Yantram, All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
