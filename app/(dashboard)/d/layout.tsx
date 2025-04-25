import { Metadata } from "next";
import DashboardNavbar from "./DashboardNavbar";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNavbar />
      <main className="flex-grow">{children}</main>
    </>
  );
}
