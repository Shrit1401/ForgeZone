"use client";

import { getLoggedInUser } from "@/lib/auth/auth";
import { getBuildBySlug, getProjectFromUser } from "@/lib/build/build";
import { SingleProject } from "@/types/project.types";
import { UserType } from "@/types/user.types";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { TrophyIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShareIcon, ArrowLeftIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/public/logo.png";
import { getRandomProfilePicture, getCertificateMessage } from "@/lib/utils";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";
import Confetti from "react-confetti";

const BuildsCongoClient = React.memo(({ buildSlug }: { buildSlug: string }) => {
  const [build, setBuild] = useState<SingleProject>();
  const [user, setUser] = useState<UserType | null | undefined>();
  const buildParam = buildSlug;
  const certificateRef = useRef<HTMLDivElement>(null);

  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [confettiActive, setConfettiActive] = useState(true);

  const currentDate = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Automatically disable confetti after 8 seconds
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 8000);

    // Clean up event listener and timer
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      await getLoggedInUser(setUser);
      try {
        await getBuildBySlug(buildParam, setBuild);
      } catch (error) {
        console.error("Error fetching build:", error);
      }
    };
    initializeData();
  }, [buildParam]);

  // Check if user has completed the build before allowing access to the congo page
  useEffect(() => {
    if (user && build) {
      const userProject = getProjectFromUser(user, build.name);
      if (!userProject || userProject.current <= build.stepsLength) {
        // User hasn't completed all steps, redirect to the build page
        toast.error("You need to complete all steps first!");
        window.location.href = `/p/${buildParam}`;
      }
    }
  }, [user, build, buildParam]);

  const preloadImages = useCallback(async () => {
    if (!certificateRef.current) return;

    const images = Array.from(certificateRef.current.querySelectorAll("img"));

    // Add error handler to replace broken images with placeholders
    images.forEach((img) => {
      if (!img.complete || img.naturalHeight === 0) {
        img.onerror = () => {
          img.src = getRandomProfilePicture();
          img.onerror = null;
        };
      }
    });

    // Wait for all images to load or error out
    return Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve(null);
            } else {
              img.onload = () => resolve(null);
              img.onerror = () => resolve(null);
            }
          })
      )
    );
  }, []);

  const generateCertificateImage = useCallback(async () => {
    if (!certificateRef.current) return null;

    try {
      // Preload images to avoid loading errors during html2canvas rendering
      await preloadImages();

      // Temporarily replace oklch() colors with supported format
      const elements =
        certificateRef.current.querySelectorAll<HTMLElement>("*");
      const originalStyles: string[] = [];

      elements.forEach((el, i) => {
        const style = getComputedStyle(el);
        const color = style.color;
        const bg = style.backgroundColor;

        // Save original style
        originalStyles[i] = el.style.cssText;

        // Replace oklch with fallback if detected
        if (color.includes("oklch")) el.style.color = "white";
        if (bg.includes("oklch")) el.style.backgroundColor = "black";
      });

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 5000,
        onclone: (document) => {
          const profileImg = document.querySelector(
            ".certificate-profile-img"
          ) as HTMLImageElement;
          if (
            profileImg &&
            (!profileImg.complete || profileImg.naturalHeight === 0)
          ) {
            profileImg.src = getRandomProfilePicture();
          }
        },
      });

      const dataUrl = canvas.toDataURL("image/png");

      // Restore original styles
      elements.forEach((el, i) => {
        el.style.cssText = originalStyles[i];
      });

      return dataUrl;
    } catch (error) {
      console.error("Error generating certificate image:", error);
      return null;
    }
  }, [preloadImages]);

  const shareToCommunity = useCallback(async () => {
    if (!build) return;

    const text = encodeURIComponent(
      `I just completed the ${
        build.name
      } build on @ForgeZone! 🚀 #ForgeZone #${build.name.replace(/\s+/g, "")}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }, [build]);

  const downloadCertificate = useCallback(async () => {
    if (!certificateRef.current) return;

    try {
      // Wait for images to load before rendering
      await preloadImages();

      // Temporarily replace oklch() colors with supported format
      const elements =
        certificateRef.current.querySelectorAll<HTMLElement>("*");
      const originalStyles: string[] = [];

      elements.forEach((el, i) => {
        const style = getComputedStyle(el);
        const color = style.color;
        const bg = style.backgroundColor;

        // Save original style
        originalStyles[i] = el.style.cssText;

        // Replace oklch with fallback if detected
        if (color.includes("oklch")) el.style.color = "white";
        if (bg.includes("oklch")) el.style.backgroundColor = "black";
      });

      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true, // Enable CORS for images
        allowTaint: true, // Allow tainted canvas
        logging: false, // Disable logging to prevent console noise
        imageTimeout: 5000, // Set timeout for images to 5 seconds
        onclone: (document) => {
          // Additional fixes in the cloned document if needed
          const profileImg = document.querySelector(
            ".certificate-profile-img"
          ) as HTMLImageElement;
          if (
            profileImg &&
            (!profileImg.complete || profileImg.naturalHeight === 0)
          ) {
            profileImg.src = getRandomProfilePicture();
          }
        },
      });

      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `forge-zone-certificate-${user?.username || "user"}.png`;
      link.click();

      // Restore original styles
      elements.forEach((el, i) => {
        el.style.cssText = originalStyles[i];
      });
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast.error("Failed to download certificate. Please try again.");
    }
  }, [preloadImages, user?.username]);

  if (!build || !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="flex flex-col items-center space-y-4">
          <TrophyIcon className="w-12 h-12 text-yellow-400 animate-pulse" />
          <p className="text-white text-xl font-bold">
            Loading your achievement...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 px-4 overflow-hidden relative">
      {/* Background overlay */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${build?.activeImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60"></div>
      </div>

      <div className="container max-w-7xl mt-[5rem] mx-auto z-10 relative">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TrophyIcon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white manrope mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Build Completed!
          </motion.h1>
          <motion.p
            className="text-white/60 max-w-2xl mx-auto text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Congratulations on completing the {build.name} build. You've
            demonstrated exceptional skills and dedication.
          </motion.p>
        </div>

        {/* Certificate */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div ref={certificateRef} className="relative">
            <Card className="bg-black border-2 border-white/10 relative overflow-hidden">
              <div className="absolute inset-4 border border-dashed border-white/20 pointer-events-none z-10"></div>

              <CardHeader className="text-center pt-12 relative z-10">
                <div className="absolute top-6 left-6">
                  <Image
                    src={logo}
                    alt="Forge Zone Logo"
                    width={100}
                    height={50}
                  />
                </div>
                <div className="absolute top-6 right-6 bg-white/10 rounded-full p-2">
                  <TrophyIcon className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="mb-2">
                  <span className="text-white/50 uppercase tracking-widest text-xs">
                    Certificate of Completion
                  </span>
                </div>
                <CardTitle className="text-3xl md:text-4xl text-white manrope font-bold">
                  {build.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-center py-8 space-y-6 relative">
                <div className="text-xl text-white/80">
                  <span>Presented to</span>
                </div>
                <div className="py-3">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
                      <img
                        src={user?.pfp || getRandomProfilePicture()}
                        alt={user?.username || "User"}
                        className="w-full h-full object-cover certificate-profile-img"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getRandomProfilePicture();
                        }}
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white manrope">
                      {user?.username || "Builder"}
                    </h2>
                  </div>
                </div>

                <div className="text-white/70 max-w-2xl mx-auto">
                  <p className="italic">{getCertificateMessage(build.name)}</p>
                </div>

                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-white/50 text-sm">DATE</div>
                    <div className="text-white font-medium">{currentDate}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/50 text-sm">BUILD ID</div>
                    <div className="text-white font-medium">
                      #{build.discordRole?.slice(0, 8) || "00000000"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/50 text-sm">VERIFIED</div>
                    <div className="text-green-500 flex items-center justify-center">
                      <CheckCircleIcon className="w-5 h-5 mr-1" />
                      <span>Yes</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="text-center pb-10 flex justify-center text-white/50 text-sm">
                <p>Powered by Forge Zone • Build. Learn. Ship.</p>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        {/* Confetti */}
        {confettiActive && (
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
            colors={[
              "#f44336",
              "#e91e63",
              "#9c27b0",
              "#673ab7",
              "#3f51b5",
              "#2196f3",
              "#03a9f4",
              "#00bcd4",
              "#009688",
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFEB3B",
              "#FFC107",
              "#FF9800",
              "#FF5722",
            ]}
          />
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button
            onClick={shareToCommunity}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ShareIcon className="w-4 h-4 mr-2" />
            Share on Twitter
          </Button>
          <Button
            onClick={downloadCertificate}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download Certificate
          </Button>
          <Link href={`/p/${buildParam}`} passHref>
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to This Build
            </Button>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-white mb-6">
            Ready for your next challenge?
          </h3>
          <Link href="/builds" passHref>
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
              Explore More Builds
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default BuildsCongoClient;
