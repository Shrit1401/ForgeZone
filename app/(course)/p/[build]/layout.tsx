import Navbar from "@/components/Navbar";
import { RotateCw } from "lucide-react";

function MobileOrientationWarning() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm md:hidden portrait:flex landscape:hidden">
      <div className="mx-4 max-w-sm rounded-lg border bg-card p-6 text-card-foreground shadow-lg">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-accent p-3">
            <RotateCw className="h-6 w-6 text-accent-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Rotate Your Device</h3>
            <p className="text-sm text-muted-foreground">
              We're working on making this experience better for mobile devices.
              For now, please rotate your screen to landscape mode for the best
              experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <MobileOrientationWarning />
      <main className="flex-grow">{children}</main>
    </>
  );
}
