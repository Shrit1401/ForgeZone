"use client";
import Btn from "@/components/Btn";
import { createUser } from "@/lib/auth/auth.server";
import { createClient } from "@/supabase/client";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);

  const handleMagicLinkLogin = async () => {
    setLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
      return;
    }
    if (user) {
      const res = await createUser(user);
      if (res) {
        setLoading(false);
      } else {
        console.error("Error creating user");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleMagicLinkLogin();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full mx-10">
          <h1 className="text-6xl manrope font-semibold mb-2">
            {loading ? "Loading..." : "You're In"}
          </h1>
          <p className="text-xl manrope mb-8">
            {loading ? "Loading..." : "Let's get you started!"}
          </p>
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
};

export default LoginPage;
