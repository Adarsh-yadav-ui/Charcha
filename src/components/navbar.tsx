import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuToggle } from "@/components/menu-toggle";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { api } from "../../convex/_generated/api";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const currentUser = useQuery(api.users.current);

  const links = [
    {
      label: "Features",
      href: "/features",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Hire me",
      href: "https://www.fiverr.com/adarsh_yadav_ui",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black dark:bg-black bg-[#ededed]">
      <nav className="mx-auto flex h-16 sm:h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo_black.svg"
            alt="logo"
            height={100}
            width={100}
            className="h-8 w-auto sm:h-10 md:h-12 lg:h-auto lg:w-37.5 block dark:hidden"
          />
          <Image
            src="/logo_white.svg"
            alt="logo"
            height={100}
            width={100}
            className="h-8 w-auto sm:h-10 md:h-12 lg:h-auto lg:w-37.5 dark:block hidden"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              className="text-sm xl:text-base font-bold text-foreground hover:underline decoration-2 underline-offset-4 transition-all"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Unauthenticated>
            <SignInButton mode="modal">
              <Button variant="neutral">Sign In</Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button>Get Started</Button>
            </SignUpButton>
          </Unauthenticated>

          <Authenticated>
            <Link href="/dashboard">
              <Button variant="neutral">Dashboard</Button>
            </Link>
            <UserButton />
          </Authenticated>
          <AnimatedThemeToggler />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <Button size="icon" className="lg:hidden h-10 w-10 sm:h-12 sm:w-12">
            <MenuToggle
              strokeWidth={2.5}
              open={open}
              onOpenChange={setOpen}
              className="size-6 sm:size-8"
            />
          </Button>

          {/* Mobile Menu Sheet */}
          <SheetContent
            className="w-70 sm:w-[320px] border-l-4 border-border"
            side="left"
          >
            <SheetHeader className="mx-auto ml-0.5 mt-5 ">
              <SheetTitle>
                <div className="flex items-center gap-2 sm:mb-4">
                  <Image
                    src="/logo_black.svg"
                    alt="logo"
                    height={100}
                    width={100}
                    className="h-8 w-auto sm:h-10 md:h-12 lg:h-auto lg:w-37.5 block dark:hidden"
                  />
                  <Image
                    src="/logo_white.svg"
                    alt="logo"
                    height={100}
                    width={100}
                    className="h-8 w-auto sm:h-10 md:h-12 lg:h-auto lg:w-37.5 dark:block hidden"
                  />
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 sm:gap-6 pt-8 sm:pt-12">
              {/* Mobile Navigation Links */}
              {links.map((link) => (
                <Link
                  key={link.label}
                  className="text-lg sm:text-xl font-bold px-4 py-2 hover:bg-main/20 border-l-4 border-transparent hover:border-border transition-all"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Footer with CTA Buttons */}
            <SheetFooter className="absolute bottom-6 sm:bottom-8 left-0 w-full px-4 sm:px-6 flex flex-col gap-3 sm:gap-4">
              <Unauthenticated>
                <SignInButton mode="modal">
                  <Button variant="neutral">Sign In</Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button>Get Started</Button>
                </SignUpButton>
              </Unauthenticated>
              <Authenticated>
                <div className="flex items-center justify-between gap-4">
                  {/* User Profile Section */}
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex-1 min-w-0">
                    <div className="shrink-0 pt-2">
                      <UserButton />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {(currentUser?.firstName == undefined && (
                          <span className="text-md dark:text-gray-400 truncate">
                            Fetching Name
                          </span>
                        )) ||
                          currentUser?.firstName}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {(currentUser?.email == undefined && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            Fetching Email
                          </span>
                        )) ||
                          currentUser?.email}
                      </span>
                    </div>
                  </div>

                  {/* Theme Toggle Section */}
                  <div className="shrink-0">
                    <AnimatedThemeToggler className="hover:border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200 cursor-pointer p-2" />
                  </div>
                </div>
              </Authenticated>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
