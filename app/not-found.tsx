import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://i.postimg.cc/65j1nMBY/image.png")',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
          seems like you
          <br />
          are lost.
        </h1>
        <p className="text-xl text-gray-200 mt-4">
          it could be you. it could be us. but let's take you back home.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 font-bold text-lg bg-white text-black hover:bg-gray-200"
        >
          <Link href="/">go home</Link>
        </Button>
      </div>
    </div>
  );
}
