"use client";
import Btn from "@/components/Btn";
import { Suspense } from "react";

function AuthAwesomeContent() {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full mx-10">
          <h1 className="text-6xl manrope font-semibold mb-2">You're In</h1>
          <p className="text-xl manrope mb-8">Let's get you started!</p>
          <Btn
            title="Get Started"
            className="w-full mt-4 py-2"
            type="outline"
            link="/profile"
          />
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-gray-100">
        <img
          src="https://i.imgur.com/bwXwsl3.png"
          alt="Login illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

const AuthCorrectPage = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <AuthAwesomeContent />
    </Suspense>
  );
};

export default AuthCorrectPage;
