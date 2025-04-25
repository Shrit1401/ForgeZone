import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { HomeMetadata } from "@/lib/metadatas";

export const metadata: Metadata = HomeMetadata;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@200..800&display=swap");
        </style>
      </head>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen flex flex-col"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
