"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";

// Local storage key for dashboard auth
const DASHBOARD_AUTH_KEY = "dashboard_auth";

interface DashboardAuthProps {
  children: React.ReactNode;
}

const DashboardAuth: React.FC<DashboardAuthProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if already authenticated through localStorage
    const isAuth = localStorage.getItem(DASHBOARD_AUTH_KEY) === "true";
    setAuthenticated(isAuth);
    setIsOpen(!isAuth);
  }, []);

  const handlePasswordSubmit = () => {
    if (password === "1401") {
      // Correct password
      localStorage.setItem(DASHBOARD_AUTH_KEY, "true");
      setAuthenticated(true);
      setIsOpen(false);
      setError(false);
    } else {
      // Incorrect password
      setError(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  // If authenticated, render children
  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LockIcon className="w-5 h-5" />
              Dashboard Access
            </DialogTitle>
            <DialogDescription>
              This area is protected. Please enter the password to continue.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              onKeyDown={handleKeyDown}
              className={`py-2 ${
                error ? "border-red-500 focus-visible:ring-red-500/50" : ""
              }`}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button onClick={handlePasswordSubmit} className="w-full sm:w-auto">
              Access Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Show an empty div when not authenticated */}
      <div className="mt-[4rem] flex items-center justify-center h-screen bg-black">
        <div className="p-8 rounded-lg text-center">
          <LockIcon className="w-12 h-12 mx-auto mb-4 text-white/50" />
          <p className="text-white/50 text-xl">Authentication required</p>
        </div>
      </div>
    </>
  );
};

export default DashboardAuth;
