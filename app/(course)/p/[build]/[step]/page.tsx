"use client";

import React, { useEffect, useState } from "react";
import { TrophyIcon } from "@heroicons/react/16/solid";
import Btn from "@/components/Btn";
import Sidebar from "@/components/build/Sidebar";
import CourseMarkdown from "@/components/build/CourseMarkdown";
import CourseSkeleton from "@/components/skeletons/CourseSkeleton";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RequirementDialog from "@/components/build/RequirementDialog";
import { SingleProject, StepItem } from "@/types/project.types";
import { useParams } from "next/navigation";
import {
  getBuildBySlug,
  getBuildStepBySlug,
  getProjectFromUser,
} from "@/lib/build/build";
import { ProjectUser, UserType } from "@/types/user.types";
import { getLoggedInUser } from "@/lib/auth/auth";

const StepHome = () => {
  const [build, setBuild] = useState<SingleProject>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null | undefined>();
  const [userProject, setUserProject] = useState<ProjectUser | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [step, setStep] = useState<StepItem>();

  const params = useParams();
  const buildParam = params.build as string;
  const courseParam = params.step as string;

  useEffect(() => {
    getLoggedInUser(setUser, setLoading);
  }, []);

  useEffect(() => {
    const fetchBuild = async () => {
      setLoading(true);
      try {
        await getBuildBySlug(buildParam, setBuild);
      } catch (error) {
        console.error("Error fetching build:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuild();
  }, [buildParam]);

  useEffect(() => {
    setLoading(true);
    getBuildStepBySlug(build, courseParam, setStep);
    setLoading(false);
  }, [user, build]);

  const handleClick = async (message: string) => {
    console.log("Message:", message);
  };

  useEffect(() => {
    if (user && build) {
      const res = getProjectFromUser(user, build.name);
      if (res) {
        setUserProject(res);
        setPercentage(Math.floor((res.current / res.total) * 100));
      } else {
        setUserProject(null);
      }
    }
  }, [user, build]);

  if (loading || !build || !user || !userProject || !step) {
    return <CourseSkeleton />;
  }

  return (
    <div className="mt-[5rem] mb-[6rem] h-screen flex ">
      <section className="flex w-full">
        <Sidebar
          slug={build.projectSlug}
          current={userProject.current}
          steps={build.steps}
          image={build?.activeImg}
        />

        <div className="left-[20%] h-screen border-l fixed border-dashed border-white/20" />
        <div className="w-full mt-[4rem] fixed top-0 border-t border-dashed border-white/20" />

        {/* Main Content */}
        <div className="ml-[20%] w-4/5 h-screen overflow-y-auto px-4 py-2">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/builds">Builds</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/builds/${buildParam}`}>
                  {build?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="capitalize">
                <BreadcrumbPage>{courseParam}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <CourseMarkdown source={step.source} name={step.text} />
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
          <RequirementDialog
            title={step.requirementMessage}
            onClick={handleClick}
          >
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
