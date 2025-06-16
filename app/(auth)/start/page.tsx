"use client";
import { Suspense } from "react";
import Btn from "@/components/Btn";
import { Input } from "@/components/ui/input";
import {
  signInWithEmail,
  signUpWithEmail,
  signUpWithGoogle,
} from "@/lib/auth/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginContent = () => {
  const [email, setEmail] = React.useState<string>("");
  const [loginLoading, setLoginLoading] = React.useState<boolean>(false);
  const [registerLoading, setRegisterLoading] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = async (email: string) => {
    setLoginLoading(true);
    const res = await signInWithEmail(email, password);
    if (res) {
      window.location.href = "/";
    } else {
      toast.error("Invalid email or password");
    }
    setLoginLoading(false);
  };

  const handleRegister = async () => {
    setRegisterLoading(true);
    const res = await signUpWithEmail(email, password);
    if (res) {
      window.location.href = "/auth-awesome";
    } else {
      toast.error("Invalid email or password");
    }
    setRegisterLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoginLoading(true);
    await signUpWithGoogle();
    setLoginLoading(false);
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
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your Password"
        className="mb-4"
      />

      <div className="flex gap-4">
        <Btn
          title={loginLoading ? "Logging in..." : "Login"}
          className="w-full mt-4 py-2"
          type="outline"
          onClick={() => handleLogin(email)}
        />
        <Btn
          title={registerLoading ? "Registering..." : "Register"}
          className="w-full mt-4 py-2"
          onClick={() => handleRegister()}
        />
      </div>

      <div className="w-full h-[1px] bg-white my-8 opacity-20" />

      <Btn
        sideIcon={<FaGoogle />}
        title="Sign in with Google"
        className="w-full mt-4 py-2"
        type="outline"
        onClick={() => signInWithGoogle()}
      />
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
