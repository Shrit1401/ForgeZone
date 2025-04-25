import Navbar from "@/components/Navbar";

import { AuthenticationMetadata } from "@/lib/metadatas";
import { Metadata } from "next";

export const metadata: Metadata = AuthenticationMetadata;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
    </>
  );
}
