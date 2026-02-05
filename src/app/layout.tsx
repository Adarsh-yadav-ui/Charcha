import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charcha",
  description: "A modern Indian social platform where conversations flow freely. Share your thoughts, connect with people, and be heard.",
  icons: {
    icon: "/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.style} ${dmSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
