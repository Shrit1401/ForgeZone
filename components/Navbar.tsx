"use client";
import React, { useEffect, useCallback, useMemo } from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Btn from "./Btn";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { UserType } from "@/types/user.types";
import { getLoggedInUser, userSignOut } from "@/lib/auth/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import posthog from "posthog-js";

const Navbar = React.memo(() => {
  const [user, setUser] = React.useState<UserType | null | undefined>(null);
  const [loading, setLoading] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const links = useMemo(
    () => [
      { name: "builds", link: "/builds" },
      // { name: "work", link: "/work" },
      // { name: "notes", link: "/notes" },
      {
        name: "discord",
        link: "https://discord.gg/e3RfmAVAXV",
        target: "_blank",
      },
    ],
    []
  );

  useEffect(() => {
    const getUser = async () => {
      await getLoggedInUser(setUser, setLoading);
    };
    getUser();
  }, []);

  const handleSignOut = useCallback(async () => {
    const res = await userSignOut();
    if (res) {
      toast.success("Signed out successfully");
      window.location.href = "/";
    }
    if (!res) {
      toast.error("Error signing out");
    }
    setUser(null);
    setLoading(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full backdrop-blur-xl bg-opacity-80 bg-[rgba(0,0,0,0.2)] px-4 sm:px-6 py-4 flex 
      justify-between items-center z-[996]"
    >
      <motion.a
        href="/"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex-1"
      >
        <Image
          src={logo}
          alt="Logo"
          width={120}
          height={60}
          className="hover:opacity-50 transition-all duration-200 sm:w-[150px]"
          priority
        />
      </motion.a>

      <div className="flex items-center gap-2">
        {/* User profile for mobile */}
        {!loading && user && (
          <ProfileDropdown handleSignOut={handleSignOut} user={user}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="md:hidden flex items-center"
            >
              <img
                src={user.pfp}
                className="h-10 w-10 rounded-full cursor-pointer"
                alt={user.username}
                loading="lazy"
              />
            </motion.div>
          </ProfileDropdown>
        )}

        {/* Mobile hamburger menu */}
        <motion.div className="md:hidden" whileTap={{ scale: 0.9 }}>
          <button
            className="h-8 w-8 text-white cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col absolute top-full left-0 w-full bg-[rgba(0,0,0,0.9)] text-white md:hidden z-[997]"
          >
            <ul className="flex flex-col w-full manrope text-xl">
              {links.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200"
                  onClick={closeMenu}
                >
                  <Link
                    href={link.link}
                    target={link.target}
                    className="block p-4"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              {!loading && !user && (
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.1 }}
                  className="p-4"
                  onClick={closeMenu}
                >
                  <Btn title="Start" link="/start" />
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop navigation */}
      <ul className="hidden md:flex md:flex-row md:static md:bg-transparent justify-center md:gap-6 manrope text-xl text-white flex-grow text-center">
        {links.map((link, index) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="hover:text-white/80 transition-all duration-200"
          >
            <Link
              href={link.link}
              target={link.target}
              className="flex items-center gap-2"
            >
              {link.name}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Desktop profile/login button */}
      <div className="hidden md:block flex-1 text-right">
        {loading ? (
          <Skeleton className="h-10 w-32 rounded-full inline-block" />
        ) : !user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Btn title="Start" link="/start" />
          </motion.div>
        ) : (
          <div className="inline-block">
            <ProfileDropdown handleSignOut={handleSignOut} user={user}>
              <motion.a
                href="/profile"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-white hover:text-white/80 transition-all duration-200"
              >
                <img
                  src={user.pfp}
                  className="h-10 w-10 rounded-full cursor-pointer"
                  alt={user.username}
                  loading="lazy"
                />
                <span className="manrope font-medium">{user.username}</span>
                <ChevronDown className="h-4 w-4" />
              </motion.a>
            </ProfileDropdown>
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

const ProfileDropdown = ({
  children,
  handleSignOut,
  user,
}: Readonly<{
  children: React.ReactNode;
  handleSignOut: () => void;
  user: UserType;
}>) => {
  // Only identify user if PostHog is available
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    try {
      posthog.identify(user.email);
    } catch (error) {
      console.warn("Failed to identify user in PostHog:", error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[999]">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
