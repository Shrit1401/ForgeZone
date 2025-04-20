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
  getNextBuildPageSlug,
  getProjectFromUser,
} from "@/lib/build/build";
import { ProjectUser, UserMessage, UserType } from "@/types/user.types";
import { getLoggedInUser, updateUserBuild } from "@/lib/auth/auth";
import { createProjectMessage } from "@/lib/build/builds.server";
import { toast } from "sonner";

// Common styling constants
const BORDER_STYLE = "border-dashed border-white/20";
const BUTTON_BASE_STYLE =
  "rounded-full text-black font-[700] px-6 py-2 hover:opacity-80 transition-all duration-200";

const StepHome = () => {
  // State declarations
  const [build, setBuild] = useState<SingleProject>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null | undefined>();
  const [userProject, setUserProject] = useState<ProjectUser | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [step, setStep] = useState<StepItem>();
  const [messages, setMessages] = useState<UserMessage>();

  const params = useParams();
  const buildParam = params.build as string;
  const courseParam = params.step as string;

  // Data fetching
  useEffect(() => {
    const initializeData = async () => {
      // Get logged in user
      await getLoggedInUser(setUser, setLoading);

      // Get build by slug
      try {
        await getBuildBySlug(buildParam, setBuild);
      } catch (error) {
        console.error("Error fetching build:", error);
      }
    };

    initializeData();
  }, [buildParam]);

  // Set up step data when build changes
  useEffect(() => {
    if (!build) return;

    getBuildStepBySlug(build, courseParam, setStep);
  }, [build, courseParam]);

  // Set up user project data when user and build are available
  useEffect(() => {
    if (!user || !build) return;

    const res = getProjectFromUser(user, build.name);
    if (res) {
      setUserProject(res);
      setPercentage(Math.floor((res.current / res.total) * 100));
    }
  }, [user, build]);

  // Get messages for current step
  useEffect(() => {
    if (!user || !build || !userProject || !step) return;

    const res = userProject.messages.filter(
      (message) => message.target === step.requirementMessage
    );
    setMessages(res[0]);
  }, [user, build, userProject, step]);

  // Finish loading when all critical data is loaded
  useEffect(() => {
    if (build && step) {
      setLoading(false);
    }
  }, [build, step]);

  // Handle requirement submission
  const handleRequirementSubmission = async (message: string) => {
    if (!user || !build || !userProject || !step) {
      toast.error("Missing required data for submission");
      return;
    }

    // Create project message
    const messageCreation = await createProjectMessage(
      userProject.id,
      message,
      step.requirementMessage || ""
    );

    if (!messageCreation) {
      toast.error("Error creating message");
      return;
    }

    // Update user build progress
    const incDB = await updateUserBuild(
      user.id,
      build,
      undefined,
      undefined,
      undefined,
      "Increase"
    );

    if (!incDB) {
      toast.error("Error updating user build");
      return;
    }

    // Navigate to next step
    const slug = getNextBuildPageSlug(build, userProject.current);
    window.location.href = `/p/${build.projectSlug}/${slug}`;
  };

  // Show loading state when data is being fetched
  if (loading) {
    return <CourseSkeleton />;
  }

  // Show loading state when essential data is missing
  if (!build || !user || !userProject || !step) {
    return <CourseSkeleton />;
  }

  // Derived state
  const messageExists = messages !== undefined;
  const nextSlug = getNextBuildPageSlug(build, userProject.current);

  // UI Components
  const ProgressCircle = () => (
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
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <TrophyIcon className="w-6 h-6 text-[#fdc422]" aria-hidden="true" />
      </div>
    </div>
  );

  const SubmissionMessage = () =>
    messages && (
      <div
        className={`mx-4 bg-[#080707] border ${BORDER_STYLE} rounded-lg p-6 mt-6 mb-8`}
      >
        <h1 className="text-white text-2xl font-bold mb-3">
          {messages.target}
        </h1>
        <p className="text-white/30 mt-3">
          <span className="text-white/60 text-sm block mb-1">
            Your submission:
          </span>
          {messages.message}
        </p>
      </div>
    );

  return (
    <div className="mt-[5rem] mb-[6rem] h-screen flex">
      <section className="flex w-full">
        {/* Sidebar */}
        <Sidebar
          slug={build.projectSlug}
          current={userProject.current}
          steps={build.steps}
          image={build.activeImg}
        />

        {/* Border elements */}
        <div className={`left-[20%] h-screen border-l fixed ${BORDER_STYLE}`} />
        <div
          className={`w-full mt-[4rem] fixed top-0 border-t ${BORDER_STYLE}`}
        />

        {/* Main Content */}
        <div className="ml-[20%] w-4/5 h-screen overflow-y-auto px-4 py-2">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/builds">Builds</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/builds/${buildParam}`}>
                  {build.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="capitalize">
                <BreadcrumbPage>{courseParam}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Course Content */}
          <CourseMarkdown source={step.source} name={step.text} />

          {/* User Submission */}
          <SubmissionMessage />
        </div>
      </section>

      {/* Fixed Bottom Section */}
      <section
        className={`fixed bottom-0 w-full h-[80px] border-t ${BORDER_STYLE} flex items-center justify-between bg-[#080707]`}
      >
        {/* Progress Section */}
        <div className="flex items-center justify-center gap-3 w-1/5 px-6 py-3">
          <ProgressCircle />
          <div>
            <h3 className="manrope text-white">{percentage}% Completed</h3>
            <p className="text-white/30">1.5k builders ahead of you</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-1/5 px-6 py-3 flex items-center justify-end gap-3">
          {!messageExists ? (
            <RequirementDialog
              title={step.requirementMessage}
              onClick={handleRequirementSubmission}
            >
              <Btn
                title="Submit Requirements"
                className={`bg-white ${BUTTON_BASE_STYLE}`}
              />
            </RequirementDialog>
          ) : (
            <Btn
              title="Let's Go"
              onClick={() =>
                (window.location.href = `/p/${build.projectSlug}/${nextSlug}`)
              }
              className={BUTTON_BASE_STYLE}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default StepHome;
