import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/providers/ConvexProviderWithClerk";
import { ThemeProvider } from "@/providers/theme-provider";
import { EdgeStoreProvider } from "../lib/edgestore";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charcha",
  description:
    "A modern Indian social platform where conversations flow freely. Share your thoughts, connect with people, and be heard.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      <body className={`${dmSans.style} ${dmSans.className} antialiased`}>
        <ClerkProvider>
          <ConvexClientProvider>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
