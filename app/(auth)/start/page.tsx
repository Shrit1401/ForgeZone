"use client";
import Btn from "@/components/Btn";
import { Input } from "@/components/ui/input";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full mx-10">
          <h1 className="text-6xl manrope font-semibold mb-8">
            LFG
            <span className="text-2xl manrope ml-2">let's fricking go</span>
          </h1>
          <Input type="email" placeholder="Your Email" className="mb-4" />

          <Btn
            title="Let's Go"
            className="w-full mt-4 py-2"
            type="outline"
            onClick={() => {}}
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
};

export default LoginPage;
