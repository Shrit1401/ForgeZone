"use client";
import Btn from "@/components/Btn";
import { createUser } from "@/lib/auth/auth.server";
import { supabaseClient } from "@/supabase/client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function AuthAwesomeContent() {
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const handleMagicLinkLogin = async () => {
    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser();
    if (error) {
      setLoading(false); // Stop loading on error
      return;
    }
    if (user) {
      try {
        const res = await createUser(user);
        if (res) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (createUserError) {
        console.error("Error in createUser:", createUserError);
        setLoading(false);
      }
    } else {
      // Handle case where there is no user but no error (e.g., not logged in)
      setLoading(false);
      // Optionally redirect to login or show a message
      // router.push('/login'); // Example redirect
    }
  };

  useEffect(() => {
    handleMagicLinkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependency array is empty as intended

  const handleGetStarted = () => {
    if (redirectTo) {
      // If there's a redirect URL, navigate to it
      window.location.href = redirectTo;
    } else {
      // Otherwise, go to the default profile page
      window.location.href = "/profile";
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full mx-10">
          <h1 className="text-6xl manrope font-semibold mb-2">
            {loading ? "Verifying..." : "You're In"}{" "}
            {/* Updated loading text */}
          </h1>
          <p className="text-xl manrope mb-8">
            {loading
              ? "Please wait while we set things up..."
              : "Let's get you started!"}{" "}
            {/* Updated loading text */}
          </p>
          <Btn
            title="Get Started"
            className="w-full mt-4 py-2"
            type="outline"
            onClick={handleGetStarted}
            disabled={loading} // Disable button while loading
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

// Main page component wraps the content component with Suspense
const AuthCorrectPage = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      {" "}
      {/* Add Suspense boundary */}
      <AuthAwesomeContent />
    </Suspense>
  );
};

export default AuthCorrectPage;
