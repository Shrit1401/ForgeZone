import React from "react";
import { TrophyIcon } from "@heroicons/react/16/solid";
import Btn from "@/components/Btn";
import Sidebar from "@/components/build/Sidebar";
import CourseMarkdown from "@/components/build/CourseMarkdown";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RequirementDialog from "@/components/build/RequirementDialog";

const StepHome = () => {
  const percentage = 75;
  return (
    <div className="mt-[5rem] mb-[6rem] h-screen flex ">
      <section className="flex w-full">
        {/* Sidebar */}
        <Sidebar />

        <div className="left-[20%] h-screen border-l fixed border-dashed border-white/20" />
        <div className="w-full mt-[4rem] fixed top-0 border-t border-dashed border-white/20" />

        {/* Main Content */}
        <div className="ml-[20%] w-4/5 h-screen overflow-y-auto px-4 py-2">
          <Breadcrumb className="mb-4">
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
          <CourseMarkdown />
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
          <RequirementDialog>
            <Btn
              title="Submit Requirments"
              className="bg-white rounded-full text-black font-[700] px-6 py-2 hover:opacity-80 transition-all duration-200"
            />
          </RequirementDialog>
        </div>
      </section>
    </div>
  );
};

export default StepHome;
