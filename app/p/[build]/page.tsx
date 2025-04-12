"use client";

import React from "react";
import { TrophyIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import Btn from "@/components/Btn";
import Sidebar from "@/components/build/Sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BuildHome = () => {
  const percentage = 75;

  const twitterClicked = async () => {
    const twitterText = encodeURIComponent("hello/n ice to meet you");
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}`;
    window.open(twitterUrl, "_blank");
  };
  return (
    <div className="mt-[5rem] h-screen flex ">
      <section className="flex w-full">
        <Sidebar />

        <div className="left-[20%] h-screen border-l fixed border-dashed border-white/20" />
        <div className="w-full mt-[4rem] fixed top-0 border-t border-dashed z-[999] border-white/20" />
        <div className="ml-[20%] w-4/5 h-screen overflow-y-auto px-4 py-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/builds">Builds</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Intro to ML</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col items-center justify-center gap-1 mt-6">
            <h2 className="manrope text-white font-[700] text-3xl mt-6">
              Get Ready to Ship
            </h2>
            <p className="font-bold text-white/50 mt-2 w-[70%] text-center">
              Join hundreds of builders in ML/AI to ship this build together.
              Make sure to complete the tasks below to get the most out of this
              build.
            </p>
          </div>

          <div className="mt-4 mx-8 border border-dashed border-white/20 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="flex gap-1 items-center text-xl manrope font-[700]">
                <XCircleIcon className="w-6 h-6 text-[rgba(255,255,255,.8)]" />
                Share Your Journey
              </h3>
              <p className="text-white/50 manrope font-[500] text-sm mt-2">
                You'll need to share your journey with the cohort on Twitter to
                keep track of your progress and connect with other builders.
              </p>
            </div>
            <div className="mt-4">
              <Btn
                title="Share on Twitter"
                className="w-fit"
                onClick={twitterClicked}
                sideIcon={<FaTwitter />}
              />
            </div>
          </div>

          <div className="mt-4 mx-8 border border-dashed border-white/20 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="flex gap-1 items-center text-xl manrope font-[700]">
                <XCircleIcon className="w-6 h-6 text-[rgba(255,255,255,.8)]" />
                Connect Your Discord
              </h3>
              <p className="text-white/50 manrope font-[500] text-sm mt-2">
                You'll need to link your Discord account to access secret
                channels for this cohort and get support when stuck.
              </p>
            </div>
            <div className="mt-4">
              <Btn
                title="Connect Discord"
                className="w-fit"
                link={""}
                sideIcon={<FaDiscord />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Bottom Section */}
      <section className="fixed bottom-0 w-full h-[80px] border-t border-dashed border-white/20 flex items-center justify-between bg-[#080707]">
        <div className="flex items-center justify-center gap-3 w-1/5 px-6 py-3">
          <div className="relative w-[40px] h-[40px]">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="17"
                strokeWidth="3"
                fill="transparent"
                className="stroke-zinc-500"
              />
              <circle
                cx="20"
                cy="20"
                r="17"
                strokeWidth="3"
                fill="transparent"
                className="stroke-white"
                strokeDasharray={2 * Math.PI * 17}
                strokeDashoffset={2 * Math.PI * 17 * (1 - percentage / 100)}
                style={{
                  transition: "stroke-dashoffset 0.5s ease",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <TrophyIcon
                className="w-6 h-6 text-[#fdc422]"
                aria-hidden="true"
              />
            </div>
          </div>

          <div>
            <h3 className="manrope text-white">{percentage}% Completed</h3>
            <p className="text-white/30">1.5k builders ahead of you</p>
          </div>
        </div>

        <div className="w-1/5 px-6 py-3 flex items-center justify-end gap-3">
          <Btn
            title="Let's Go"
            className="bg-white rounded-full text-black font-[700] px-6 py-2 hover:opacity-80 transition-all duration-200"
            link={""}
          />
        </div>
      </section>
    </div>
  );
};

export default BuildHome;
