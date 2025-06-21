"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function TestEmailPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Welcome email sent successfully!");
      } else {
        toast.error(data.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending test email:", error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h1 className="text-3xl font-bold text-center">Test Welcome Email</h1>
          <p className="text-gray-400 text-center mt-2">
            Test the welcome email functionality
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="firstName">First Name (Optional)</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              className="mt-1"
            />
          </div>

          <Button type="submit" disabled={loading || !email} className="w-full">
            {loading ? "Sending..." : "Send Test Email"}
          </Button>
        </form>
      </div>
    </div>
  );
}
