"use client";
import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Btn from "@/components/Btn";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const DashboardNavbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [
    { name: "builds", link: "/d/builds" },
    {
      name: "work",
      link: "/d/work",
    },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full backdrop-blur-xl bg-opacity-80 bg-[rgba(0,0,0,0.2)] px-6 py-4 flex 
      justify-between items-center z-[999]"
    >
      <motion.a
        href="/d"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={75}
          className="hover:opacity-50 transition-all duration-200"
        />
      </motion.a>

      <motion.div className="md:hidden" whileTap={{ scale: 0.9 }}>
        <button
          className="h-8 w-8 text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-col absolute top-full left-0 w-full bg-[rgba(0,0,0,0.8)] text-white md:hidden justify-center manrope text-xl"
          >
            {links.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:text-white/80 transition-all duration-200 p-4"
              >
                <Link href={link.link}>{link.name}</Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <ul className="hidden md:flex md:flex-row md:static md:bg-transparent justify-center md:gap-2 manrope text-xl text-white">
        {links.map((link, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="hover:text-white/80 transition-all duration-200 md:p-0"
          >
            <Link href={link.link} className="flex items-center gap-2">
              {link.name}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardNavbar;
