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

export function SimpleHeader() {
  const [open, setOpen] = React.useState(false);

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
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-border bg-[#f3f3f3]">
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
          <Button className="rounded-base border-2 border-border bg-white px-4 xl:px-6 py-2 text-sm xl:text-base font-bold text-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none hover:bg-white/90">
            Sign In
          </Button>
          <Button className="rounded-base border-2 border-border bg-main px-4 xl:px-6 py-2 text-sm xl:text-base font-bold text-main-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none hover:bg-main/90">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
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
            className="w-70 sm:w-[320px] border-l-4 border-border bg-background"
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
              {/* Mobile Logo */}

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
              <Button className="w-full rounded-base border-2 border-border bg-white px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
                Sign In
              </Button>
              <Button className="w-full rounded-base border-2 border-border bg-main px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-main-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
                Get Started
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
