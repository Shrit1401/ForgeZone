"use client";
import React, { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { getAllBuilds } from "@/lib/build/builds.server";
import { SingleProject } from "@/types/project.types";

const Footer: React.FC = () => {
  const [builds, setBuilds] = useState<SingleProject[]>([]);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const buildsData = await getAllBuilds();
        if (buildsData) {
          // Get up to 4 featured or recent builds
          const featuredBuilds = buildsData
            .filter((build) => build.isFeatured)
            .slice(0, 4);

          // If we don't have 4 featured builds, add non-featured ones until we reach 4
          const displayBuilds =
            featuredBuilds.length === 4
              ? featuredBuilds
              : [
                  ...featuredBuilds,
                  ...buildsData
                    .filter((build) => !build.isFeatured)
                    .slice(0, 4 - featuredBuilds.length),
                ];

          setBuilds(displayBuilds);
        }
      } catch (error) {
        console.error("Error fetching builds for footer:", error);
      }
    };

    fetchBuilds();
  }, []);

  return (
    <footer className="w-full bg-black text-white p-6 z-[999]">
      <div className="container mx-auto h-[30vh] flex flex-col md:flex-row justify-between items-start md:items-start">
        <div className="flex items-start space-x-3">
          <Image src={logo} alt="Logo" width={150} height={75} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4 md:mt-0">
          <div>
            <h4 className="text-lg font-semibold">Weekend Builds</h4>
            <ul className="text-white/60 space-y-2">
              {builds.length > 0 ? (
                builds.map((build) => (
                  <li key={build.id}>
                    <Link
                      href={`/p/${build.projectSlug}`}
                      className="hover:text-gray-300"
                    >
                      {build.name}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback content while builds are loading
                <>
                  <li>
                    <Link href="./builds" className="hover:text-gray-300">
                      View All Builds
                    </Link>
                  </li>
                  <li>
                    <Link href="./builds" className="hover:text-gray-300">
                      Featured Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="./builds" className="hover:text-gray-300">
                      Latest Builds
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">About</h4>
            <ul className="text-white/60  space-y-2">
              <li>
                <Link href="./notes" className="hover:text-gray-300">
                  Notes
                </Link>
              </li>
              <li>
                <Link href="./work" className="hover:text-gray-300">
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/e3RfmAVAXV"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-white/60  text-sm">
        <p>© {new Date().getFullYear()} Forge Zone.</p>
        <div className="flex space-x-4">
          <Link href="./privacy" className="hover:text-gray-300">
            Privacy Policy
          </Link>
          <Link href="./tos" className="hover:text-gray-300">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
