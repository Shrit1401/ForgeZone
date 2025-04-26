import { Metadata } from "next";
import DashboardNavbar from "./DashboardNavbar";
import DashboardAuth from "@/components/dashboard/DashboardAuth";

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
    <DashboardAuth>
      <DashboardNavbar />
      <main className="flex-grow">{children}</main>
    </DashboardAuth>
  );
}
