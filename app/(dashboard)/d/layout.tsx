import DashboardNavbar from "./DashboardNavbar";

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
