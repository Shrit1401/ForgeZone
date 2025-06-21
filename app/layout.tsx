import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { HomeMetadata } from "@/lib/metadatas";
import { PostHogProvider } from "@/components/PostHogProvider";

export const metadata: Metadata = HomeMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="//i.imgur.com" />
        <link rel="dns-prefetch" href="//i.postimg.cc" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen flex flex-col"
      >
        <PostHogProvider>
          {children}
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  );
}
