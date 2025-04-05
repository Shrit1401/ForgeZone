import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge Zone",
  description: "forge zone",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en dark">
      <head>
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@200..800&display=swap");
        </style>
      </head>
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
