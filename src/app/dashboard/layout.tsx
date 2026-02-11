import { Sidebar } from "@/components/sidebar";
import type { Metadata } from "next";

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
    <main className="flex h-screen overflow-hidden bg-amber-50 dark:bg-zinc-950">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        {children}
      </div>
    </main>
  );
}
