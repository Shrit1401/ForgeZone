"use client";
import { Suspense } from "react";
import Btn from "@/components/Btn";
import { Input } from "@/components/ui/input";
import { signInWithEmail } from "@/lib/auth/auth";
import React from "react";
import { useSearchParams } from "next/navigation";

// New component to handle search params and login logic
const LoginContent = () => {
  const [email, setEmail] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [successfulLogin, setSuccessfulLogin] = React.useState<boolean>(false);

  // Get the redirectTo parameter from the URL
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const handleLogin = async (email: string) => {
    setLoading(true);
    // Pass the redirectTo parameter to the sign-in function
    const res = await signInWithEmail(email, redirectTo || undefined);
    if (res) {
      console.log("Login successful:", res);
      setSuccessfulLogin(true);
    } else {
      console.log("Login failed");
      setSuccessfulLogin(false);
    }
    setLoading(false);
  };

  return (
    <div className="w-full mx-10">
      <h1 className="text-6xl manrope font-semibold mb-8">
        LFG
        <span className="text-2xl manrope ml-2">let's fricking go</span>
      </h1>
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        className="mb-4"
      />

      <Btn
        title={loading ? "Loading..." : "Let's Go"}
        className="w-full mt-4 py-2"
        type="outline"
        onClick={() => handleLogin(email)}
      />
      {successfulLogin && (
        <p className="text-gray-500 mt-4">
          {successfulLogin
            ? "Check your email for the magic link!"
            : "Please enter your email to receive a magic link."}
        </p>
      )}
    </div>
  );
};

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        {/* Wrap the component using useSearchParams with Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <LoginContent />
        </Suspense>
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
};

export default LoginPage;
