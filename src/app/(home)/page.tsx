"use client";

import { Hexagon, Github, Twitter } from "lucide-react";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero";
import { SimpleHeader } from "@/components/simple-header";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <SimpleHeader />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Footer
          logo={
            <Image
              src="/logo.svg"
              alt="logo"
              width={10}
              height={10}
              className="h-7 w-7"
            />
          }
          brandName="Charcha"
          socialLinks={[
            {
              icon: <Twitter className="h-5 w-5" />,
              href: "https://twitter.com",
              label: "Twitter",
            },
            {
              icon: <Github className="h-5 w-5" />,
              href: "https://github.com/Adarsh-yadav-ui/",
              label: "GitHub",
            },
          ]}
          mainLinks={[
            { href: "/products", label: "Products" },
            { href: "/about", label: "About" },
            { href: "/blog", label: "Blog" },
            { href: "/contact", label: "Contact" },
          ]}
          legalLinks={[
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ]}
          copyright={{
            text: "© 2024 Adarsh Yadav's org",
            license: "All rights reserved by Adarsh Yadav",
          }}
        />
      </motion.div>
    </div>
  );
}